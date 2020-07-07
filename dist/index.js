"use strict";
/** @format */
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
const cli_color_1 = __importDefault(require("cli-color"));
const businessSearchcriteria_1 = __importDefault(require("./businessSearchcriteria"));
const CorporationBasicRawStreams_1 = __importDefault(require("./CorporationBasicRawStreams"));
const winston_1 = __importDefault(require("./common/winston"));
const delay_1 = __importDefault(require("delay"));
const { default: PQueue } = require("p-queue");
require("dotenv").config();
var info = cli_color_1.default.white.bold;
var error = cli_color_1.default.red.bold;
var warn = cli_color_1.default.yellow;
var notice = cli_color_1.default.blue;
const ALL_RECORDS = -1;
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
/*
    WA_LIMITED_LIABILITY_CORPORATION: total 32,000

    (1)       Universal Business Identifier (UBI) | Business Name | Business Type | Date Filed
              Principal Office Phone | Principal Office Email | Governor First Name | Governor Last Name
              Nature of Business | Initial Report Received Date
    ...

    (32000)   Universal Business Identifier (UBI) | Business Name | Business Type | Date Filed
              Principal Office Phone | Principal Office Email | Governor First Name | Governor Last Name
              Nature of Business | Initial Report Received Date

    BusinessType.WA_LIMITED_LIABILITY_CORPORATION: time to scrape (200ms/12m) per entity/total (red/yellow)

    Summary:
    Business Type: Scanned 32000 out of 32000, taking 200ms per entity. 50211 total PDF scanned.
    Total entities 1,020,092 scanned taking 6h:01m:12 an average of .200ms per.
*/
// TODO: Move to test module
const CWA_LIMITED_LIABILITY_CORPORATION = new CorporationBasicRawStreams_1.default(_RECORDS, 1, BusinessType.WA_LIMITED_LIABILITY_CORPORATION, businessSearchcriteria_1.default);
const CWA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP = new CorporationBasicRawStreams_1.default(_RECORDS, 1, BusinessType.WA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP, businessSearchcriteria_1.default);
const CWA_LIMITED_LIABILITY_PARTNERSHIP = new CorporationBasicRawStreams_1.default(_RECORDS, 1, BusinessType.WA_LIMITED_LIABILITY_PARTNERSHIP, businessSearchcriteria_1.default);
const CWA_LIMITED_PARTNERSHIP = new CorporationBasicRawStreams_1.default(_RECORDS, 1, BusinessType.WA_LIMITED_PARTNERSHIP, businessSearchcriteria_1.default);
const CWA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY = new CorporationBasicRawStreams_1.default(_RECORDS, 1, BusinessType.WA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY, businessSearchcriteria_1.default);
const CWA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP = new CorporationBasicRawStreams_1.default(_RECORDS, 1, BusinessType.WA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP, businessSearchcriteria_1.default);
const CWA_PROFESSIONAL_SERVICE_CORPORATION = new CorporationBasicRawStreams_1.default(_RECORDS, 1, BusinessType.WA_PROFESSIONAL_SERVICE_CORPORATION, businessSearchcriteria_1.default);
const CWA_PROFIT_CORPORATION = new CorporationBasicRawStreams_1.default(_RECORDS, 1, BusinessType.WA_PROFIT_CORPORATION, businessSearchcriteria_1.default);
const CWA_NONPROFIT_CORPORATION = new CorporationBasicRawStreams_1.default(_RECORDS, 1, BusinessType.WA_NONPROFIT_CORPORATION, businessSearchcriteria_1.default);
const CWA_PUBLIC_BENEFIT_CORPORATION = new CorporationBasicRawStreams_1.default(_RECORDS, 1, BusinessType.WA_PUBLIC_BENEFIT_CORPORATION, businessSearchcriteria_1.default);
// TODO: Move to its own module
const CWA_LIMITED_LIABILITY_CORPORATION_ALL = new CorporationBasicRawStreams_1.default(ALL_RECORDS, 1, BusinessType.WA_LIMITED_LIABILITY_CORPORATION, businessSearchcriteria_1.default);
const CWA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP_ALL = new CorporationBasicRawStreams_1.default(ALL_RECORDS, 1, BusinessType.WA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP, businessSearchcriteria_1.default);
const CWA_LIMITED_LIABILITY_PARTNERSHIP_ALL = new CorporationBasicRawStreams_1.default(ALL_RECORDS, 1, BusinessType.WA_LIMITED_LIABILITY_PARTNERSHIP, businessSearchcriteria_1.default);
const CWA_LIMITED_PARTNERSHIP_ALL = new CorporationBasicRawStreams_1.default(ALL_RECORDS, 1, BusinessType.WA_LIMITED_PARTNERSHIP, businessSearchcriteria_1.default);
const CWA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY_ALL = new CorporationBasicRawStreams_1.default(ALL_RECORDS, 1, BusinessType.WA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY, businessSearchcriteria_1.default);
const CWA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP_ALL = new CorporationBasicRawStreams_1.default(ALL_RECORDS, 1, BusinessType.WA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP, businessSearchcriteria_1.default);
const CWA_PROFESSIONAL_SERVICE_CORPORATION_ALL = new CorporationBasicRawStreams_1.default(ALL_RECORDS, 1, BusinessType.WA_PROFESSIONAL_SERVICE_CORPORATION, businessSearchcriteria_1.default);
const CWA_PROFIT_CORPORATION_ALL = new CorporationBasicRawStreams_1.default(ALL_RECORDS, 1, BusinessType.WA_PROFIT_CORPORATION, businessSearchcriteria_1.default);
const CWA_PUBLIC_BENEFIT_CORPORATION_ALL = new CorporationBasicRawStreams_1.default(ALL_RECORDS, 1, BusinessType.WA_PUBLIC_BENEFIT_CORPORATION, businessSearchcriteria_1.default);
const CWA_NONPROFIT_CORPORATION_ALL = new CorporationBasicRawStreams_1.default(ALL_RECORDS, 1, BusinessType.WA_NONPROFIT_CORPORATION, businessSearchcriteria_1.default);
// TODO: move to its own test module
function test_main() {
    const queue = new PQueue({ concurrency: 1 });
    (() => __awaiter(this, void 0, void 0, function* () {
        yield delay_1.default(200);
        const firstTask = yield CWA_LIMITED_LIABILITY_CORPORATION._read();
        yield queue.add(firstTask);
        winston_1.default.log({
            level: "info",
            message: "COMPLETED: CWA_LIMITED_LIABILITY_CORPORATION",
        });
    }))();
    (() => __awaiter(this, void 0, void 0, function* () {
        yield delay_1.default(200);
        const secondTask = yield CWA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP._read();
        yield queue.add(secondTask);
        winston_1.default.log({
            level: "info",
            message: "Done: CWA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP",
        });
    }))();
    (() => __awaiter(this, void 0, void 0, function* () {
        yield delay_1.default(200);
        const thirdTask = yield CWA_LIMITED_LIABILITY_PARTNERSHIP._read();
        yield queue.add(thirdTask);
        winston_1.default.log({
            level: "info",
            message: "Done: CWA_LIMITED_LIABILITY_PARTNERSHIP",
        });
    }))();
    (() => __awaiter(this, void 0, void 0, function* () {
        yield delay_1.default(200);
        const fourthTask = yield CWA_LIMITED_PARTNERSHIP._read();
        yield queue.add(fourthTask);
        winston_1.default.log({
            level: "info",
            message: "Done: CWA_LIMITED_PARTNERSHIP",
        });
    }))();
    (() => __awaiter(this, void 0, void 0, function* () {
        yield delay_1.default(200);
        const fifthTask = yield CWA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY._read();
        yield queue.add(fifthTask);
        winston_1.default.log({
            level: "info",
            message: "Done: CWA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY",
        });
    }))();
    (() => __awaiter(this, void 0, void 0, function* () {
        yield delay_1.default(200);
        const sixthTask = yield CWA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP._read();
        yield queue.add(sixthTask);
        winston_1.default.log({
            level: "info",
            message: "Done: CWA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP",
        });
    }))();
    (() => __awaiter(this, void 0, void 0, function* () {
        yield delay_1.default(200);
        const seventhTask = yield CWA_PROFESSIONAL_SERVICE_CORPORATION._read();
        yield queue.add(seventhTask);
        winston_1.default.log({
            level: "info",
            message: "Done: CWA_PROFESSIONAL_SERVICE_CORPORATION",
        });
    }))();
    (() => __awaiter(this, void 0, void 0, function* () {
        yield delay_1.default(200);
        const eighhtTask = yield CWA_PROFIT_CORPORATION._read();
        yield queue.add(eighhtTask);
        winston_1.default.log({
            level: "info",
            message: "Done: CWA_PROFIT_CORPORATION",
        });
    }))();
    (() => __awaiter(this, void 0, void 0, function* () {
        yield delay_1.default(200);
        const ninthTask = yield CWA_NONPROFIT_CORPORATION._read();
        yield queue.add(ninthTask);
        winston_1.default.log({
            level: "info",
            message: "Done: CWA_NONPROFIT_CORPORATION",
        });
    }))();
    (() => __awaiter(this, void 0, void 0, function* () {
        yield delay_1.default(200);
        const tenthTask = yield CWA_PUBLIC_BENEFIT_CORPORATION._read();
        yield queue.add(tenthTask);
        winston_1.default.log({
            level: "info",
            message: "Done: CWA_PUBLIC_BENEFIT_CORPORATION",
        });
    }))();
    winston_1.default.log({
        level: "info",
        message: "Starting to fetch 200 businesses by keywords",
    });
}
function get_random_int(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
// TODO: this is the only thing to be in index.ts
function main() {
    const queue = new PQueue({ concurrency: 3 });
    (() => __awaiter(this, void 0, void 0, function* () {
        yield delay_1.default(get_random_int(1000));
        const firstTask = yield CWA_LIMITED_LIABILITY_CORPORATION_ALL._read();
        yield queue.add(firstTask);
        winston_1.default.log({
            level: "info",
            message: "COMPLETED: CWA_LIMITED_LIABILITY_CORPORATION",
        });
    }))();
    (() => __awaiter(this, void 0, void 0, function* () {
        yield delay_1.default(get_random_int(1000));
        const secondTask = yield CWA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP_ALL._read();
        yield queue.add(secondTask);
        winston_1.default.log({
            level: "info",
            message: "Done: CWA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP",
        });
    }))();
    (() => __awaiter(this, void 0, void 0, function* () {
        yield delay_1.default(get_random_int(1000));
        const thirdTask = yield CWA_LIMITED_LIABILITY_PARTNERSHIP_ALL._read();
        yield queue.add(thirdTask);
        winston_1.default.log({
            level: "info",
            message: "Done: CWA_LIMITED_LIABILITY_PARTNERSHIP",
        });
    }))();
    (() => __awaiter(this, void 0, void 0, function* () {
        yield delay_1.default(get_random_int(1000));
        const fourthTask = yield CWA_LIMITED_PARTNERSHIP_ALL._read();
        yield queue.add(fourthTask);
        winston_1.default.log({
            level: "info",
            message: "Done: CWA_LIMITED_PARTNERSHIP",
        });
    }))();
    (() => __awaiter(this, void 0, void 0, function* () {
        yield delay_1.default(get_random_int(1000));
        const fifthTask = yield CWA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY_ALL._read();
        yield queue.add(fifthTask);
        winston_1.default.log({
            level: "info",
            message: "Done: CWA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY",
        });
    }))();
    (() => __awaiter(this, void 0, void 0, function* () {
        yield delay_1.default(get_random_int(1000));
        const sixthTask = yield CWA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP_ALL._read();
        yield queue.add(sixthTask);
        winston_1.default.log({
            level: "info",
            message: "Done: CWA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP",
        });
    }))();
    (() => __awaiter(this, void 0, void 0, function* () {
        yield delay_1.default(get_random_int(1000));
        const seventhTask = yield CWA_PROFESSIONAL_SERVICE_CORPORATION_ALL._read();
        yield queue.add(seventhTask);
        winston_1.default.log({
            level: "info",
            message: "Done: CWA_PROFESSIONAL_SERVICE_CORPORATION",
        });
    }))();
    (() => __awaiter(this, void 0, void 0, function* () {
        yield delay_1.default(get_random_int(1000));
        const eighhtTask = yield CWA_PROFIT_CORPORATION_ALL._read();
        yield queue.add(eighhtTask);
        winston_1.default.log({
            level: "info",
            message: "Done: CWA_PROFIT_CORPORATION",
        });
    }))();
    (() => __awaiter(this, void 0, void 0, function* () {
        yield delay_1.default(get_random_int(1000));
        const ninthTask = yield CWA_NONPROFIT_CORPORATION_ALL._read();
        yield queue.add(ninthTask);
        winston_1.default.log({
            level: "info",
            message: "Done: CWA_NONPROFIT_CORPORATION",
        });
    }))();
    (() => __awaiter(this, void 0, void 0, function* () {
        yield delay_1.default(get_random_int(1000));
        const tenthTask = yield CWA_PUBLIC_BENEFIT_CORPORATION_ALL._read();
        yield queue.add(tenthTask);
        winston_1.default.log({
            level: "info",
            message: "Done: CWA_PUBLIC_BENEFIT_CORPORATION",
        });
    }))();
    winston_1.default.log({
        level: "info",
        message: "Starting to fetch all business by keywords",
    });
}
// TODO: create parseArguments module with the files I provided earlier
// /*
//   TODO: yargs
//   --concurrency
//   */
// TODO: On Ctrl-C Save location of company fetches to resume on restart
// TODO: save state on any interrupts
/*
  https://nodejs.org/api/process.html

  process.on('SIGINT', function() {
    logger.log("Caught interrupt signal");

    if (i_should_exit)
        process.exit();
  });
  */
//  run_200_business();
// run_all_business();
main();
//# sourceMappingURL=index.js.map