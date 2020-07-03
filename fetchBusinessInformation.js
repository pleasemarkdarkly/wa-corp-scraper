var { getHttp } = require('./httpService');
var addressValidator = require('address-validator');
var Address = addressValidator.Address


function removeFromString(arr,str){
   let regex = new RegExp("\\b"+arr.join('|')+"\\b","gi")
   return str.replace(regex, '')
 }

function toSentenceCase(theString) {
   var newString = theString.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g,
   function(c) {
      return c.toUpperCase()
   });
  return newString;
}


async function  fetchBusinessInformation(BusinessId) {
   var BusinessInfoEndpoint = `https://cfda.sos.wa.gov/api/BusinessSearch/BusinessInformation?businessID=${BusinessId}`;

   /*
   TODO: Make sure all the information below is returned. 
   "UBI", "Business Name", "Business Type", "Business Status", "Nature of Business", "Principal Office Email", "Principal Office Phone", "Principal Office Street Address (1)", "Principal Office Street Address (2)", "Principal Office City", "Principal Office State", "Principal Office Zip", "Principal Office Address Full", "Principal Office Mailing Street Address (1)", "Principal Office Mailing Street Address (2)", "Principal Office Mailing City", "Principal Office Mailing State", "Principal Office Mailing Street Zip", "Principal Office Mailing Address Full", "Business Expiration Date", "Business Formation Date", Governor First name", "Governor Last Name", "Governor Type", "Registered Agent First Name", "Registered Agent Last Name", "Registered Agent Mailing Address", "Registered Agent Email", "Return Address for Filing Attention First Name", "Return Address for Filing Attention Last Name", "Return Address for Filing Attention Email", "Return Address Filing Mailing Street Address (1)", "Return Address Filing Mailing Street Address (2", "Return Address Filing Mailing City", "Return Address Filing Mailing State", "Return Address Filing Mailing Zip", "Authorized Person Signer Title", "Authorized Person Signer First Name", "Authorized Person Signer Last Name", "Authorized Person Type", "Last Filing Date", "Business Keywords"
   */

   
   const BusinessInformation =  await getHttp(BusinessInfoEndpoint);   
   
   // TODO: Business Name sometimes has extra characters, apply trim() at the appropriate stage
   console.log(BusinessInformation.BusinessName + " (" + BusinessInformation.UBINumber + "): " + BusinessInfoEndpoint);

   const keyword = `${BusinessInformation.BusinessName} ${BusinessInformation.BINAICSCodeDesc}`;
   const oldKeyword = keyword.split(" ");
   const newKeyword = sw.removeStopwords(oldKeyword);

   /*
   keywords: "#WETHEPLANET PROMOTING AWARENESS NEED DISRUPTIVE INNOVATION DEVELOPMENT CREATION INITIATIVES DEFY TRADITIONAL MODEL ACCELERATING RATE ONE MASTERS SKILLS INVOLVING..."

   TODO: General rules for handling output. 
   1. quotes around the value, separated by commas - hence csv or comma separated values
   2. any values which state "No value found" or "undefined" can be blank
   3. keywords are to have all stop words removed, all punctuation removed, and lower case, but all contained in a single quotes. "cats dogs horse apples cheese" 
   4. lawful purpose, llc, corporation, company and other business descriptions maybe removed. keep an array of special extraction words
   5. addresses are stored as both de-structured and without commas and combined for "Principal Office" and "Principal Office Mailing", this validator generally works well (https://www.npmjs.com/package/address-validator)
   6. Business purpose to be converted to sentence case.

   */

  const special_extraction_words = [
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
   "retail"
 ];

   let keywords = `${newKeyword}`.toString().replace(/[~`!@#$%^*(){}\[\];:"'<,.>?\/\\|_+=-]/g, " ").toLowerCase().trim();
   keywords = removeFromString(special_extraction_words,keywords);
   keywords = keywords.replace(/(^\s*)|(\s*$)/gi,"");
   keywords = keywords.replace(/[ ]{2,}/gi," ");
   // any single character remove
   keywords = keywords.replace(/\n/,"");

   console.log(keywords);
   

   return {
      name: `${BusinessInformation.BusinessName}`.trim(),
      type: BusinessInformation.BusinessType,
      status: BusinessInformation.BusinessStatus,
      ubi: BusinessInformation.UBINumber,
      
      registered_agent_name: BusinessInformation.Agent.FullName,
      registered_agent_mailing_address: BusinessInformation.Agent.MailingAddress.FullAddress,
      registered_agent_email: BusinessInformation.Agent.EmailAddress,
      registered_agent_first_name: BusinessInformation.Agent.FirstName,
      registered_agent_last_name:BusinessInformation.Agent.LastName,
      
      principal_office_email: BusinessInformation.PrincipalOffice.EmailAddress,
      principal_office_street_address_1: BusinessInformation.PrincipalOffice.PrincipalStreetAddress.StreetAddress1,
      principal_office_street_address_2: BusinessInformation.PrincipalOffice.PrincipalStreetAddress.StreetAddress2,
      principal_office_city: BusinessInformation.PrincipalOffice.PrincipalStreetAddress.City,
      principal_office_state: `${BusinessInformation.PrincipalOffice.PrincipalStreetAddress.Zip5} - ${BusinessInformation.PrincipalOffice.PrincipalStreetAddress.Zip4}`,
      principal_office_zip: BusinessInformation.PrincipalOffice.PrincipalStreetAddress.City,
      principal_office_full_address: BusinessInformation.PrincipalOffice.PrincipalStreetAddress.FullAddress,
      
      principal_office_mailing_street_address_1: BusinessInformation.PrincipalOffice.PrincipalMailingAddress.StreetAddress1,
      principal_office_mailing_street_address_2: BusinessInformation.PrincipalOffice.PrincipalMailingAddress.StreetAddress2,
      principal_office_mailing_city: BusinessInformation.PrincipalOffice.PrincipalMailingAddress.City,
      principal_office_mailing_state: `${BusinessInformation.PrincipalOffice.PrincipalMailingAddress.Zip5} - ${BusinessInformation.PrincipalOffice.PrincipalMailingAddress.Zip4}`,
      principal_office_mailing_zip: BusinessInformation.PrincipalOffice.PrincipalMailingAddress.City,
      principal_office_mailing_full_address: BusinessInformation.PrincipalOffice.PrincipalMailingAddress.FullAddress,
      principal_office_phone: BusinessInformation.PrincipalOffice.PhoneNumber,	   

      return_address_for_filing_attention_first_name: `${BusinessInformation.PrincipalsList[0] ?
         BusinessInformation.PrincipalsList[0].Title !== 'GOVERNOR' ? 
         BusinessInformation.PrincipalsList[0].FirstName : '' : ''}`,
      return_address_for_filing_attention_last_name: `${BusinessInformation.PrincipalsList[0] ?
         BusinessInformation.PrincipalsList[0].Title !== 'GOVERNOR' ? 
         BusinessInformation.PrincipalsList[0].LastName : '' : ''}`, 
      return_address_for_filing_attention_email: `${BusinessInformation.PrincipalsList[0] ?
         BusinessInformation.PrincipalsList[0].Title !== 'GOVERNOR' ? 
         BusinessInformation.BusinessInfoPrincipalOffice.EmailAddress : '' : ''}`,
      return_address_filing_mailing_street_address_1: BusinessInformation.MeetingPlace.StreetAddress1,
      return_address_filing_mailing_street_address_2: BusinessInformation.MeetingPlace.StreetAddress2,
      return_address_filing_mailing_city: BusinessInformation.MeetingPlace.City, 
      return_address_filing_mailing_state: BusinessInformation.MeetingPlace.State,
      return_address_filing_mailing_zip: `${BusinessInformation.MeetingPlace.Zip5}-${BusinessInformation.MeetingPlace.Zip4}`,          
      
      governor_first_name: `${!BusinessInformation.PrincipalsList[0] ? '' : BusinessInformation.PrincipalsList[0].FirstName}`,
      governor_last_name: `${BusinessInformation.PrincipalsList[0] ? BusinessInformation.PrincipalsList[0].LastName : ''}`,
      governor_type: `${BusinessInformation.PrincipalsList[0] ? BusinessInformation.PrincipalsList[0].PrincipalBaseType : ''}`, 

      authorized_signer_title: `${BusinessInformation.PrincipalsList[0] ? BusinessInformation.PrincipalsList[0].Title : ''}`,
      authorized_signer_last_name: `${BusinessInformation.PrincipalsList[0] ? BusinessInformation.PrincipalsList[0].LastName : ''}`,
      authorized_signer_first_name: `${BusinessInformation.PrincipalsList[0] ? BusinessInformation.PrincipalsList[0].FirstName : ''}`,
      authorized_person_type: `${BusinessInformation.PrincipalsList[0] ?
          BusinessInformation.PrincipalsList[0].Title !== 'GOVERNOR' ? 'INDIVIDUAL' : 'GOVERNOR' : ''}`,
      
      business_expiration_date: BusinessInformation.NextARDueDate,
      business_formation_date: `${toSentenceCase(BusinessInformation.DateOfIncorporation)}`,
      nature_of_business: BusinessInformation.BINAICSCodeDesc,   
      last_filing_date: BusinessInformation.LastARFiledDate,

      keywords
   }
}

module.exports = fetchBusinessInformation;