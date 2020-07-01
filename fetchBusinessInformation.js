var { getHttp } = require('./httpService');
var clc = require("cli-color");

var info = clc.white.bold;
var error = clc.red.bold;
var warn = clc.yellow;
var notice = clc.blue;

async function  fetchBusinessInformation(BussinessID) {
   // console.time("Time-taken");
   var BusinessInfoEndpoint = `https://cfda.sos.wa.gov/api/BusinessSearch/BusinessInformation?businessID=${BussinessID}`;

   console.log(notice('Business information ', BusinessInfoEndpoint));
   const BussinessInformation =  await getHttp(BusinessInfoEndpoint);   
   return {
      name: BussinessInformation.BusinessName,
      type: BussinessInformation.BusinessType,
      status: BussinessInformation.BusinessStatus,
      ubi: BussinessInformation.UBINumber,
      registered_agent_name: BussinessInformation.Agent.FullName,
      registered_agent_mailing_address: BussinessInformation.Agent.MailingAddress.FullAddress,
      registered_agent_mail: BussinessInformation.Agent.EmailAddress,
      principal_office_email: BussinessInformation.PrincipalOffice.EmailAddress,
      principal_office_street_address: BussinessInformation.PrincipalOffice.PrincipalStreetAddress.FullAddress,
      principal_office_phone: BussinessInformation.PrincipalOffice.PhoneNumber,	
      governor_first_name: `${!BussinessInformation.PrincipalsList[0] ? '' : BussinessInformation.PrincipalsList[0].FirstName}`,
      governor_last_name: `${BussinessInformation.PrincipalsList[0] ? BussinessInformation.PrincipalsList[0].LastName : ''}`,
      nature_of_business: BussinessInformation.BINAICSCodeDesc,
      signer_title: `${BussinessInformation.PrincipalsList[0] ? BussinessInformation.PrincipalsList[0].Title : ''}`,
      signer_last_name: `${BussinessInformation.PrincipalsList[0] ? BussinessInformation.PrincipalsList[0].LastName : ''}`,
      signer_first_name: `${BussinessInformation.PrincipalsList[0] ? BussinessInformation.PrincipalsList[0].FirstName : ''}`,
      initial_report_received_date: BussinessInformation.LastARFiledDate,
   }
}

module.exports = fetchBusinessInformation;