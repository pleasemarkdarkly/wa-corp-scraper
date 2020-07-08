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
exports.get_random_int = void 0;
const winston_1 = __importDefault(require("./common/winston"));
const delay_1 = __importDefault(require("delay"));
const testMainFetch_1 = require("./testMainFetch");
const { default: PQueue } = require("p-queue");
require("dotenv").config();
function test_main(concurrency) {
    const queue = new PQueue({ concurrency });
    (() => __awaiter(this, void 0, void 0, function* () {
        yield delay_1.default(200);
        const firstTask = yield testMainFetch_1.CWA_LIMITED_LIABILITY_CORPORATION._read();
        //   await queue.add(firstTask);
        winston_1.default.log({
            level: "info",
            message: "COMPLETED: CWA_LIMITED_LIABILITY_CORPORATION",
        });
    }))();
    (() => __awaiter(this, void 0, void 0, function* () {
        yield delay_1.default(200);
        const secondTask = yield testMainFetch_1.CWA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP._read();
        //   await queue.add(secondTask);
        winston_1.default.log({
            level: "info",
            message: "Done: CWA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP",
        });
    }))();
    (() => __awaiter(this, void 0, void 0, function* () {
        yield delay_1.default(200);
        const thirdTask = yield testMainFetch_1.CWA_LIMITED_LIABILITY_PARTNERSHIP._read();
        //   await queue.add(thirdTask);
        winston_1.default.log({
            level: "info",
            message: "Done: CWA_LIMITED_LIABILITY_PARTNERSHIP",
        });
    }))();
    (() => __awaiter(this, void 0, void 0, function* () {
        yield delay_1.default(200);
        const fourthTask = yield testMainFetch_1.CWA_LIMITED_PARTNERSHIP._read();
        //   await queue.add(fourthTask);
        winston_1.default.log({
            level: "info",
            message: "Done: CWA_LIMITED_PARTNERSHIP",
        });
    }))();
    (() => __awaiter(this, void 0, void 0, function* () {
        yield delay_1.default(200);
        const fifthTask = yield testMainFetch_1.CWA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY._read();
        //   await queue.add(fifthTask);
        winston_1.default.log({
            level: "info",
            message: "Done: CWA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY",
        });
    }))();
    (() => __awaiter(this, void 0, void 0, function* () {
        yield delay_1.default(200);
        const sixthTask = yield testMainFetch_1.CWA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP._read();
        //   await queue.add(sixthTask);
        winston_1.default.log({
            level: "info",
            message: "Done: CWA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP",
        });
    }))();
    (() => __awaiter(this, void 0, void 0, function* () {
        yield delay_1.default(200);
        const seventhTask = yield testMainFetch_1.CWA_PROFESSIONAL_SERVICE_CORPORATION._read();
        //   await queue.add(seventhTask);
        winston_1.default.log({
            level: "info",
            message: "Done: CWA_PROFESSIONAL_SERVICE_CORPORATION",
        });
    }))();
    (() => __awaiter(this, void 0, void 0, function* () {
        yield delay_1.default(200);
        const eighhtTask = yield testMainFetch_1.CWA_PROFIT_CORPORATION._read();
        //   await queue.add(eighhtTask);
        winston_1.default.log({
            level: "info",
            message: "Done: CWA_PROFIT_CORPORATION",
        });
    }))();
    (() => __awaiter(this, void 0, void 0, function* () {
        yield delay_1.default(200);
        const ninthTask = yield testMainFetch_1.CWA_NONPROFIT_CORPORATION._read();
        //   await queue.add(ninthTask);
        winston_1.default.log({
            level: "info",
            message: "Done: CWA_NONPROFIT_CORPORATION",
        });
    }))();
    (() => __awaiter(this, void 0, void 0, function* () {
        yield delay_1.default(200);
        const tenthTask = yield testMainFetch_1.CWA_PUBLIC_BENEFIT_CORPORATION._read();
        //   await queue.add(tenthTask);
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
exports.get_random_int = get_random_int;
exports.default = test_main;
//# sourceMappingURL=testMain.js.map