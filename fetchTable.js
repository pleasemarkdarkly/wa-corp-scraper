var { postHttp } = require('./httpService');
var fetchFillingInformation = require('./fetchBillingInformation');
var fetchAnnualReportCriteria = require('./fetchAnnualReportCriteria');
var fetchAnnualReport = require('./fetchAnnualReport')

var AdvancedSearchEndpoint = 'https://cfda.sos.wa.gov/api/BusinessSearch/GetAdvanceBusinessSearchList';

async function fetchTable(businessSearchCriteria) {
    console.time("time-taken")
    console.log('Attempting to get %j', AdvancedSearchEndpoint);
    console.log("fetch 100 first and last of designated business types");
    const data =  await postHttp(AdvancedSearchEndpoint, businessSearchCriteria);
    const totalCount = 200;
    let BUSINESS_SEARCH = [];
    let BusinessType;
    let TotalRowCount;
    if(data) {
      for (let i = 0; i < data.length; i++) {
          let firstInfo = data[0];
          TotalRowCount = firstInfo.Criteria !== null ? firstInfo.Criteria.TotalRowCount : null
          let businessInfo = data[i];
          let BusinessID = data[i].BusinessID;
        console.log(BusinessID)

        fillingInformation  = await fetchFillingInformation(BusinessID)
     let FilingNumber, ID, annualReport, annualReportCriteria = [], annualDueNotice;
    //  console.log(fillingInformation.length);
     for (let i = 0; i < fillingInformation.length; i++) {
        annualReport = fillingInformation[0];
        FilingNumber = annualReport.FilingNumber;
        ID = annualReport.Transactionid 
        //console.log(annualReport, "Annual Report");
        annualReportCriteria = await fetchAnnualReportCriteria(FilingNumber, ID)
        // console.log(annualReportCriteria, "Annual Report criteria");
        break;
     }
    for(let i = 0; i < annualReportCriteria.length; i++) {
      if(annualReportCriteria[i].DocumentTypeID === 4) {
         annualDueNotice = annualReportCriteria[0]
        //  console.log(annualDueNotice, "Annual Report criteria");
         await fetchAnnualReport(annualDueNotice);
         break;
      } else {
        console.log('No report to download');
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

        BUSINESS_SEARCH.push(info);
        if (BUSINESS_SEARCH.length === totalCount) break;
        BusinessType = businessInfo.BusinessType;
      }
    return {
      // BusinessType.WA_LIMITED_LIABILITY_CORPORATION: total 32,000
      BUSINESSTYPE:  BusinessType, TOTAL: BUSINESS_SEARCH.length,
      BUSINESS_SEARCH,
      // do not remove the total count
      TotalRowCount
    };

   };
  };

module.exports = fetchTable;