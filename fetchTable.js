var { postHttp } = require('./httpService');
var AdvancedSearchEndpoint = 'https://cfda.sos.wa.gov/api/BusinessSearch/GetAdvanceBusinessSearchList';

async function fetchTable(businessSearchCriteria) {
    console.time("timer1")
    console.log('Attempting to get %j', AdvancedSearchEndpoint);
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
    };
  };
};

module.exports = fetchTable;