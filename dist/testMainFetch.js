"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CWA_PUBLIC_BENEFIT_CORPORATION = exports.CWA_NONPROFIT_CORPORATION = exports.CWA_PROFIT_CORPORATION = exports.CWA_PROFESSIONAL_SERVICE_CORPORATION = exports.CWA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP = exports.CWA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY = exports.CWA_LIMITED_PARTNERSHIP = exports.CWA_LIMITED_LIABILITY_PARTNERSHIP = exports.CWA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP = exports.CWA_LIMITED_LIABILITY_CORPORATION = void 0;
const businessSearchcriteria_1 = __importDefault(require("./businessSearchcriteria"));
const CorporationBasicRawStreams_1 = __importDefault(require("./CorporationBasicRawStreams"));
require("dotenv").config();
const _RECORDS = 100;
const BusinessType = {
    WA_LIMITED_LIABILITY_CORPORATION: 65,
    WA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP: 67,
    WA_LIMITED_LIABILITY_PARTNERSHIP: 68,
    WA_LIMITED_PARTNERSHIP: 69,
    WA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY: 79,
    WA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP: 76,
    WA_PROFESSIONAL_SERVICE_CORPORATION: 85,
    WA_PROFIT_CORPORATION: 86,
    WA_NONPROFIT_CORPORATION: 73,
    WA_PUBLIC_BENEFIT_CORPORATION: 87,
};
exports.CWA_LIMITED_LIABILITY_CORPORATION = new CorporationBasicRawStreams_1.default(_RECORDS, 1, BusinessType.WA_LIMITED_LIABILITY_CORPORATION, businessSearchcriteria_1.default);
exports.CWA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP = new CorporationBasicRawStreams_1.default(_RECORDS, 1, BusinessType.WA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP, businessSearchcriteria_1.default);
exports.CWA_LIMITED_LIABILITY_PARTNERSHIP = new CorporationBasicRawStreams_1.default(_RECORDS, 1, BusinessType.WA_LIMITED_LIABILITY_PARTNERSHIP, businessSearchcriteria_1.default);
exports.CWA_LIMITED_PARTNERSHIP = new CorporationBasicRawStreams_1.default(_RECORDS, 1, BusinessType.WA_LIMITED_PARTNERSHIP, businessSearchcriteria_1.default);
exports.CWA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY = new CorporationBasicRawStreams_1.default(_RECORDS, 1, BusinessType.WA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY, businessSearchcriteria_1.default);
exports.CWA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP = new CorporationBasicRawStreams_1.default(_RECORDS, 1, BusinessType.WA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP, businessSearchcriteria_1.default);
exports.CWA_PROFESSIONAL_SERVICE_CORPORATION = new CorporationBasicRawStreams_1.default(_RECORDS, 1, BusinessType.WA_PROFESSIONAL_SERVICE_CORPORATION, businessSearchcriteria_1.default);
exports.CWA_PROFIT_CORPORATION = new CorporationBasicRawStreams_1.default(_RECORDS, 1, BusinessType.WA_PROFIT_CORPORATION, businessSearchcriteria_1.default);
exports.CWA_NONPROFIT_CORPORATION = new CorporationBasicRawStreams_1.default(_RECORDS, 1, BusinessType.WA_NONPROFIT_CORPORATION, businessSearchcriteria_1.default);
exports.CWA_PUBLIC_BENEFIT_CORPORATION = new CorporationBasicRawStreams_1.default(_RECORDS, 1, BusinessType.WA_PUBLIC_BENEFIT_CORPORATION, businessSearchcriteria_1.default);
//# sourceMappingURL=testMainFetch.js.map