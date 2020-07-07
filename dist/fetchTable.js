"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpService_1 = require("./httpService");
const cli_color_1 = __importDefault(require("cli-color"));
const stopword_1 = __importDefault(require("stopword"));
const winston_1 = __importDefault(require("./config/winston"));
const info = cli_color_1.default.white.bold;
const error = cli_color_1.default.red.bold;
const warn = cli_color_1.default.yellow;
const notice = cli_color_1.default.blue;
const fetchFilingInformation_1 = __importDefault(require("./fetchFilingInformation"));
const fetchAnnualReportCriteria_1 = __importDefault(require("./fetchAnnualReportCriteria"));
const fetchBusinessInformation_1 = __importDefault(require("./fetchBusinessInformation"));
const convertCSV_1 = __importDefault(require("./helpers/convertCSV"));
const keywords_1 = __importDefault(require("./keywords"));
var AdvancedSearchEndpoint = "https://cfda.sos.wa.gov/api/BusinessSearch/GetAdvanceBusinessSearchList";
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
function removeFromString(arr, str) {
    let regex = new RegExp("\\b" + arr.join('|') + "\\b", "gi");
    return str.replace(regex, '');
}
let startTime, fetchTableTime, fetchBusinessTime, fetchBillingTime, fetchAnnualTime, BusinessType, averageFT_time, averageBT_time, averageBL_time, averageAL_time, totalTimeTaken;
function fetchTable(businessSearchCriteria) {
    return __awaiter(this, void 0, void 0, function* () {
        startTime = Date.now();
        winston_1.default.log({
            level: 'info',
            message: `Fetching search criteria ${AdvancedSearchEndpoint}`
        });
        let totalCount = 1000;
        let BUSINESS_INFORMATION_REPORT = [];
        let BUSINESS_INFO = [];
        let ALL_CSV = [];
        let businessId;
        let totalRowCount;
        let businessInformation;
        let fillingInformation;
        let businessTypeID = businessSearchCriteria.BusinessTypeID;
        let searchEntityName;
        for (let i = 0; i < keywords_1.default.length; i++) {
            searchEntityName = keywords_1.default[i];
            businessSearchCriteria.SearchEntityName = searchEntityName;
            businessSearchCriteria.SearchType = `${this.searchEntityName === "" ? "" : `Contains`}`;
            // START SCRAPPING
            const data = yield httpService_1.postHttp(AdvancedSearchEndpoint, businessSearchCriteria);
            if (data) {
                fetchTableTime = Date.now();
                averageFT_time = fetchTableTime - startTime;
                for (let i = 0; i < data.length; i++) {
                    let firstInfo = data[0];
                    totalRowCount =
                        firstInfo.Criteria !== null ? firstInfo.Criteria.TotalRowCount : `NOT AVAILABLE`;
                    let businessInfo = data[i];
                    businessId = data[i].BusinessID;
                    businessInformation = yield fetchBusinessInformation_1.default(businessId);
                    if (businessInformation) {
                        fetchBusinessTime = Date.now();
                        averageBT_time = fetchBusinessTime - startTime;
                    }
                    ;
                    fillingInformation = yield fetchFilingInformation_1.default(businessId);
                    if (fillingInformation) {
                        fetchBillingTime = Date.now();
                        averageBL_time = fetchBillingTime - startTime;
                    }
                    let FilingNumber, ID, annualReport, annualReportCriteria = [], FilingDateTime, annualDueNotice;
                    for (let i = 0; i < fillingInformation.length; i++) {
                        if (fillingInformation[i].FilingTypeName === "ANNUAL REPORT" ||
                            fillingInformation[i].FilingTypeName === "INITIAL REPORT") {
                            annualReport = fillingInformation[0];
                            FilingNumber = annualReport.FilingNumber;
                            ID = annualReport.TransactionId;
                            FilingDateTime = annualReport.FilingDateTime;
                            annualReportCriteria = yield fetchAnnualReportCriteria_1.default(FilingNumber, ID);
                            break;
                        }
                        winston_1.default.log({
                            level: 'info',
                            message: `Neither Annual or Initial Report detected for ${businessId}`
                        });
                    }
                    for (let i = 0; i < annualReportCriteria.length; i++) {
                        if (annualReportCriteria[i].DocumentTypeID === 4) {
                            annualDueNotice = annualReportCriteria[0];
                            fetchAnnualTime = Date.now();
                            averageAL_time = fetchAnnualTime - startTime;
                            //  logger.log(annualDueNotice, "Annual Report criteria");
                            // TODO: handle parsing and errors
                            //  await fetchAnnualReport(annualDueNotice);
                            break;
                        }
                        else {
                            winston_1.default.log({
                                level: 'info',
                                message: "No Annual or Initial Report Found to download for " + businessId
                            });
                        }
                    }
                    const info = {
                        UBINumber: businessInfo.UBINumber,
                        BusinessName: businessInfo.BusinessName,
                        BusinessType: businessInfo.BusinessType,
                        AgentName: businessInfo.AgentName,
                        FullAddress: businessInfo.PrincipalOffice.PrincipalStreetAddress.FullAddress,
                        CorrespondenceEmailAddress: businessInfo.CorrespondenceEmailAddress,
                    };
                    BUSINESS_INFORMATION_REPORT.push(Object.assign(Object.assign(Object.assign({}, info), businessInformation), { date_filed: FilingDateTime }));
                    if (BUSINESS_INFORMATION_REPORT.length === totalCount) {
                        winston_1.default.log({
                            level: 'info',
                            message: `${totalCount} bussinesses processed`
                        });
                        totalCount += 1000;
                    }
                    ;
                    /*
                      TODO: Count number of total PDF reports processed and output update every 1000 businesses if not limited by test number.
                    */
                    const keyword = `${businessInformation.name} ${businessInformation.nature_of_business}`;
                    const oldKeyword = keyword.split(" ");
                    const newKeyword = stopword_1.default.removeStopwords(oldKeyword);
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
                    keywords = removeFromString(special_extraction_words, keywords);
                    keywords = keywords.replace(/(^\s*)|(\s*$)/gi, "");
                    keywords = keywords.replace(/[ ]{2,}/gi, " ");
                    // any single character remove
                    keywords = keywords.replace(/\n/, "");
                    winston_1.default.log({
                        level: 'info',
                        message: businessInformation.name + "(" + businessInformation.ubi + ") " + "keywords: " + keywords
                    });
                    BUSINESS_INFO.push({
                        "Business Name": `"${businessInformation.name}"`,
                        "UBI": `"${businessInformation.ubi}"`,
                        "Search Term": `"${searchEntityName}"`,
                        "Business Status": `"${businessInformation.status}"`,
                        "Nature of Business": `"${businessInformation.nature_of_business}"`,
                        "Principal Office Email": `"${businessInformation.principal_office_email}"`,
                        "Principal Office Phone": `"${businessInformation.principal_office_phone}"`,
                        "Principal Office Street Address (1)": `"${businessInformation.principal_office_street_address_1}"`,
                        "Principal Office Street Address (2)": `"${businessInformation.principal_office_street_address_2}"`,
                        "Principal Office City": `"${businessInformation.principal_office_city}"`,
                        "Principal Office State": `"${businessInformation.principal_office_state}"`,
                        "Principal Office Zip": `"${businessInformation.principal_office_zip}"`,
                        "Principal Office Address Full": `"${businessInformation.principal_office_full_address}"`,
                        "Principal Office Mailing Street Address (1)": `"${businessInformation.principal_office_mailing_street_address_1}"`,
                        "Principal Office Mailing Street Address (2)": `"${businessInformation.principal_office_mailing_street_address_2}"`,
                        "Principal Office Mailing City": `"${businessInformation.principal_office_mailing_city}"`,
                        "Principal Office Mailing State": `"${businessInformation.principal_office_mailing_state}"`,
                        "Principal Office Mailing Street Zip": `"${businessInformation.principal_office_mailing_zip}"`,
                        "Principal Office Mailing Address Full": `"${businessInformation.principal_office_mailing_full_address}"`,
                        "Business Expiration Date": `"${businessInformation.business_expiration_date}"`,
                        "Business Formation Date": `"${businessInformation.business_formation_date}"`,
                        "Governor First name": `"${businessInformation.governor_first_name}"`,
                        "Governor Last Name": `"${businessInformation.governor_last_name}"`,
                        "Governor Type": `"${businessInformation.governor_type}"`,
                        "Registered Agent First Name": `"${businessInformation.registered_agent_first_name}"`,
                        "Registered Agent Last Name": `"${businessInformation.registered_agent_last_name}"`,
                        "Registered Agent Mailing Address": `"${businessInformation.registered_agent_mailing_address}"`,
                        "Registered Agent Email": `"${businessInformation.registered_agent_email}"`,
                        "Return Address for Filing Attention First Name": `"${businessInformation.return_address_for_filing_attention_first_name}"`,
                        "Return Address for Filing Attention Last Name": `"${businessInformation.return_address_for_filing_attention_last_name}"`,
                        "Return Address for Filing Attention Email": `"${businessInformation.return_address_for_filing_attention_email}"`,
                        "Return Address Filing Mailing Street Address (1)": `"${businessInformation.return_address_filing_mailing_street_address_1}"`,
                        "Return Address Filing Mailing Street Address (2)": `"${businessInformation.return_address_filing_mailing_street_address_2}"`,
                        "Return Address Filing Mailing City": `"${businessInformation.return_address_filing_mailing_city}"`,
                        "Return Address Filing Mailing State": `"${businessInformation.return_address_filing_mailing_state}"`,
                        "Return Address Filing Mailing Zip": `"${businessInformation.return_address_filing_mailing_zip}"`,
                        "Authorized Person Signer Title": `"${businessInformation.authorized_signer_title}"`,
                        "Authorized Person Signer First Name": `"${businessInformation.authorized_signer_first_name}"`,
                        "Authorized Person Signer Last Name": `"${businessInformation.authorized_signer_last_name}"`,
                        "Authorized Person Type": `"${businessInformation.authorized_person_type}"`,
                        "Last Filing Date": `"${businessInformation.last_filing_date}"`,
                        "Business Keywords": `"${businessInformation.keywords}"`,
                    });
                    BusinessType = businessInfo.BusinessType;
                }
            }
            totalTimeTaken = averageAL_time + averageBL_time + averageFT_time + averageBT_time;
            const CSV = convertCSV_1.default(BUSINESS_INFO, businessTypeID, searchEntityName);
            BUSINESS_INFO = [];
        }
        return {
            BUSINESSTYPE: BusinessType,
            TOTAL_BUSINESS_PARSED: BUSINESS_INFORMATION_REPORT.length,
            TIME_TO_FETCH_BUSINESS_TABLES: `${averageFT_time}ms`,
            TIME_TO_FETCH_ANNUAL_REPORT: `${averageAL_time}ms`,
            TIME_TO_FETCH_FILLING_REPORT: `${averageBL_time}ms`,
            TIME_TO_FETCH_BUSINESS_INFORMATION: `${averageBT_time}ms`,
            TOTAL_AVAILABLE_BUSINESS: totalRowCount,
            TOTAL_TIME_TAKEN: `${totalTimeTaken}ms`,
            BUSINESS_INFORMATION_REPORT,
        };
    });
}
exports.default = fetchTable;
//# sourceMappingURL=fetchTable.js.map