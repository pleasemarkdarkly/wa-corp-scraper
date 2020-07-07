import { getHttp } from "./httpService";
import sw from "stopword";
import  logger  from './config/winston';

function removeFromString(arr: [], str: string) {
  let regex = new RegExp("\\b" + arr.join("|") + "\\b", "gi");
  return str.replace(regex, "");
}

function toSentenceCase(theString: string) {
  var newString = theString
    .toLowerCase()
    .replace(/(^\s*\w|[\.\!\?]\s*\w)/g, function (c) {
      return c.toUpperCase();
    });
  return newString;
}

function formatInut(str: string) {
  if (str === undefined || str === null || typeof str !== "string") return " ";
  return str.replace(/[~`!@#$%^*(){}\[\];:"'<,.>?\/\\|_+=-]\n/g, " ")

}

async function fetchBusinessInformation(businessId: string) {
  var BusinessInfoEndpoint = `https://cfda.sos.wa.gov/api/BusinessSearch/BusinessInformation?businessID=${businessId}`;

  /*
   TODO: Make sure all the information below is returned. 
   "UBI", "Business Name", "Business Type", "Business Status", "Nature of Business", "Principal Office Email", "Principal Office Phone", "Principal Office Street Address (1)", "Principal Office Street Address (2)", "Principal Office City", "Principal Office State", "Principal Office Zip", "Principal Office Address Full", "Principal Office Mailing Street Address (1)", "Principal Office Mailing Street Address (2)", "Principal Office Mailing City", "Principal Office Mailing State", "Principal Office Mailing Street Zip", "Principal Office Mailing Address Full", "Business Expiration Date", "Business Formation Date", Governor First name", "Governor Last Name", "Governor Type", "Registered Agent First Name", "Registered Agent Last Name", "Registered Agent Mailing Address", "Registered Agent Email", "Return Address for Filing Attention First Name", "Return Address for Filing Attention Last Name", "Return Address for Filing Attention Email", "Return Address Filing Mailing Street Address (1)", "Return Address Filing Mailing Street Address (2", "Return Address Filing Mailing City", "Return Address Filing Mailing State", "Return Address Filing Mailing Zip", "Authorized Person Signer Title", "Authorized Person Signer First Name", "Authorized Person Signer Last Name", "Authorized Person Type", "Last Filing Date", "Business Keywords"
   */

  const BusinessInformation = await getHttp(BusinessInfoEndpoint);

  // TODO: Business Name sometimes has extra characters, apply trim() at the appropriate stage
  logger.log({
    level: 'info',
    message: BusinessInformation.BusinessName +
            " (" +
            BusinessInformation.UBINumber +
            "): " +
            BusinessInfoEndpoint
  });

  const keyword = `${BusinessInformation.BusinessName} ${BusinessInformation.BINAICSCodeDesc}`;
  const oldKeyword = keyword.split(" ");
  const newKeyword = sw.removeStopwords(oldKeyword);

  const special_extraction_words: any = [
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
    "retail",
  ];

  let keywords = `${newKeyword}`
    .toString()
    .replace(/[~`!@#$%^*(){}\[\];:"'<,.>?\/\\|_+=-]/g, " ")
    .toLowerCase()
    .trim();
  keywords = removeFromString(special_extraction_words, keywords);
  keywords = keywords.replace(/(^\s*)|(\s*$)/gi, "");
  keywords = keywords.replace(/[ ]{2,}/gi, " ");
  keywords = keywords.replace(/\n/, "");

  logger.log({
    level: 'info',
    message: `keywords: ${keywords}`
  });

  return {
    name: `${formatInut(BusinessInformation.BusinessName)}`.trim(),
    type: `${formatInut(BusinessInformation.BusinessType)}`,
    status: `${formatInut(BusinessInformation.BusinessStatus)}`,
    ubi: `${formatInut(BusinessInformation.UBINumber)}`,

    registered_agent_name: `${formatInut(BusinessInformation.Agent.FullName)}`,
    registered_agent_mailing_address: `${formatInut(
      BusinessInformation.Agent.MailingAddress.FullAddress
    )}`,
    registered_agent_email: `${formatInut(
      BusinessInformation.Agent.EmailAddress
    )}`,
    registered_agent_first_name: `${formatInut(
      BusinessInformation.Agent.FirstName
    )}`,
    registered_agent_last_name: `${formatInut(
      BusinessInformation.Agent.LastName
    )}`,

    principal_office_email: `${formatInut(
      BusinessInformation.PrincipalOffice.EmailAddress
    )}`,
    principal_office_street_address_1: `${formatInut(
      BusinessInformation.PrincipalOffice.PrincipalStreetAddress.StreetAddress1
    )}`,
    principal_office_street_address_2: `${formatInut(
      BusinessInformation.PrincipalOffice.PrincipalStreetAddress.StreetAddress2
    )}`,
    principal_office_city: `${formatInut(
      BusinessInformation.PrincipalOffice.PrincipalStreetAddress.City
    )}`,
    principal_office_state: `${formatInut(
      BusinessInformation.PrincipalOffice.PrincipalStreetAddress.Zip5
    )} - ${formatInut(
      BusinessInformation.PrincipalOffice.PrincipalStreetAddress.Zip4
    )}`,
    principal_office_zip: `${formatInut(
      BusinessInformation.PrincipalOffice.PrincipalStreetAddress.City
    )}`,
    principal_office_full_address: `${formatInut(
      BusinessInformation.PrincipalOffice.PrincipalStreetAddress.FullAddress
    )}`,

    principal_office_mailing_street_address_1: `${formatInut(
      BusinessInformation.PrincipalOffice.PrincipalMailingAddress.StreetAddress1
    )}`,
    principal_office_mailing_street_address_2: `${formatInut(
      BusinessInformation.PrincipalOffice.PrincipalMailingAddress.StreetAddress2
    )}`,
    principal_office_mailing_city: `${formatInut(
      BusinessInformation.PrincipalOffice.PrincipalMailingAddress.City
    )}`,
    principal_office_mailing_state: `${BusinessInformation.PrincipalOffice.PrincipalMailingAddress.Zip5} - ${BusinessInformation.PrincipalOffice.PrincipalMailingAddress.Zip4}`,
    principal_office_mailing_zip: `${formatInut(
      BusinessInformation.PrincipalOffice.PrincipalMailingAddress.City
    )}`,
    principal_office_mailing_full_address: `${formatInut(
      BusinessInformation.PrincipalOffice.PrincipalMailingAddress.FullAddress
    )}`,
    principal_office_phone: `${formatInut(
      BusinessInformation.PrincipalOffice.PhoneNumber
    )}`,

    return_address_for_filing_attention_first_name: `${formatInut(
      BusinessInformation.PrincipalsList[0]
        ? BusinessInformation.PrincipalsList[0].Title !== "GOVERNOR"
          ? BusinessInformation.PrincipalsList[0].FirstName
          : ""
        : ""
    )}`,
    return_address_for_filing_attention_last_name: `${formatInut(
      BusinessInformation.PrincipalsList[0]
        ? BusinessInformation.PrincipalsList[0].Title !== "GOVERNOR"
          ? BusinessInformation.PrincipalsList[0].LastName
          : ""
        : ""
    )}`,
    return_address_for_filing_attention_email: `${formatInut(
      BusinessInformation.PrincipalsList[0]
        ? BusinessInformation.PrincipalsList[0].Title !== "GOVERNOR"
          ? BusinessInformation.BusinessInfoPrincipalOffice.EmailAddress
          : ""
        : ""
    )}`,
    return_address_filing_mailing_street_address_1: `${formatInut(
      BusinessInformation.MeetingPlace.StreetAddress1
    )}`,
    return_address_filing_mailing_street_address_2: `${formatInut(
      BusinessInformation.MeetingPlace.StreetAddress2
    )}`,
    return_address_filing_mailing_city: `${formatInut(
      BusinessInformation.MeetingPlace.City
    )}`,
    return_address_filing_mailing_state: `${formatInut(
      BusinessInformation.MeetingPlace.State
    )}`,
    return_address_filing_mailing_zip: `${formatInut(
      BusinessInformation.MeetingPlace.Zip5
    )}-${formatInut(BusinessInformation.MeetingPlace.Zip4)}`,

    governor_first_name: `${formatInut(
      !BusinessInformation.PrincipalsList[0]
        ? ""
        : BusinessInformation.PrincipalsList[0].FirstName
    )}`,
    governor_last_name: `${formatInut(
      BusinessInformation.PrincipalsList[0]
        ? BusinessInformation.PrincipalsList[0].LastName
        : ""
    )}`,
    governor_type: `${formatInut(
      BusinessInformation.PrincipalsList[0]
        ? BusinessInformation.PrincipalsList[0].PrincipalBaseType
        : ""
    )}`,

    authorized_signer_title: `${formatInut(
      BusinessInformation.PrincipalsList[0]
        ? BusinessInformation.PrincipalsList[0].Title
        : ""
    )}`,
    authorized_signer_last_name: `${formatInut(
      BusinessInformation.PrincipalsList[0]
        ? BusinessInformation.PrincipalsList[0].LastName
        : ""
    )}`,
    authorized_signer_first_name: `${formatInut(
      BusinessInformation.PrincipalsList[0]
        ? BusinessInformation.PrincipalsList[0].FirstName
        : ""
    )}`,
    authorized_person_type: `${formatInut(
      BusinessInformation.PrincipalsList[0]
        ? BusinessInformation.PrincipalsList[0].Title !== "GOVERNOR"
          ? "INDIVIDUAL"
          : "GOVERNOR"
        : ""
    )}`,

    business_expiration_date: `${formatInut(
      BusinessInformation.NextARDueDate
    )}`,
    business_formation_date: `${toSentenceCase(
      formatInut(BusinessInformation.DateOfIncorporation)
    )}`,
    nature_of_business: `${formatInut(BusinessInformation.BINAICSCodeDesc)}`,
    last_filing_date: `${formatInut(BusinessInformation.LastARFiledDate)}`,
    keywords,
  };
}

export default fetchBusinessInformation;
