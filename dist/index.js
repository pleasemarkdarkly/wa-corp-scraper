"use strict";
/** @format */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const winston_1 = __importDefault(require("./common/winston"));
const delay_1 = __importDefault(require("delay"));
const mainFetch_1 = require("./mainFetch");
const testMain_1 = __importStar(require("./testMain"));
const { default: PQueue } = require("p-queue");
require("dotenv").config();
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
function main(concurrency) {
    const queue = new PQueue({ concurrency });
    (() => __awaiter(this, void 0, void 0, function* () {
        yield delay_1.default(testMain_1.get_random_int(1000));
        const firstTask = yield mainFetch_1.CWA_LIMITED_LIABILITY_CORPORATION_ALL._read();
        // await queue.add(firstTask);
        winston_1.default.log({
            level: "info",
            message: "COMPLETED: CWA_LIMITED_LIABILITY_CORPORATION",
        });
    }))();
    (() => __awaiter(this, void 0, void 0, function* () {
        yield delay_1.default(testMain_1.get_random_int(1000));
        const secondTask = yield mainFetch_1.CWA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP_ALL._read();
        // await queue.add(secondTask);
        winston_1.default.log({
            level: "info",
            message: "Done: CWA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP",
        });
    }))();
    (() => __awaiter(this, void 0, void 0, function* () {
        yield delay_1.default(testMain_1.get_random_int(1000));
        const thirdTask = yield mainFetch_1.CWA_LIMITED_LIABILITY_PARTNERSHIP_ALL._read();
        // await queue.add(thirdTask);
        winston_1.default.log({
            level: "info",
            message: "Done: CWA_LIMITED_LIABILITY_PARTNERSHIP",
        });
    }))();
    (() => __awaiter(this, void 0, void 0, function* () {
        yield delay_1.default(testMain_1.get_random_int(1000));
        const fourthTask = yield mainFetch_1.CWA_LIMITED_PARTNERSHIP_ALL._read();
        // await queue.add(fourthTask);
        winston_1.default.log({
            level: "info",
            message: "Done: CWA_LIMITED_PARTNERSHIP",
        });
    }))();
    (() => __awaiter(this, void 0, void 0, function* () {
        yield delay_1.default(testMain_1.get_random_int(1000));
        const fifthTask = yield mainFetch_1.CWA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY_ALL._read();
        // await queue.add(fifthTask);
        winston_1.default.log({
            level: "info",
            message: "Done: CWA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY",
        });
    }))();
    (() => __awaiter(this, void 0, void 0, function* () {
        yield delay_1.default(testMain_1.get_random_int(1000));
        const sixthTask = yield mainFetch_1.CWA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP_ALL._read();
        // await queue.add(sixthTask);
        winston_1.default.log({
            level: "info",
            message: "Done: CWA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP",
        });
    }))();
    (() => __awaiter(this, void 0, void 0, function* () {
        yield delay_1.default(testMain_1.get_random_int(1000));
        const seventhTask = yield mainFetch_1.CWA_PROFESSIONAL_SERVICE_CORPORATION_ALL._read();
        // await queue.add(seventhTask);
        winston_1.default.log({
            level: "info",
            message: "Done: CWA_PROFESSIONAL_SERVICE_CORPORATION",
        });
    }))();
    (() => __awaiter(this, void 0, void 0, function* () {
        yield delay_1.default(testMain_1.get_random_int(1000));
        const eighhtTask = yield mainFetch_1.CWA_PROFIT_CORPORATION_ALL._read();
        // await queue.add(eighhtTask);
        winston_1.default.log({
            level: "info",
            message: "Done: CWA_PROFIT_CORPORATION",
        });
    }))();
    (() => __awaiter(this, void 0, void 0, function* () {
        yield delay_1.default(testMain_1.get_random_int(1000));
        const ninthTask = yield mainFetch_1.CWA_NONPROFIT_CORPORATION_ALL._read();
        // await queue.add(ninthTask);
        winston_1.default.log({
            level: "info",
            message: "Done: CWA_NONPROFIT_CORPORATION",
        });
    }))();
    (() => __awaiter(this, void 0, void 0, function* () {
        yield delay_1.default(testMain_1.get_random_int(1000));
        const tenthTask = yield mainFetch_1.CWA_PUBLIC_BENEFIT_CORPORATION_ALL._read();
        // await queue.add(tenthTask);
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
// main(1)
testMain_1.default(1);
exports.default = main;
//# sourceMappingURL=index.js.map