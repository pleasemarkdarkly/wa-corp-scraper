import { postHttp } from "./httpService";
import  logger  from './common/winston';
import ecocarcafe from './keywords/ecocarcafe.json'
import illustrations from './keywords/illustrations.json'
import lawfirm from './keywords/lawfirm.json'
import specialized from './keywords/specialized.json'
import fetchFillingInformation from "./fetchFilingInformation";
import fetchBusinessInformation from "./fetchBusinessInformation";
import {  jsonCSV, testJsonCSV } from "./common/convert_csv";
import generateBusinessInfo from './generateBusinessInfo'
import sw from "stopword";


const AdvancedSearchEndpoint =
  "https://cfda.sos.wa.gov/api/BusinessSearch/GetAdvanceBusinessSearchList";

  function removeFromString(arr: [], str: string){
    let regex = new RegExp("\\b"+arr.join('|')+"\\b","gi")
    return str.replace(regex, '')
  }

  const special_extraction_words: any = [
    "any",
    "company",
    "corporation",
    "holdings",
    "entities",
    "business",
    "other",
    "purpose",
    "partnership",
    "llc",
    "l.l.c.",
    "lawful",
    "retail",
  ];
  
  
const fechTableKeywords = async (businessSearchCriteria: {
  BusinessTypeID: any, 
   SearchEntityName: string, 
   SearchType: string,
   PageCount: number, 
   PageID: number}, 
   Jkeywords: string) : Promise<any> => {

  let BUSINESS_INFO = [];
  let jsonKeywords: {}[] = []
  let businessId;
  let totalRowCount: number;
  let pageCount = businessSearchCriteria.PageCount;
  let businessType: string;
  let json;
  let AlltotalRowCount: number;
  let pageId = businessSearchCriteria.PageID;
  let businessInformation;
  let fillingInformation;
  let businessTypeId = businessSearchCriteria.BusinessTypeID
  let searchEntityName,
  outputFilename;
  
  // To get all business of a paticular business type
  if (pageId === -1) {
    let computeInfo = [], file_name;
    businessSearchCriteria.SearchEntityName = "";
    businessSearchCriteria.SearchType = ""; 
    businessSearchCriteria.PageID = 1
    businessSearchCriteria.PageCount = 1
    const data = await postHttp(AdvancedSearchEndpoint, businessSearchCriteria); 
    if(data.length === 0) {
      logger.log({
        level: 'debug',
        message: "The criteria did not match any this business type"
      })
      return 0;
    }
   
   else if (data) {      
      for (let i = 0; i < data.length; i++) {
        let firstInfo = data[0];
        businessType = firstInfo.BusinessType;
        businessType = businessType.replace(/\s/g,'-');
        AlltotalRowCount =
        firstInfo.Criteria !== null ? firstInfo.Criteria.TotalRowCount : `NOT AVAILABLE`;
        try {
          if(AlltotalRowCount) {
            logger.log({
              level: 'info',
              message: `The total number of this active business type ${AlltotalRowCount}`
            })
              let calculator = Math.floor(AlltotalRowCount / 1000)
              if (AlltotalRowCount > 1000) {
                for (let index = 0; index < calculator; index++) {
                  let increament = 1
                    const thArgs = {
                      ...businessSearchCriteria,
                      PageID: increament,
                      PageCount: 1000
                  }                  
                  await generateBusinessInfo(Jkeywords, thArgs)
                  increament++
                  logger.log({
                    level: 'info',
                    message: 'The business data exceed 1000'
                  })
                }
              } else {
                
                const argsZ = {
                  ...businessSearchCriteria,
                  PageID: 1,
                  PageCount: 10
              }

              logger.log({
                level: 'info',
                message: 'The business data is blow 1000'
              })
             await generateBusinessInfo(Jkeywords, argsZ)
            // return  jsonCSV(bInfo, filename);
                }
          }
        } catch(error) {
          logger.log({
            level: 'debug',
            message: `keyword fetch error: ${error}`
          })
        }
    }
   }
  } else {
    jsonKeywords.push(
      specialized,
      ecocarcafe,
      lawfirm,
      illustrations
    )  
    for (let index = 0; index < jsonKeywords.length; index++) {
      let jsonKeys: any = jsonKeywords[index];
      if(jsonKeys.output_filename === Jkeywords) {
          for (let index = 0; index < jsonKeys.keywords.length; index++) { 
           outputFilename = jsonKeys.output_filename;
          searchEntityName = jsonKeys.keywords[index];
          businessSearchCriteria.SearchEntityName = searchEntityName;
          businessSearchCriteria.SearchType = `${searchEntityName === "" ? "" : `Contains`}`;          
        const data = await postHttp(AdvancedSearchEndpoint, businessSearchCriteria); 
            if(data.length === 0) return
            if (data) {
              for (let i = 0; i < data.length; i++) {
                let firstInfo = data[0];
                businessType = firstInfo.BusinessType;
                businessType = businessType.replace(/\s/g,'-');
                totalRowCount =
                firstInfo.Criteria !== null ? firstInfo.Criteria.TotalRowCount : `NOT AVAILABLE`;
                businessId = data[i].BusinessID;
                businessInformation = await fetchBusinessInformation(businessId);
                fillingInformation = await fetchFillingInformation(businessId);
                let filingDateTime, annualReport;
                if(fillingInformation) {
                  for (let i = 0; i < fillingInformation.length; i++) {
                    if (
                      fillingInformation[i].FilingTypeName === "ANNUAL REPORT" ||
                      fillingInformation[i].FilingTypeName === "INITIAL REPORT"
                    ) {
                      annualReport = fillingInformation[0];
                      filingDateTime = annualReport.FilingDateTime;
                      break;
                    }
                    logger.log({
                      level: 'debug',
                      message: `Neither Annual or Initial Report detected for ${businessId}`
                    });
                  }
                }
                const keyword = `${businessInformation.name} ${businessInformation.nature_of_business}`;
                const oldKeyword = keyword.split(" ");
                const newKeyword = sw.removeStopwords(oldKeyword);
          
                let keywords = `${newKeyword}`.toString().replace(/[~`!@#$%^*(){}\[\];:"'<,.>?\/\\|_+=-]/g, " ").toLowerCase().trim();
                keywords = removeFromString(special_extraction_words, keywords);
                keywords = keywords.replace(/(^\s*)|(\s*$)/gi,"");
                keywords = keywords.replace(/[ ]{2,}/gi," ");
                keywords = keywords.replace(/\n/,"");
          
                logger.log({
                  level: 'info',
                  message: businessInformation.name + "(" + businessInformation.ubi + ") " + "keywords: " + keywords
                });              
                
                BUSINESS_INFO.push({
                  "Business Name":`"${businessInformation.name}"`,
                  "UBI": `"${businessInformation.ubi}"`,
                  "Search Term": `"${searchEntityName}"`,
                  "Business Status": `"${businessInformation.status}"`,
                  "Nature of Business": `"${businessInformation.nature_of_business}"`,
                  "Principal Office Email": `"${businessInformation.principal_office_email}"`,
                  "Principal Office Phone": `"${businessInformation.principal_office_phone}"`,
                  "Principal Office Street Address (1)": `"${businessInformation.principal_office_street_address_1}"`,
                  "Principal Office Street Address (2)": `"${businessInformation.principal_office_street_address_2}"`,
                  "Principal Office City": `"${businessInformation.principal_office_city}"`,
                  "Principal Office State":  `"${businessInformation.principal_office_state}"`,
                  "Principal Office Zip": `"${businessInformation.principal_office_zip}"`,
                  "Principal Office Address Full": `"${businessInformation.principal_office_full_address}"`,
                  "Principal Office Mailing Street Address (1)": `"${businessInformation.principal_office_mailing_street_address_1}"`,
                  "Principal Office Mailing Street Address (2)": `"${businessInformation.principal_office_mailing_street_address_2}"`,
                  "Principal Office Mailing City": `"${businessInformation.principal_office_mailing_city}"`,
                  "Principal Office Mailing State": `"${businessInformation.principal_office_mailing_state}"`,
                  "Principal Office Mailing Street Zip": `"${businessInformation.principal_office_mailing_zip}"`,
                  "Principal Office Mailing Address Full": `"${businessInformation.principal_office_mailing_full_address}"`,
                  "Business Expiration Date": `"${businessInformation.business_expiration_date}"`,
                  "Business Formation Date": `"${businessInformation.business_formation_date}"`,
                  "Governor First name": `"${businessInformation.governor_first_name}"`,
                  "Governor Last Name": `"${businessInformation.governor_last_name}"`,
                  "Governor Type": `"${businessInformation.governor_type}"`,
                  "Registered Agent First Name": `"${businessInformation.registered_agent_first_name}"`,
                  "Registered Agent Last Name": `"${businessInformation.registered_agent_last_name}"`,
                  "Registered Agent Mailing Address": `"${businessInformation.registered_agent_mailing_address}"`,
                  "Registered Agent Email": `"${businessInformation.registered_agent_email}"`,
                  "Return Address for Filing Attention First Name": `"${businessInformation.return_address_for_filing_attention_first_name}"`,
                  "Return Address for Filing Attention Last Name": `"${businessInformation.return_address_for_filing_attention_last_name}"`,
                  "Return Address for Filing Attention Email": `"${businessInformation.return_address_for_filing_attention_email}"`,
                  "Return Address Filing Mailing Street Address (1)": `"${businessInformation.return_address_filing_mailing_street_address_1}"`,
                  "Return Address Filing Mailing Street Address (2)": `"${businessInformation.return_address_filing_mailing_street_address_2}"`,
                  "Return Address Filing Mailing City": `"${businessInformation.return_address_filing_mailing_city}"`,
                  "Return Address Filing Mailing State": `"${businessInformation.return_address_filing_mailing_state}"`,
                  "Return Address Filing Mailing Zip": `"${businessInformation.return_address_filing_mailing_zip}"`,
                  "Authorized Person Signer Title": `"${businessInformation.authorized_signer_title}"`,
                  "Authorized Person Signer First Name":  `"${businessInformation.authorized_signer_first_name}"`,
                  "Authorized Person Signer Last Name": `"${businessInformation.authorized_signer_last_name}"`,
                  "Authorized Person Type": `"${businessInformation.authorized_person_type}"`,
                  "Last Filing Date": `"${businessInformation.last_filing_date}"`,
                  "Business Keywords": `"${businessInformation.keywords}"`,
                });
              }
              await testJsonCSV(BUSINESS_INFO, outputFilename);
             } 
          }
        }
      }
   }
 }

   export default fechTableKeywords;