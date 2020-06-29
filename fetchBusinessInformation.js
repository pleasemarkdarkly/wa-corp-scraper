var { getHttp } = require('./httpService');
var clc = require("cli-color");
var info = clc.white.bold;
var error = clc.red.bold;
var warn = clc.yellow;
var notice = clc.blue;

var BusinessInfoEndpoint = 'https://cfda.sos.wa.gov/api/BusinessSearch/BusinessInformation?businessID=1206337';

async function  fetchBusinessInformation() {
   console.log(notice('Attempting to get %j', BusinessInfoEndpoint));
   const data =  await getHttp(BusinessInfoEndpoint);
   console.log(data);
   return {
      name: data.BusinessName,
      type: data.BusinessType,
      status: data.BusinessStatus,
      ubi: data.UBINumber,

      registered_agent_name: data.Agent.FullName,
      registered_agent_mailing_address: data.Agent.MailingAddress.FullAddress,
      date_filed: data.Agent.LastARFiledDate,

      principal_office_email: data.PrincipalOffice.EmailAddress,
      principal_office_street_address: data.PrincipalOffice.FullAddress,
      principal_office_phone: data.PrincipalOffice.PhoneNumber,

      governor_first_name: data.PrincipalsList[0].FirstName,
      governor_last_name: data.PrincipalsList[0].LastName,

      nature_of_business: data.BINAICSCodeDesc,
   }
}

module.exports = fetchBusinessInformation;