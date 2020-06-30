var { postHttp } = require('./httpService');
var clc = require("cli-color");

var info = clc.white.bold;
var error = clc.red.bold;
var warn = clc.yellow;
var notice = clc.blue;

var fetchFillingInformation = require('./fetchBillingInformation');
var fetchAnnualReportCriteria = require('./fetchAnnualReportCriteria');
var fetchAnnualReport = require('./fetchAnnualReport');
var fetchBusinessInformation = require('./fetchBusinessInformation');
var convertToCSV = require('./helpers/convertToCSV');


var AdvancedSearchEndpoint = 'https://cfda.sos.wa.gov/api/BusinessSearch/GetAdvanceBusinessSearchList';

async function fetchTable(businessSearchCriteria) {
    console.time("Time-taken");
    console.log(notice('Attempting to get %j.', AdvancedSearchEndpoint));
    console.log(notice("Fetch 100 first and last of designated business types"));
    const data =  await postHttp(AdvancedSearchEndpoint, businessSearchCriteria);
    const totalCount = 200;
    let BUSINESS_SEARCH = [];
    let BUSINESS_INFO = [];
    let ALL_CSV = [];
    let BusinessType;
    let BusinessID;
    let TotalRowCount;
    let  BussinessInformation;
    let fillingInformation;
    if(data) {
      for (let i = 0; i < data.length; i++) {
          let firstInfo = data[0];
          TotalRowCount = firstInfo.Criteria !== null ? firstInfo.Criteria.TotalRowCount : null
          let businessInfo = data[i];
          BusinessID = data[i].BusinessID;

        BussinessInformation  = await fetchBusinessInformation(BusinessID)

        fillingInformation  = await fetchFillingInformation(BusinessID)
     let FilingNumber, ID, annualReport, annualReportCriteria = [], annualDueNotice;
     for (let i = 0; i < fillingInformation.length; i++) {
       if (fillingInformation[i].FilingTypeName ===	"ANNUAL REPORT"  ||  fillingInformation[i].FilingTypeName === 'INITIAL REPORT') {
        annualReport = fillingInformation[0];
        FilingNumber = annualReport.FilingNumber;
        ID = annualReport.Transactionid;
        FilingDateTime	= annualReport.FilingDateTime	
        //console.log(annualReport, "Annual Report");
        annualReportCriteria = await fetchAnnualReportCriteria(FilingNumber, ID)
        // console.log(annualReportCriteria, "Annual Report criteria");
        break;
       }
       console.log(warn('NOT AN ANNUAL OR ONLINE REPORT'));
     }
    for(let i = 0; i < annualReportCriteria.length; i++) {
      if(annualReportCriteria[i].DocumentTypeID === 4) {
         annualDueNotice = annualReportCriteria[0]
        //  console.log(annualDueNotice, "Annual Report criteria");
        // STILL WORKING ON PARSING AND ERROR
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

        BUSINESS_SEARCH.push({...info, ...BussinessInformation, date_filed: FilingDateTime});
        if (BUSINESS_SEARCH.length === totalCount) break;
        BusinessType = businessInfo.BusinessType;
        BUSINESS_INFO.push({
          business_name_ubi: `${BussinessInformation.name} (${BussinessInformation.ubi})`,
          business_purpose: BussinessInformation.nature_of_business,
          governor_first_last_name: `${BussinessInformation.signer_first_name} (${BussinessInformation.signer_last_name})`,
          governor_phone: BussinessInformation.principal_office_phone,
          entity_email: BussinessInformation.principal_office_email,
          registered_agent_first_last_name: BussinessInformation.registered_agent_name,
          email: BussinessInformation.registered_agent_mail
        })
      }
      const CSV = convertToCSV(BUSINESS_INFO, BusinessID)
      // ALL_CSV.push(CSV)

    return {
      BUSINESSTYPE:  BusinessType, TOTAL: BUSINESS_SEARCH.length,
      BUSINESS_SEARCH,
      // do not remove the total count
      TotalRowCount,
    };

   };
  };

module.exports = fetchTable;