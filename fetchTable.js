var { postHttp } = require('./httpService');
var AdvancedSearchEndpoint = 'https://cfda.sos.wa.gov/api/BusinessSearch/GetAdvanceBusinessSearchList';

async function fetchTable(businessSearchCriteria) {
    console.log('attempting to get %j', AdvancedSearchEndpoint);
    const data =  await postHttp(AdvancedSearchEndpoint, businessSearchCriteria)
    const totalCount = 200;
    let BUSINESS_SEARCH = []
    let BusinessType;
    let TotalRowCount;
    if(data) {
      for (let i = 0; i < data.length; i++) {
          let firstInfo = data[0]
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
        BusinessType = businessInfo.BusinessType
      }
    return {
      HEADER:  BusinessType,
      COUNT: BUSINESS_SEARCH.length,
      TotalRowCount,
      BUSINESS_SEARCH
    }
    }
}

module.exports = fetchTable;