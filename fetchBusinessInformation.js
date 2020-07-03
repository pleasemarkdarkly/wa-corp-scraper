var { getHttp } = require('./httpService');

async function  fetchBusinessInformation(BusinessId) {
   var BusinessInfoEndpoint = `https://cfda.sos.wa.gov/api/BusinessSearch/BusinessInformation?businessID=${BusinessId}`;

   /*
   TODO: Make sure all the information below is returned. 
   "UBI", "Business Name", "Business Type", "Business Status", "Nature of Business", "Principal Office Email", "Principal Office Phone", "Principal Office Street Address (1)", "Principal Office Street Address (2)", "Principal Office City", "Principal Office State", "Principal Office Zip", "Principal Office Address Full", "Principal Office Mailing Street Address (1)", "Principal Office Mailing Street Address (2)", "Principal Office Mailing City", "Principal Office Mailing State", "Principal Office Mailing Street Zip", "Principal Office Mailing Address Full", "Business Expiration Date", "Business Formation Date", Governor First name", "Governor Last Name", "Governor Type", "Registered Agent First Name", "Registered Agent Last Name", "Registered Agent Mailing Address", "Registered Agent Email", "Return Address for Filing Attention First Name", "Return Address for Filing Attention Last Name", "Return Address for Filing Attention Email", "Return Address Filing Mailing Street Address (1)", "Return Address Filing Mailing Street Address (2", "Return Address Filing Mailing City", "Return Address Filing Mailing State", "Return Address Filing Mailing Zip", "Authorized Person Signer Title", "Authorized Person Signer First Name", "Authorized Person Signer Last Name", "Authorized Person Type", "Last Filing Date", "Business Keywords"
   */

   const BusinessInformation =  await getHttp(BusinessInfoEndpoint);   
   
   // TODO: Business Name sometimes has extra characters, apply trim() at the appropriate stage
   console.log(BusinessInformation.BusinessName + " (" + BusinessInformation.UBINumber + "): " + BusinessInfoEndpoint);

   return {
      name: BusinessInformation.BusinessName,
      type: BusinessInformation.BusinessType,
      status: BusinessInformation.BusinessStatus,
      ubi: BusinessInformation.UBINumber,
      registered_agent_name: BusinessInformation.Agent.FullName,
      registered_agent_mailing_address: BusinessInformation.Agent.MailingAddress.FullAddress,
      registered_agent_email: BusinessInformation.Agent.EmailAddress,
      principal_office_email: BusinessInformation.PrincipalOffice.EmailAddress,
      principal_office_street_address: BusinessInformation.PrincipalOffice.PrincipalStreetAddress.FullAddress,
      principal_office_phone: BusinessInformation.PrincipalOffice.PhoneNumber,	
      governor_first_name: `${!BusinessInformation.PrincipalsList[0] ? '' : BusinessInformation.PrincipalsList[0].FirstName}`,
      governor_last_name: `${BusinessInformation.PrincipalsList[0] ? BusinessInformation.PrincipalsList[0].LastName : ''}`,
      nature_of_business: BusinessInformation.BINAICSCodeDesc,
      signer_title: `${BusinessInformation.PrincipalsList[0] ? BusinessInformation.PrincipalsList[0].Title : ''}`,
      signer_last_name: `${BusinessInformation.PrincipalsList[0] ? BusinessInformation.PrincipalsList[0].LastName : ''}`,
      signer_first_name: `${BusinessInformation.PrincipalsList[0] ? BusinessInformation.PrincipalsList[0].FirstName : ''}`,
      initial_report_received_date: BusinessInformation.LastARFiledDate,
   }
}

module.exports = fetchBusinessInformation;