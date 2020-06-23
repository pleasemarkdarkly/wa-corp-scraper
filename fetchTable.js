var {
  postHttp
} = require('./httpService')

var AdvancedSearchEndpint = 'https://cfda.sos.wa.gov/api/BusinessSearch/GetAdvanceBusinessSearchList';

async function fetchTable(businessSearchcriteria) {
  console.log('attempting to get %j', AdvancedSearchEndpint);
  const data = await postHttp(AdvancedSearchEndpint, businessSearchcriteria)
  console.log(data.length);
  const totalCount = 100;
  let WA_LIMITED_LIABILITY_CORPORATION = [];
  let WA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP = [];
  let WA_LIMITED_LIABILITY_PARTNERSHIP = [];
  let WA_LIMITED_PARTNERSHIP = [];
  let WA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY = [];
  let WA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP = [];
  let WA_PROFESSIONAL_SERVICE_CORPORATION = [];
  let WA_PROFIT_CORPORATION = [];

  if (data) {
    for (let i = 0; i < data.length; i++) {
      let businessInfo = data[i];

      if (businessInfo.BusinessType === 'WA PROFIT CORPORATION') {
        const info = {
          UBINumber: businessInfo.UBINumber,
          BusinessName: businessInfo.BusinessName,
          BusinessType: businessInfo.BusinessType,
          AgentName: businessInfo.AgentName,
          FullAddress: businessInfo.PrincipalOffice.PrincipalStreetAddress.FullAddress,
          CorrespondenceEmailAddress: businessInfo.CorrespondenceEmailAddress,
        }
        WA_PROFIT_CORPORATION.push(info)
        if (WA_PROFIT_CORPORATION.length === totalCount) break;
      }

      if (businessInfo.BusinessType === 'WA PROFESSIONAL SERVICE CORPORATION') {
        const info = {
          UBINumber: businessInfo.UBINumber,
          BusinessName: businessInfo.BusinessName,
          BusinessType: businessInfo.BusinessType,
          AgentName: businessInfo.AgentName,
          FullAddress: businessInfo.PrincipalOffice.PrincipalStreetAddress.FullAddress,
          CorrespondenceEmailAddress: businessInfo.CorrespondenceEmailAddress,
        }
        WA_PROFESSIONAL_SERVICE_CORPORATION.push(info)
        if (WA_PROFESSIONAL_SERVICE_CORPORATION.length === totalCount) break;
      }

      if (businessInfo.BusinessType === 'WA PROFESSIONAL LIMITED LIABILITY PARTNERSHIP') {
        const info = {
          UBINumber: businessInfo.UBINumber,
          BusinessName: businessInfo.BusinessName,
          BusinessType: businessInfo.BusinessType,
          AgentName: businessInfo.AgentName,
          FullAddress: businessInfo.PrincipalOffice.PrincipalStreetAddress.FullAddress,
          CorrespondenceEmailAddress: businessInfo.CorrespondenceEmailAddress,
        }
        WA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP.push(info)
        if (WA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP.length === totalCount) break;

      }

      if (businessInfo.BusinessType === 'WA PROFESSIONAL LIMITED LIABILITY COMPANY') {
        const info = {
          UBINumber: businessInfo.UBINumber,
          BusinessName: businessInfo.BusinessName,
          BusinessType: businessInfo.BusinessType,
          AgentName: businessInfo.AgentName,
          FullAddress: businessInfo.PrincipalOffice.PrincipalStreetAddress.FullAddress,
          CorrespondenceEmailAddress: businessInfo.CorrespondenceEmailAddress,
        }
        WA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY.push(info)
        if (WA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY.length === totalCount) break;
      }

      if (businessInfo.BusinessType === 'WA LIMITED PARTNERSHIP') {
        const info = {
          UBINumber: businessInfo.UBINumber,
          BusinessName: businessInfo.BusinessName,
          BusinessType: businessInfo.BusinessType,
          AgentName: businessInfo.AgentName,
          FullAddress: businessInfo.PrincipalOffice.PrincipalStreetAddress.FullAddress,
          CorrespondenceEmailAddress: businessInfo.CorrespondenceEmailAddress,
        }
        WA_LIMITED_PARTNERSHIP.push(info)
        if (WA_LIMITED_PARTNERSHIP.length === totalCount) break;

      }

      if (businessInfo.BusinessType === 'WA LIMITED LIABILITY PARTNERSHIP') {
        const info = {
          UBINumber: businessInfo.UBINumber,
          BusinessName: businessInfo.BusinessName,
          BusinessType: businessInfo.BusinessType,
          AgentName: businessInfo.AgentName,
          FullAddress: businessInfo.PrincipalOffice.PrincipalStreetAddress.FullAddress,
          CorrespondenceEmailAddress: businessInfo.CorrespondenceEmailAddress,
        }
        WA_LIMITED_LIABILITY_PARTNERSHIP.push(info)
        if (WA_LIMITED_LIABILITY_PARTNERSHIP.length === totalCount) break;

      }

      if (businessInfo.BusinessType === 'WA LIMITED LIABILITY CORPORATION PARTNERSHIP') {
        const info = {
          UBINumber: businessInfo.UBINumber,
          BusinessName: businessInfo.BusinessName,
          BusinessType: businessInfo.BusinessType,
          AgentName: businessInfo.AgentName,
          FullAddress: businessInfo.PrincipalOffice.PrincipalStreetAddress.FullAddress,
          CorrespondenceEmailAddress: businessInfo.CorrespondenceEmailAddress,
        }
        WA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP.push(info)
        if (WA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP.length === totalCount) break;

      }

      if (businessInfo.BusinessType === 'WA_LIMITED_LIABILITY_CORPORATION') {
        const info = {
          UBINumber: businessInfo.UBINumber,
          BusinessName: businessInfo.BusinessName,
          BusinessType: businessInfo.BusinessType,
          AgentName: businessInfo.AgentName,
          FullAddress: businessInfo.PrincipalOffice.PrincipalStreetAddress.FullAddress,
          CorrespondenceEmailAddress: businessInfo.CorrespondenceEmailAddress,
        }
        WA_LIMITED_LIABILITY_CORPORATION.push(info)
        if (WA_LIMITED_LIABILITY_CORPORATION.length === totalCount) break;
      }
    }
    console.log("<<<<<<<<<<  COUNT <<<<<<<<<<<<<");
    console.log("<<<<<<<<<<  COUNT <<<<<<<<<<<<<");

    console.log("<<<<<<<<<< WA_LIMITED_LIABILITY_CORPORATION <<<<<<<<<<<<<", "COUNT:", WA_LIMITED_LIABILITY_CORPORATION.length);
    console.log(WA_LIMITED_LIABILITY_CORPORATION);

    console.log("<<<<<<<<<< WA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP <<<<<<<<<<<<<", "COUNT:", WA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP.length);
    console.log(WA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP);

    console.log("<<<<<<<<<< WA_LIMITED_LIABILITY_PARTNERSHIP <<<<<<<<<<<<<", "COUNT:", WA_LIMITED_LIABILITY_PARTNERSHIP.length);
    console.log(WA_LIMITED_LIABILITY_PARTNERSHIP);

    console.log("<<<<<<<<<< WA_LIMITED_PARTNERSHIP <<<<<<<<<<<<<", "COUNT:", WA_LIMITED_PARTNERSHIP.length);
    console.log(WA_LIMITED_PARTNERSHIP);

    console.log("<<<<<<<<<< WA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY <<<<<<<<<<<<<", "COUNT:", WA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY.length);
    console.log(WA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY);

    console.log("<<<<<<<<<< WA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP <<<<<<<<<<<<<", "COUNT:", WA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP.length);
    console.log(WA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP);

    console.log("<<<<<<<<<< WA_PROFIT_CORPORATION <<<<<<<<<<<<<", "COUNT:", WA_PROFIT_CORPORATION.length);
    console.log(WA_PROFIT_CORPORATION);

    console.log("<<<<<<<<<< WA_PROFESSIONAL_SERVICE_CORPORATION <<<<<<<<<<<<<", "COUNT:", WA_PROFESSIONAL_SERVICE_CORPORATION.length);
    console.log(WA_PROFESSIONAL_SERVICE_CORPORATION);
  }
}
module.exports = fetchTable