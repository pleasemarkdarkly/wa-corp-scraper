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
let startTime,
    fetchTableTime, 
    fetchBusinessTime, 
    fetchBillingTime, 
    fetchAnnualTime, 
    averageFT_time,
    averageBT_time,
    averageBL_time,
    averageAL_time,
    totalTimeTaken;
async function fetchTable(businessSearchCriteria) {  
  startTime = Date.now();
  console.log(notice("Fetching search criteria", AdvancedSearchEndpoint));
  const data = await postHttp(AdvancedSearchEndpoint, businessSearchCriteria);

  /*
      Remove limit for full BusinessType export
    */
  let totalCount = 1000;

  let BUSINESS_INFORMATION_REPORT = [];
  let BUSINESS_INFO = [];
  let ALL_CSV = [];

  let BusinessID;
  let TotalRowCount;
  let BusinessInformation;
  let fillingInformation;
  let BusinessTypeID = businessSearchCriteria.BusinessTypeID
  let SearchEntityName = businessSearchCriteria.SearchEntityName

  if (data) {
    fetchTableTime = Date.now();
    averageFT_time = fetchTableTime - startTime;
    for (let i = 0; i < data.length; i++) {
      let firstInfo = data[0];
      TotalRowCount =
        firstInfo.Criteria !== null ? firstInfo.Criteria.TotalRowCount : `NOT AVAILABLE`;
      let businessInfo = data[i];
      BusinessID = data[i].BusinessID;


      BusinessInformation = await fetchBusinessInformation(BusinessID);
      if(BusinessInformation) {
        fetchBusinessTime = Date.now();
        averageBT_time = fetchBusinessTime - startTime;
      };
      fillingInformation = await fetchFillingInformation(BusinessID);
      if(fillingInformation) {
        fetchBillingTime = Date.now();
        averageBL_time = fetchBillingTime - startTime;
      }

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
          fetchAnnualTime = Date.now();
          averageAL_time = fetchAnnualTime - startTime;
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

      BUSINESS_INFORMATION_REPORT.push({
        ...info,
        ...BusinessInformation,
        date_filed: FilingDateTime,
      });

      if (BUSINESS_INFORMATION_REPORT.length === totalCount) {
        console.log(
          warn(`${totalCount} bussinesses processed`)
        );
        totalCount +=1000;

      };
      /*
        TODO: Count number of total PDF reports processed and output update every 1000 businesses if not limited by test number. 
      */
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
        "Business Name":`"#${BusinessInformation.name}"`,
        "UBI": `"${BusinessInformation.ubi}"`,
        "Search Term": `"${SearchEntityName}"`,
        "Business Status": `"${BusinessInformation.status}"`,
        "Nature of Business": `"${BusinessInformation.nature_of_business}"`,
        "Principal Office Email": `"${BusinessInformation.principal_office_email}"`,
        "Principal Office Phone": `"${BusinessInformation.principal_office_phone}"`,
        "Principal Office Street Address (1)": `"${BusinessInformation.principal_office_street_address_1}"`,
        "Principal Office Street Address (2)": `"${BusinessInformation.principal_office_street_address_2}"`,
        "Principal Office City": `"${BusinessInformation.principal_office_city}"`,
        "Principal Office State":  `"${BusinessInformation.principal_office_state}"`,
        "Principal Office Zip": `"${BusinessInformation.principal_office_zip}"`,
        "Principal Office Address Full": `"${BusinessInformation.principal_office_full_address}"`,
        "Principal Office Mailing Street Address (1)": `"${BusinessInformation.principal_office_mailing_street_address_1}"`,
        "Principal Office Mailing Street Address (2)": `"${BusinessInformation.principal_office_mailing_street_address_2}"`,
        "Principal Office Mailing City": `"${BusinessInformation.principal_office_mailing_city}"`,
        "Principal Office Mailing State": `"${BusinessInformation.principal_office_mailing_state}"`,
        "Principal Office Mailing Street Zip": `"${BusinessInformation.principal_office_mailing_zip}"`,
        "Principal Office Mailing Address Full": `"${BusinessInformation.principal_office_mailing_full_address}"`,
        "Business Expiration Date": `"${BusinessInformation.business_expiration_date}"`,
        "Business Formation Date": `"${BusinessInformation.business_formation_date}"`,
        "Governor First name": `"${BusinessInformation.governor_first_name}"`,
        "Governor Last Name": `"${BusinessInformation.governor_last_name}"`,
        "Governor Type": `"${BusinessInformation.governor_type}"`,
        "Registered Agent First Name": `"${BusinessInformation.registered_agent_first_name}"`,
        "Registered Agent Last Name": `"${BusinessInformation.registered_agent_last_name}"`,
        "Registered Agent Mailing Address": `"${BusinessInformation.registered_agent_mailing_address}"`,
        "Registered Agent Email": `"${BusinessInformation.registered_agent_email}"`,
        "Return Address for Filing Attention First Name": `"${BusinessInformation.return_address_for_filing_attention_first_name}"`,
        "Return Address for Filing Attention Last Name": `"${BusinessInformation.return_address_for_filing_attention_last_name}"`,
        "Return Address for Filing Attention Email": `"${BusinessInformation.return_address_for_filing_attention_email}"`,
        "Return Address Filing Mailing Street Address (1)": `"${BusinessInformation.return_address_filing_mailing_street_address_1}"`,
        "Return Address Filing Mailing Street Address (2)": `"${BusinessInformation.return_address_filing_mailing_street_address_2}"`,
        "Return Address Filing Mailing City": `"${BusinessInformation.return_address_filing_mailing_city}"`,
        "Return Address Filing Mailing State": `"${BusinessInformation.return_address_filing_mailing_state}"`,
        "Return Address Filing Mailing Zip": `"${BusinessInformation.return_address_filing_mailing_zip}"`,
        "Authorized Person Signer Title": `"${BusinessInformation.authorized_signer_title}"`,
        "Authorized Person Signer First Name":  `"${BusinessInformation.authorized_signer_first_name}"`,
        "Authorized Person Signer Last Name": `"${BusinessInformation.authorized_signer_last_name}"`,
        "Authorized Person Type": `"${BusinessInformation.authorized_person_type}"`,
        "Last Filing Date": `"${BusinessInformation.last_filing_date}"`,
        "Business Keywords": `"${BusinessInformation.keywords}"`,

      });
       BusinessType = businessInfo.BusinessType;

    }


    totalTimeTaken = averageAL_time + averageBL_time + averageFT_time + averageBT_time;
    const CSV = convertToCSV(BUSINESS_INFO, BusinessTypeID);
    return {
      BUSINESSTYPE: BusinessType,
      TOTAL_BUSINESS_PARSED: BUSINESS_INFORMATION_REPORT.length,
      TIME_TO_FETCH_BUSINESS_TABLES: `${averageFT_time}ms`,
      TIME_TO_FETCH_ANNUAL_REPORT: `${averageAL_time}ms`,
      TIME_TO_FETCH_FILLING_REPORT: `${averageBL_time}ms`,
      TIME_TO_FETCH_BUSINESS_INFORMATION: `${averageBT_time}ms`,
      TOTAL_AVAILABLE_BUSINESS: TotalRowCount,
      TOTAL_TIME_TAKEN: `${totalTimeTaken}ms`,
      BUSINESS_INFORMATION_REPORT,
    };
  }
}

module.exports = fetchTable;
