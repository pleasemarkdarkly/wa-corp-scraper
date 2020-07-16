import { postHttp } from "./httpService";
import clc from "cli-color";
import sw from "stopword";
// import special_extraction_words from "./entityExtractionWords";
import  logger  from './common/winston';
import ecocarcafe from './keywords/ecocarcafe.json'
import illustrations from './keywords/illustrations.json'
import lawfirm from './keywords/lawfirm.json'
import specialized from './keywords/specialized.json'

import fetchFillingInformation from "./fetchFilingInformation";
import fetchAnnualReportCriteria from "./fetchAnnualReportCriteria";
import fetchBusinessInformation from "./fetchBusinessInformation";
import convertToCSV from "./common/convert_csv";
import keywords from "./keywords";

const info = clc.white.bold;
const error = clc.red.bold;
const warn = clc.yellow;
const notice = clc.blue;

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

var AdvancedSearchEndpoint =
  "https://cfda.sos.wa.gov/api/BusinessSearch/GetAdvanceBusinessSearchList";

function removeFromString(arr: [], str: string){
  let regex = new RegExp("\\b"+arr.join('|')+"\\b","gi")
  return str.replace(regex, '')
}


let startTime,
    fetchTableTime, 
    fetchBusinessTime, 
    fetchBillingTime, 
    fetchAnnualTime: number, 
    BusinessType: string,
    averageFT_time: any,
    averageBT_time: any,
    averageBL_time: any,
    averageAL_time: any,
    totalTimeTaken: any

    async function fetchTable(businessSearchCriteria: {BusinessTypeID: any,  SearchEntityName: string, SearchType: string, PageCount: any}) {  
  startTime = Date.now();
  logger.log({
    level: 'info',
    message: `Fetching search criteria ${AdvancedSearchEndpoint}`
  });
  let totalCount = 1000;

  let BUSINESS_INFORMATION_REPORT = [];
  let BUSINESS_INFO = [];
  let ALL_CSV = [];
  let jsonKeywords: {}[] = []
  let businessId;
  let totalRowCount;
  let businessInformation;
  let fillingInformation;
  let businessTypeId = businessSearchCriteria.BusinessTypeID
  let searchEntityName;
  let businessIdContainer: any[] = []

  
  for(let i = 0; i < keywords.length; i++) {
    searchEntityName = keywords[i];
    businessSearchCriteria.SearchEntityName = searchEntityName;
    businessSearchCriteria.SearchType = `${searchEntityName === "" ? "" : `Contains`}`;
  logger.log({ 
    level: 'debug',
    message: `Total amount of business processed is ${businessIdContainer.length}`
  })
  const data = await postHttp(AdvancedSearchEndpoint, businessSearchCriteria); 
  
      if(data.length === 0) return
      if (data) {
        fetchTableTime = Date.now();
        averageFT_time = fetchTableTime - startTime;
        for (let i = 0; i < data.length; i++) {
          let firstInfo = data[0];
          totalRowCount =
            firstInfo.Criteria !== null ? firstInfo.Criteria.TotalRowCount : `NOT AVAILABLE`;
          let businessInfo = data[i];
          businessId = data[i].BusinessID;
         if(businessIdContainer.includes(businessId)) return;
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
          if(businessInformation) {
            fetchBusinessTime = Date.now();
            averageBT_time = fetchBusinessTime - startTime;
          };
          fillingInformation = await fetchFillingInformation(uniqueId);
          if(fillingInformation) {
            fetchBillingTime = Date.now();
            averageBL_time = fetchBillingTime - startTime;
          }
    
          let fillingNumber,
            id,
            annualReport,
            annualReportCriteria = [],
            filingDateTime,
            annualDueNotice;
          for (let i = 0; i < fillingInformation.length; i++) {
            if (
              fillingInformation[i].FilingTypeName === "ANNUAL REPORT" ||
              fillingInformation[i].FilingTypeName === "INITIAL REPORT"
            ) {
              annualReport = fillingInformation[0];
              fillingNumber = annualReport.FilingNumber;
              id = annualReport.TransactionId;
              filingDateTime = annualReport.FilingDateTime;
              annualReportCriteria = await fetchAnnualReportCriteria(
                fillingNumber,
                id
              );
              break;
            }
            logger.log({
              level: 'debug',
              message: `Neither Annual or Initial Report detected for ${businessId}`
            });
          }
          for (let i = 0; i < annualReportCriteria.length; i++) {
            if (annualReportCriteria[i].DocumentTypeID === 4) {
              annualDueNotice = annualReportCriteria[0];
              //  logger.log(annualDueNotice, "Annual Report criteria");
              // TODO: handle parsing and errors
              //  await fetchAnnualReport(annualDueNotice);
              break;
            } else {
              logger.log({
                level: 'debug',
                message: "No Annual or Initial Report Found to download for " + businessId
              });
            }
          }
    
          const info = {
            UBINumber: businessInfo.UBINumber,
            BusinessName: businessInfo.BusinessName,
            BusinessType: businessInfo.BusinessType,
            AgentName: businessInfo.AgentName,
            FullAddress:
              businessInfo.PrincipalOffice.PrincipalStreetAddress.FullAddress,
          };
    
          BUSINESS_INFORMATION_REPORT.push({
            ...info,
            ...businessInformation,
            date_filed: filingDateTime,
          });
    
          if (BUSINESS_INFORMATION_REPORT.length === totalCount) {
            logger.log({
              level: 'debug',
              message: `${totalCount} businesses processed`
            });
            totalCount +=1000;
    
          };
     
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
           BusinessType = businessInfo.BusinessType;
           totalTimeTaken = averageBL_time + averageFT_time + averageBT_time;
        }
      }
    }
    const CSV = convertToCSV(BUSINESS_INFO, searchEntityName);
    BUSINESS_INFO = []

  }
    return {
      BUSINESSTYPE: BusinessType,
      TOTAL_BUSINESS_PARSED: BUSINESS_INFORMATION_REPORT.length,
      TIME_TO_FETCH_BUSINESS_TABLES: `${averageFT_time}ms`,
      TIME_TO_FETCH_ANNUAL_REPORT: `${averageAL_time}ms`,
      TIME_TO_FETCH_FILLING_REPORT: `${averageBL_time}ms`,
      TIME_TO_FETCH_BUSINESS_INFORMATION: `${averageBT_time}ms`,
      TOTAL_AVAILABLE_BUSINESS: totalRowCount,
      TOTAL_TIME_TAKEN: `${totalTimeTaken}ms`,
      BUSINESS_INFORMATION_REPORT,
    };
  }

export default fetchTable;
