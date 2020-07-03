var { postHttp } = require("./httpService");
var clc = require("cli-color");
sw = require("stopword");

var info = clc.white.bold;
var error = clc.red.bold;
var warn = clc.yellow;
var notice = clc.blue;

var fetchFillingInformation = require("./fetchFilingInformation");
var fetchAnnualReportCriteria = require("./fetchAnnualReportCriteria");
var fetchAnnualReport = require("./fetchAnnualReport");
var fetchBusinessInformation = require("./fetchBusinessInformation");
var convertToCSV = require("./helpers/convertCSV");

var AdvancedSearchEndpoint =
  "https://cfda.sos.wa.gov/api/BusinessSearch/GetAdvanceBusinessSearchList";

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

function removeFromString(arr,str){
  let regex = new RegExp("\\b"+arr.join('|')+"\\b","gi")
  return str.replace(regex, '')
}

async function fetchTable(businessSearchCriteria) {
  // console.time("Time-taken");
  console.log(notice("Fetching search criteria", AdvancedSearchEndpoint));
  const data = await postHttp(AdvancedSearchEndpoint, businessSearchCriteria);

  /*
      Remove limit for full BusinessType export
    */
  const totalCount = 200;

  let BUSINESS_SEARCH = [];
  let BUSINESS_INFO = [];
  let ALL_CSV = [];

  let BusinessType;
  let BusinessID;
  let TotalRowCount;
  let BusinessInformation;
  let fillingInformation;

  if (data) {
    for (let i = 0; i < data.length; i++) {
      let firstInfo = data[0];
      TotalRowCount =
        firstInfo.Criteria !== null ? firstInfo.Criteria.TotalRowCount : null;
      let businessInfo = data[i];
      BusinessID = data[i].BusinessID;

      BusinessInformation = await fetchBusinessInformation(BusinessID);
      fillingInformation = await fetchFillingInformation(BusinessID);

      let FilingNumber,
        ID,
        annualReport,
        annualReportCriteria = [],
        FilingDateTime,
        annualDueNotice;
      for (let i = 0; i < fillingInformation.length; i++) {
        if (
          fillingInformation[i].FilingTypeName === "ANNUAL REPORT" ||
          fillingInformation[i].FilingTypeName === "INITIAL REPORT"
        ) {
          annualReport = fillingInformation[0];
          FilingNumber = annualReport.FilingNumber;
          ID = annualReport.Transactionid;
          FilingDateTime = annualReport.FilingDateTime;
          annualReportCriteria = await fetchAnnualReportCriteria(
            FilingNumber,
            ID
          );
          break;
        }
        console.log(
          warn("Neither Annual or Initial Report detected for " + BusinessID)
        );
      }
      for (let i = 0; i < annualReportCriteria.length; i++) {
        if (annualReportCriteria[i].DocumentTypeID === 4) {
          annualDueNotice = annualReportCriteria[0];
          //  console.log(annualDueNotice, "Annual Report criteria");
          // TODO: handle parsing and errors
          //  await fetchAnnualReport(annualDueNotice);
          break;
        } else {
          console.log(
            warn(
              "No Annual or Initial Report Found to download for " + BusinessID
            )
          );
        }
      }

      const info = {
        UBINumber: businessInfo.UBINumber,
        BusinessName: businessInfo.BusinessName,
        BusinessType: businessInfo.BusinessType,
        AgentName: businessInfo.AgentName,
        FullAddress:
          businessInfo.PrincipalOffice.PrincipalStreetAddress.FullAddress,
        CorrespondenceEmailAddress: businessInfo.CorrespondenceEmailAddress,
      };

      BUSINESS_SEARCH.push({
        ...info,
        ...BusinessInformation,
        date_filed: FilingDateTime,
      });

      if (BUSINESS_SEARCH.length === totalCount) break;
      /*
        TODO: Count number of total PDF reports processed and output update every 1000 businesses if not limited by test number. 
      */

      BusinessType = businessInfo.BusinessType;
      const keyword = `${BusinessInformation.name} ${BusinessInformation.nature_of_business}`;
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

      let keywords = `${newKeyword}`.toString().replace(/[~`!@#$%^*(){}\[\];:"'<,.>?\/\\|_+=-]/g, " ").toLowerCase().trim();
      keywords = removeFromString(special_extraction_words,keywords);
      keywords = keywords.replace(/(^\s*)|(\s*$)/gi,"");
      keywords = keywords.replace(/[ ]{2,}/gi," ");
      // any single character remove
      keywords = keywords.replace(/\n/,"");

      console.log(
        warn(BusinessInformation.name + "(" + BusinessInformation.ubi + ") " + "keywords: " + keywords)
      );

      BUSINESS_INFO.push({
        business_name_ubi: `"${BusinessInformation.name}" "${BusinessInformation.ubi}"`,
        business_purpose: `"${BusinessInformation.nature_of_business}"`,
        governor_first_last_name: `"${BusinessInformation.signer_first_name}" "${BusinessInformation.signer_last_name}"`,
        governor_phone: `"${BusinessInformation.principal_office_phone}"`,
        entity_email: `"${BusinessInformation.principal_office_email}"`,
        registered_agent_first_last_name: `"${BusinessInformation.registered_agent_name}"`,
        email: `"${BusinessInformation.registered_agent_mail}"`,
        /*
          TODO: strip newlines from keywords
          */
        keyword: `"${keywords}"`,
      });
    }
    const CSV = convertToCSV(BUSINESS_INFO, BusinessID);
    return {
      BUSINESSTYPE: BusinessType,
      TOTAL: BUSINESS_SEARCH.length,
      BUSINESS_SEARCH,
      // do not remove the total count
      TotalRowCount,
    };
  }
}

module.exports = fetchTable;
