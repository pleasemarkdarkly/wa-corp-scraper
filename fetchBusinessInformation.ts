import { getHttp } from "./httpService";
import sw from "stopword";
import  logger  from './common/winston';

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

function formatInput(str: string) {
  if (str === undefined || str === null || typeof str !== "string") return " ";
  let str2 = str.replace(/[^\w\s]/gi, '').trim() 
  return str2;

}

function titleCase(str: any) {
  str = str.toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
  }
  return str.join(' ');
}

function formatNInput(str: any) {
  if (str === undefined || str === null || typeof str !== "string") return " ";
  if (typeof str === "string") {
    let str2 = str.replace(/[^\w\s]/gi, '').trim() 
    let rnl = str2.replace(/\n/g, '')
    let tnl = rnl.replace(/\t/g, '')
    let tnt = tnl.replace(/\r/g, '')
   return tnt.trim();
  }
}

async function fetchBusinessInformation(businessId: any) {
  var BusinessInfoEndpoint = `https://cfda.sos.wa.gov/api/BusinessSearch/BusinessInformation?businessID=${businessId}`;

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
    level: 'debug',
    message: `keywords: ${keywords}`
  });

  return {
    name: `${titleCase(formatInput(BusinessInformation.BusinessName))}`,
    type: `${formatInput(BusinessInformation.BusinessType)}`,
    status: `${formatInput(BusinessInformation.BusinessStatus)}`,
    ubi: `${formatInput(BusinessInformation.UBINumber)}`,

    registered_agent_name: `${titleCase(formatInput(BusinessInformation.Agent.FullName))}`,
    registered_agent_mailing_address: `${formatInput(
      BusinessInformation.Agent.MailingAddress.FullAddress
    )}`,
    registered_agent_email: `${BusinessInformation.Agent.EmailAddress}`.trim(),
    registered_agent_first_name: `${titleCase(formatInput(
      BusinessInformation.Agent.FirstName
    ))}`,
    registered_agent_last_name: `${titleCase(formatInput(
      BusinessInformation.Agent.LastName
    ))}`,

    principal_office_email: `${BusinessInformation.PrincipalOffice.EmailAddress}`.trim(),
    principal_office_street_address_1: `${formatInput(
      BusinessInformation.PrincipalOffice.PrincipalStreetAddress.StreetAddress1
    )}`,
    principal_office_street_address_2: `${formatInput(
      BusinessInformation.PrincipalOffice.PrincipalStreetAddress.StreetAddress2
    )}`,
    principal_office_city: `${formatInput(
      BusinessInformation.PrincipalOffice.PrincipalStreetAddress.City
    )}`,
    principal_office_state: `${formatInput(
      BusinessInformation.PrincipalOffice.PrincipalStreetAddress.State
    )}`,
    principal_office_zip: `${formatInput(
      BusinessInformation.PrincipalOffice.PrincipalStreetAddress.Zip5
    )}${
      BusinessInformation.PrincipalOffice.PrincipalStreetAddress.Zip4 ? 
      `-${formatInput(BusinessInformation.PrincipalOffice.PrincipalStreetAddress.Zip4)}`
      : ''
    }`,
    principal_office_full_address: `${formatInput(
      BusinessInformation.PrincipalOffice.PrincipalStreetAddress.FullAddress
    )}`,

    principal_office_mailing_street_address_1: `${formatInput(
      BusinessInformation.PrincipalOffice.PrincipalMailingAddress.StreetAddress1
    )}`,
    principal_office_mailing_street_address_2: `${formatInput(
      BusinessInformation.PrincipalOffice.PrincipalMailingAddress.StreetAddress2
    )}`,
    principal_office_mailing_city: `${formatInput(
      BusinessInformation.PrincipalOffice.PrincipalMailingAddress.City
    )}`,
    principal_office_mailing_state: `${formatInput(
      BusinessInformation.PrincipalOffice.PrincipalMailingAddress.State
    )}`,
    principal_office_mailing_zip: `${formatInput(BusinessInformation.PrincipalOffice.PrincipalMailingAddress.Zip5)} ${
      BusinessInformation.PrincipalOffice.PrincipalMailingAddress.Zip4 ? 
      `-${formatInput(BusinessInformation.PrincipalOffice.PrincipalMailingAddress.Zip4)}`
      :''
    }`,
    principal_office_mailing_full_address: `${formatInput(
      BusinessInformation.PrincipalOffice.PrincipalMailingAddress.FullAddress
    )}`,
    principal_office_phone: `${formatInput(
      BusinessInformation.PrincipalOffice.PhoneNumber
    )}`,

    return_address_for_filing_attention_first_name: `${titleCase(formatInput(
      BusinessInformation.PrincipalsList[0]
        ? BusinessInformation.PrincipalsList[0].Title !== "GOVERNOR"
          ? BusinessInformation.PrincipalsList[0].FirstName
          : ""
        : ""
    ))}`,
    return_address_for_filing_attention_last_name: `${titleCase(formatInput(
      BusinessInformation.PrincipalsList[0]
        ? BusinessInformation.PrincipalsList[0].Title !== "GOVERNOR"
          ? BusinessInformation.PrincipalsList[0].LastName
          : ""
        : ""
    ))}`,
    return_address_for_filing_attention_email: `${
      BusinessInformation.PrincipalsList[0]
        ? BusinessInformation.PrincipalsList[0].Title !== "GOVERNOR"
          ? BusinessInformation.BusinessInfoPrincipalOffice.EmailAddress
          : ""
        : ""
    }`.trim(),
    return_address_filing_mailing_street_address_1: `${formatInput(
      BusinessInformation.MeetingPlace.StreetAddress1
    )}`,
    return_address_filing_mailing_street_address_2: `${formatInput(
      BusinessInformation.MeetingPlace.StreetAddress2
    )}`,
    return_address_filing_mailing_city: `${formatInput(
      BusinessInformation.MeetingPlace.City
    )}`,
    return_address_filing_mailing_state: `${formatInput(
      BusinessInformation.MeetingPlace.State
    )}`,
    return_address_filing_mailing_zip: `${formatInput(
      BusinessInformation.MeetingPlace.Zip5
    )}${
      BusinessInformation.MeetingPlace.Zip4 ?
      `-${formatInput(BusinessInformation.MeetingPlace.Zip4)}`
      : ''
      }`,

    governor_first_name: `${titleCase(formatInput(
      !BusinessInformation.PrincipalsList[0]
        ? ""
        : BusinessInformation.PrincipalsList[0].FirstName
    ))}`,
    governor_last_name: `${titleCase(formatInput(
      BusinessInformation.PrincipalsList[0]
        ? BusinessInformation.PrincipalsList[0].LastName
        : ""
    ))}`,
    governor_type: `${titleCase(formatInput(
      BusinessInformation.PrincipalsList[0]
        ? BusinessInformation.PrincipalsList[0].PrincipalBaseType === "GOVERNINGPERSON"
        || BusinessInformation.PrincipalsList[0].PrincipalBaseType ==="GoverningPerson"
        ? 'Governing person': BusinessInformation.PrincipalsList[0].PrincipalBaseType
        : ""
    ))}`,

    authorized_signer_title: `${formatInput(
      BusinessInformation.PrincipalsList[0]
        ? BusinessInformation.PrincipalsList[0].Title
        : ""
    )}`,
    authorized_signer_last_name: `${titleCase(formatInput(
      BusinessInformation.PrincipalsList[0]
        ? BusinessInformation.PrincipalsList[0].LastName
        : ""
    ))}`,
    authorized_signer_first_name: `${titleCase(formatInput(
      BusinessInformation.PrincipalsList[0]
        ? BusinessInformation.PrincipalsList[0].FirstName
        : ""
    ))}`,
    authorized_person_type: `${formatInput(
      BusinessInformation.PrincipalsList[0]
        ? BusinessInformation.PrincipalsList[0].Title !== "GOVERNOR"
          ? "INDIVIDUAL"
          : "GOVERNOR"
        : ""
    )}`,

    business_expiration_date: `${formatInput(
      BusinessInformation.NextARDueDate
    )}`,
    business_formation_date: `${formatInput(BusinessInformation.DateOfIncorporation)}`,
    nature_of_business: `${titleCase(formatNInput(BusinessInformation.BINAICSCodeDesc))}`,
    last_filing_date: `${formatInput(BusinessInformation.LastARFiledDate)}`,
    keywords: `${formatNInput(keywords)}`,
  };
}

export default fetchBusinessInformation;
