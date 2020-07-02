var { postHttp } = require('./httpService');
var clc = require("cli-color");
sw = require('stopword')

var info = clc.white.bold;
var error = clc.red.bold;
var warn = clc.yellow;
var notice = clc.blue;

var fetchFillingInformation = require('./fetchBillingInformation');
var fetchAnnualReportCriteria = require('./fetchAnnualReportCriteria');
var fetchAnnualReport = require('./fetchAnnualReport');
var fetchBusinessInformation = require('./fetchBusinessInformation')
var convertToCSV = require('./helpers/convertCSV')

var AdvancedSearchEndpoint = 'https://cfda.sos.wa.gov/api/BusinessSearch/GetAdvanceBusinessSearchList';

async function fetchTable(businessSearchCriteria) {
    // console.time("Time-taken");
    console.log(notice('Fetching search criteria', AdvancedSearchEndpoint));
    const data =  await postHttp(AdvancedSearchEndpoint, businessSearchCriteria);
    
    /*
      Remove limit for full BusinessType export
    */
    const totalCount = 200;

    let BUSINESS_SEARCH = [];
    let BUSINESS_INFO = [];
    let ALL_CSV = [];

    let BusinessType;
    let BusinessID;
    let TotalRowCount;
    let BusinessInformation;
    let fillingInformation;
    
    if(data) {
      for (let i = 0; i < data.length; i++) {
          let firstInfo = data[0];
          TotalRowCount = firstInfo.Criteria !== null ? firstInfo.Criteria.TotalRowCount : null
          let businessInfo = data[i];
          BusinessID = data[i].BusinessID;

        BusinessInformation  = await fetchBusinessInformation(BusinessID);

        fillingInformation  = await fetchFillingInformation(BusinessID)
     let FilingNumber, ID, annualReport, annualReportCriteria = [], FilingDateTime, annualDueNotice;
     for (let i = 0; i < fillingInformation.length; i++) {
       if (fillingInformation[i].FilingTypeName ===	"ANNUAL REPORT"  ||  fillingInformation[i].FilingTypeName === 'INITIAL REPORT') {
        annualReport = fillingInformation[0];
        FilingNumber = annualReport.FilingNumber;
        ID = annualReport.Transactionid;
        FilingDateTime	= annualReport.FilingDateTime	
        annualReportCriteria = await fetchAnnualReportCriteria(FilingNumber, ID);
        break;
       }
       console.log(warn('NOT AN ANNUAL OR ONLINE REPORT'));
     }
    for(let i = 0; i < annualReportCriteria.length; i++) {
      if(annualReportCriteria[i].DocumentTypeID === 4) {
        annualDueNotice = annualReportCriteria[0]
        //  console.log(annualDueNotice, "Annual Report criteria");
        // TODO: handle parsing and errors 
        //  await fetchAnnualReport(annualDueNotice);
        break;
      } else {
        console.log(warn('No report to download.'));
      }
    }
        const info = {
          UBINumber: businessInfo.UBINumber,
          BusinessName: businessInfo.BusinessName,
          BusinessType: businessInfo.BusinessType,
          AgentName: businessInfo.AgentName,
          FullAddress: businessInfo.PrincipalOffice.PrincipalStreetAddress.FullAddress,
          CorrespondenceEmailAddress: businessInfo.CorrespondenceEmailAddress,
        }

        BUSINESS_SEARCH.push({...info, ...BusinessInformation, date_filed: FilingDateTime});
        if (BUSINESS_SEARCH.length === totalCount) break;
        BusinessType = businessInfo.BusinessType;

        const keyword = `${BusinessInformation.name} ${BusinessInformation.nature_of_business}`
        const oldkeyword = keyword.split(' ')
        const NewKeyWord = sw.removeStopwords(oldkeyword)
        const keywords = `${NewKeyWord}`.toString().replace(/,/g, '"')
        BUSINESS_INFO.push({
          "business_name_ubi":`"${BusinessInformation.name}" "${BusinessInformation.ubi}"`,
          "business_purpose":`"${BusinessInformation.nature_of_business}"`,
          "governor_first_last_name": `"${BusinessInformation.signer_first_name}" "${BusinessInformation.signer_last_name}"`,
          "governor_phone": `"${BusinessInformation.principal_office_phone}"`,
          "entity_email": `"${BusinessInformation.principal_office_email}"`,
          "registered_agent_first_last_name": `"${BusinessInformation.registered_agent_name}"`,
          "email":`"${BusinessInformation.registered_agent_mail}"`,
          "keyword":`"${keywords}"`
        })
      }
      const CSV = convertToCSV(BUSINESS_INFO, BusinessID)
    return {
      BUSINESSTYPE:  BusinessType, TOTAL: BUSINESS_SEARCH.length,
      BUSINESS_SEARCH,
      // do not remove the total count
      TotalRowCount,
    };
  };
};

module.exports = fetchTable;