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
Object.defineProperty(exports, "__esModule", { value: true });
var { postHttp } = require("./httpService");
var fetchAnnualReportCriteriaEndpoint = "https://cfda.sos.wa.gov/api/Common/GetTransactionDocumentsList";
// is filing number a class? or ID a class
function fetchAnnualReportCriteria(FilingNumber, ID) {
    return __awaiter(this, void 0, void 0, function* () {
        var fetchAnnualReportCriteriaData = {
            FilingNumber,
            ID,
        };
        console.log("Annual report ", fetchAnnualReportCriteriaEndpoint);
        const data = yield postHttp(fetchAnnualReportCriteriaEndpoint, fetchAnnualReportCriteriaData);
        return data;
    });
}
exports.default = fetchAnnualReportCriteria;
//# sourceMappingURL=fetchAnnualReportCriteria.js.map