import ecocarcafe from './keywords/ecocarcafe.json'
import illustrations from './keywords/illustrations.json'
import lawfirm from './keywords/lawfirm.json'
import specialized from './keywords/specialized.json'
import { postHttp } from "./httpService";
import  logger  from './common/winston';
import fetchFillingInformation from "./fetchFilingInformation";
import fetchBusinessInformation from "./fetchBusinessInformation";
import {  jsonCSV, jsonCSVNq } from "./common/convert_csv";
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

const generateBusinessInfo = async (Jkeywords: string, businessSearchCriteria: {SearchEntityName: string
    SearchType: string, PageCount: number, BusinessTypeID: number }) => {
        let BUSINESS_INFO = [];
        let jsonKeywords: {}[] = []
        let businessId;
        let ubi;
        let businessType;
        let businessTypeId = businessSearchCriteria.BusinessTypeID
        let totalRowCount: number;
        let businessInformation;
        let fillingInformation;
        let searchEntityName;
        let outputFilename;
        let newBinfo = [];
        let businessIdContainer: any[] = []

    jsonKeywords.push(
        specialized,
        ecocarcafe,
        lawfirm,
        illustrations
      )  
    for (let index = 0; index < jsonKeywords.length; index++) {
      logger.log({
        level: 'debug',
        message: `Number number of bussness processed is ${businessIdContainer.length}`
      })
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
                  ubi = data[i].UBINumber
                  if(businessIdContainer.includes(businessId)) continue;
                    logger.log({
                      level: 'debug',
                      message: `This ${businessId} has been processed`
                    })                  
                    businessIdContainer.push(businessId)
                    logger.log({
                      level: 'info',
                      message: `Total business process is ${businessIdContainer.length}`
                    })
                    for (let index = 0; index < businessIdContainer.length; index++) {
                      const uniqueId = businessIdContainer[index];
                    businessInformation = await fetchBusinessInformation(uniqueId);
                    fillingInformation = await fetchFillingInformation(uniqueId);
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
                          message: `Neither Annual or Initial Report detected for ${uniqueId}`
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
                      "Business Name":`${businessInformation.name}`,
                      "UBI": `${businessInformation.ubi}`,
                      "Search Term": `${searchEntityName}`,
                      "Business Status": `${businessInformation.status}`,
                      "Nature of Business": `${businessInformation.nature_of_business}`,
                      "Principal Office Email": `${businessInformation.principal_office_email}`,
                      "Principal Office Phone": `${businessInformation.principal_office_phone}`,
                      "Principal Office Street Address (1)": `${businessInformation.principal_office_street_address_1}`,
                      "Principal Office Street Address (2)": `${businessInformation.principal_office_street_address_2}`,
                      "Principal Office City": `${businessInformation.principal_office_city}`,
                      "Principal Office State":  `${businessInformation.principal_office_state}`,
                      "Principal Office Zip": `${businessInformation.principal_office_zip}`,
                      "Principal Office Address Full": `${businessInformation.principal_office_full_address}`,
                      "Principal Office Mailing Street Address (1)": `${businessInformation.principal_office_mailing_street_address_1}`,
                      "Principal Office Mailing Street Address (2)": `${businessInformation.principal_office_mailing_street_address_2}`,
                      "Principal Office Mailing City": `${businessInformation.principal_office_mailing_city}`,
                      "Principal Office Mailing State": `${businessInformation.principal_office_mailing_state}`,
                      "Principal Office Mailing Street Zip": `${businessInformation.principal_office_mailing_zip}`,
                      "Principal Office Mailing Address Full": `${businessInformation.principal_office_mailing_full_address}`,
                      "Business Expiration Date": `${businessInformation.business_expiration_date}`,
                      "Business Formation Date": `${businessInformation.business_formation_date}`,
                      "Governor First name": `${businessInformation.governor_first_name}`,
                      "Governor Last Name": `${businessInformation.governor_last_name}`,
                      "Governor Type": `${businessInformation.governor_type}`,
                      "Registered Agent First Name": `${businessInformation.registered_agent_first_name}`,
                      "Registered Agent Last Name": `${businessInformation.registered_agent_last_name}`,
                      "Registered Agent Mailing Address": `${businessInformation.registered_agent_mailing_address}`,
                      "Registered Agent Email": `${businessInformation.registered_agent_email}`,
                      "Return Address for Filing Attention First Name": `${businessInformation.return_address_for_filing_attention_first_name}`,
                      "Return Address for Filing Attention Last Name": `${businessInformation.return_address_for_filing_attention_last_name}`,
                      "Return Address for Filing Attention Email": `${businessInformation.return_address_for_filing_attention_email}`,
                      "Return Address Filing Mailing Street Address (1)": `${businessInformation.return_address_filing_mailing_street_address_1}`,
                      "Return Address Filing Mailing Street Address (2)": `${businessInformation.return_address_filing_mailing_street_address_2}`,
                      "Return Address Filing Mailing City": `${businessInformation.return_address_filing_mailing_city}`,
                      "Return Address Filing Mailing State": `${businessInformation.return_address_filing_mailing_state}`,
                      "Return Address Filing Mailing Zip": `${businessInformation.return_address_filing_mailing_zip}`,
                      "Authorized Person Signer Title": `${businessInformation.authorized_signer_title}`,
                      "Authorized Person Signer First Name":  `${businessInformation.authorized_signer_first_name}`,
                      "Authorized Person Signer Last Name": `${businessInformation.authorized_signer_last_name}`,
                      "Authorized Person Type": `${businessInformation.authorized_person_type}`,
                      "Last Filing Date": `${businessInformation.last_filing_date}`,
                      "Business Keywords": `${businessInformation.keywords}`,
                    });
                    businessIdContainer = []

                  }
                 }
                 jsonCSV(BUSINESS_INFO, outputFilename);
                    BUSINESS_INFO = []
               }
            }
          }
        }
      }

export default generateBusinessInfo;