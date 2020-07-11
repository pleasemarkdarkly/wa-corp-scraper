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
const stopword_1 = __importDefault(require("stopword"));
const winston_1 = __importDefault(require("./common/winston"));
function removeFromString(arr, str) {
    let regex = new RegExp("\\b" + arr.join("|") + "\\b", "gi");
    return str.replace(regex, "");
}
function toSentenceCase(theString) {
    var newString = theString
        .toLowerCase()
        .replace(/(^\s*\w|[\.\!\?]\s*\w)/g, function (c) {
        return c.toUpperCase();
    });
    return newString;
}
function formatInput(str) {
    if (str === undefined || str === null || typeof str !== "string")
        return " ";
    let str2 = str.replace(/[^\w\s]/gi, '').trim();
    return str2;
}
function fetchBusinessInformation(businessId) {
    return __awaiter(this, void 0, void 0, function* () {
        var BusinessInfoEndpoint = `https://cfda.sos.wa.gov/api/BusinessSearch/BusinessInformation?businessID=${businessId}`;
        const BusinessInformation = yield httpService_1.getHttp(BusinessInfoEndpoint);
        // TODO: Business Name sometimes has extra characters, apply trim() at the appropriate stage
        winston_1.default.log({
            level: 'info',
            message: BusinessInformation.BusinessName +
                " (" +
                BusinessInformation.UBINumber +
                "): " +
                BusinessInfoEndpoint
        });
        const keyword = `${BusinessInformation.BusinessName} ${BusinessInformation.BINAICSCodeDesc}`;
        const oldKeyword = keyword.split(" ");
        const newKeyword = stopword_1.default.removeStopwords(oldKeyword);
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
        winston_1.default.log({
            level: 'debug',
            message: `keywords: ${keywords}`
        });
        return {
            name: `${formatInput(BusinessInformation.BusinessName)}`.trim(),
            type: `${formatInput(BusinessInformation.BusinessType)}`,
            status: `${formatInput(BusinessInformation.BusinessStatus)}`,
            ubi: `${formatInput(BusinessInformation.UBINumber)}`,
            registered_agent_name: `${formatInput(BusinessInformation.Agent.FullName)}`,
            registered_agent_mailing_address: `${formatInput(BusinessInformation.Agent.MailingAddress.FullAddress)}`,
            registered_agent_email: `${formatInput(BusinessInformation.Agent.EmailAddress)}`,
            registered_agent_first_name: `${formatInput(BusinessInformation.Agent.FirstName)}`,
            registered_agent_last_name: `${formatInput(BusinessInformation.Agent.LastName)}`,
            principal_office_email: `${formatInput(BusinessInformation.PrincipalOffice.EmailAddress)}`,
            principal_office_street_address_1: `${formatInput(BusinessInformation.PrincipalOffice.PrincipalStreetAddress.StreetAddress1)}`,
            principal_office_street_address_2: `${formatInput(BusinessInformation.PrincipalOffice.PrincipalStreetAddress.StreetAddress2)}`,
            principal_office_city: `${formatInput(BusinessInformation.PrincipalOffice.PrincipalStreetAddress.City)}`,
            principal_office_state: `${formatInput(BusinessInformation.PrincipalOffice.PrincipalStreetAddress.Zip5)} - ${formatInput(BusinessInformation.PrincipalOffice.PrincipalStreetAddress.Zip4)}`,
            principal_office_zip: `${formatInput(BusinessInformation.PrincipalOffice.PrincipalStreetAddress.City)}`,
            principal_office_full_address: `${formatInput(BusinessInformation.PrincipalOffice.PrincipalStreetAddress.FullAddress)}`,
            principal_office_mailing_street_address_1: `${formatInput(BusinessInformation.PrincipalOffice.PrincipalMailingAddress.StreetAddress1)}`,
            principal_office_mailing_street_address_2: `${formatInput(BusinessInformation.PrincipalOffice.PrincipalMailingAddress.StreetAddress2)}`,
            principal_office_mailing_city: `${formatInput(BusinessInformation.PrincipalOffice.PrincipalMailingAddress.City)}`,
            principal_office_mailing_state: `${BusinessInformation.PrincipalOffice.PrincipalMailingAddress.Zip5} - ${BusinessInformation.PrincipalOffice.PrincipalMailingAddress.Zip4}`,
            principal_office_mailing_zip: `${formatInput(BusinessInformation.PrincipalOffice.PrincipalMailingAddress.City)}`,
            principal_office_mailing_full_address: `${formatInput(BusinessInformation.PrincipalOffice.PrincipalMailingAddress.FullAddress)}`,
            principal_office_phone: `${formatInput(BusinessInformation.PrincipalOffice.PhoneNumber)}`,
            return_address_for_filing_attention_first_name: `${formatInput(BusinessInformation.PrincipalsList[0]
                ? BusinessInformation.PrincipalsList[0].Title !== "GOVERNOR"
                    ? BusinessInformation.PrincipalsList[0].FirstName
                    : ""
                : "")}`,
            return_address_for_filing_attention_last_name: `${formatInput(BusinessInformation.PrincipalsList[0]
                ? BusinessInformation.PrincipalsList[0].Title !== "GOVERNOR"
                    ? BusinessInformation.PrincipalsList[0].LastName
                    : ""
                : "")}`,
            return_address_for_filing_attention_email: `${formatInput(BusinessInformation.PrincipalsList[0]
                ? BusinessInformation.PrincipalsList[0].Title !== "GOVERNOR"
                    ? BusinessInformation.BusinessInfoPrincipalOffice.EmailAddress
                    : ""
                : "")}`,
            return_address_filing_mailing_street_address_1: `${formatInput(BusinessInformation.MeetingPlace.StreetAddress1)}`,
            return_address_filing_mailing_street_address_2: `${formatInput(BusinessInformation.MeetingPlace.StreetAddress2)}`,
            return_address_filing_mailing_city: `${formatInput(BusinessInformation.MeetingPlace.City)}`,
            return_address_filing_mailing_state: `${formatInput(BusinessInformation.MeetingPlace.State)}`,
            return_address_filing_mailing_zip: `${formatInput(BusinessInformation.MeetingPlace.Zip5)}-${formatInput(BusinessInformation.MeetingPlace.Zip4)}`,
            governor_first_name: `${formatInput(!BusinessInformation.PrincipalsList[0]
                ? ""
                : BusinessInformation.PrincipalsList[0].FirstName)}`,
            governor_last_name: `${formatInput(BusinessInformation.PrincipalsList[0]
                ? BusinessInformation.PrincipalsList[0].LastName
                : "")}`,
            governor_type: `${formatInput(BusinessInformation.PrincipalsList[0]
                ? BusinessInformation.PrincipalsList[0].PrincipalBaseType
                : "")}`,
            authorized_signer_title: `${formatInput(BusinessInformation.PrincipalsList[0]
                ? BusinessInformation.PrincipalsList[0].Title
                : "")}`,
            authorized_signer_last_name: `${formatInput(BusinessInformation.PrincipalsList[0]
                ? BusinessInformation.PrincipalsList[0].LastName
                : "")}`,
            authorized_signer_first_name: `${formatInput(BusinessInformation.PrincipalsList[0]
                ? BusinessInformation.PrincipalsList[0].FirstName
                : "")}`,
            authorized_person_type: `${formatInput(BusinessInformation.PrincipalsList[0]
                ? BusinessInformation.PrincipalsList[0].Title !== "GOVERNOR"
                    ? "INDIVIDUAL"
                    : "GOVERNOR"
                : "")}`,
            business_expiration_date: `${formatInput(BusinessInformation.NextARDueDate)}`,
            business_formation_date: `${toSentenceCase(formatInput(BusinessInformation.DateOfIncorporation))}`,
            nature_of_business: `${formatInput(BusinessInformation.BINAICSCodeDesc)}`,
            last_filing_date: `${formatInput(BusinessInformation.LastARFiledDate)}`,
            keywords: `${formatInput(keywords)}`,
        };
    });
}
exports.default = fetchBusinessInformation;
//# sourceMappingURL=fetchBusinessInformation.js.map