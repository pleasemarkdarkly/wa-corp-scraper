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
const stream_1 = __importDefault(require("stream"));
const fetchTable_1 = __importDefault(require("./fetchTable"));
const cli_color_1 = __importDefault(require("cli-color"));
var info = cli_color_1.default.white.bold;
var error = cli_color_1.default.red.bold;
var warn = cli_color_1.default.yellow;
var notice = cli_color_1.default.blue;
/*
  camel case and ID is Id or id but no ID

*/
class CorporationBasicRawStream extends stream_1.default.Readable {
    constructor(pageCount, pageId, businessTypeId, args) {
        super({ objectMode: true, highWaterMark: 128 });
        this.isFetching = false;
        this.isFinished = false;
        // change to pageId 
        this.pageId = 1;
        this.searchEntityName = '';
        this.searchType = '';
        this.stopFetching = () => (this.isFetching = false);
        this.pageCount = pageCount;
        this.pageId = pageId;
        this.args = args;
        this.businessTypeId = businessTypeId;
        if (!this.pageCount)
            throw new Error("The number of businesses on each page must be included.");
        if (!this.pageId)
            throw new Error("The page number must be specified.");
        if (!this.businessTypeId)
            throw new Error("The business type must be specified.");
    }
    fetchOne() {
        return __awaiter(this, void 0, void 0, function* () {
            const fetchArgs = {
                PageID: this.pageId,
                PageCount: this.pageCount,
                BusinessTypeID: this.businessTypeId,
                SearchEntityName: this.searchEntityName,
                SearchType: this.searchType,
            };
            const computedArgs = Object.assign(Object.assign({}, this.args), fetchArgs);
            // console.log(info("CorporationBasicRawStream fetch arguments:"));
            console.log(fetchArgs);
            try {
                if (this.pageCount === -1) {
                    this.pageCount = Math.abs(this.pageCount);
                    const allArgs = {
                        PageID: 1,
                        PageCount: this.pageCount,
                        BusinessTypeID: this.businessTypeId,
                        SearchEntityName: this.searchEntityName,
                        SearchType: this.searchType,
                    };
                    const computedArgs = Object.assign(Object.assign({}, this.args), allArgs);
                    // console.log(allArgs);
                    const table = yield fetchTable_1.default(computedArgs);
                    const { TOTAL_AVAILABLE_BUSINESS } = table;
                    let totalTable, Tables = [];
                    for (let i = 0; i < 10; i++) {
                        const newArgs = {
                            PageID: this.pageId,
                            PageCount: `${TOTAL_AVAILABLE_BUSINESS > 100
                                ? Math.floor(TOTAL_AVAILABLE_BUSINESS / 100)
                                : TOTAL_AVAILABLE_BUSINESS}`,
                            BusinessTypeID: this.businessTypeId,
                            SearchEntityName: this.searchEntityName,
                            SearchType: this.searchType,
                        };
                        const newComputedArgs = Object.assign(Object.assign({}, this.args), newArgs);
                        console.log(warn("CorporationBasicRawStream: newComputedArgs:"));
                        console.log(newArgs);
                        totalTable = yield fetchTable_1.default(newComputedArgs);
                        this.pageCount++;
                        console.log(warn("CorporationBasicRawStream (totalTable):"));
                        console.log(totalTable);
                        if (TOTAL_AVAILABLE_BUSINESS < 100)
                            return totalTable;
                        Tables.push(totalTable);
                    }
                    this.isFetching = false;
                    this.isFinished = true;
                    return Tables;
                }
                const table = yield fetchTable_1.default(computedArgs);
                const { TOTAL_AVAILABLE_BUSINESS } = table;
                console.log(table);
                if (!table) {
                    this.isFetching = false;
                    this.isFinished = true;
                    return;
                }
                else if (TOTAL_AVAILABLE_BUSINESS) {
                    this.pageId = Math.floor(TOTAL_AVAILABLE_BUSINESS / 5);
                    const newArgs = {
                        PageID: this.pageId,
                        PageCount: 5,
                        BusinessTypeID: this.businessTypeId,
                        SearchEntityName: this.searchEntityName,
                        SearchType: this.searchType,
                    };
                    const newComputedArgs = Object.assign(Object.assign({}, this.args), newArgs);
                    console.log(newArgs);
                    const newTable = yield fetchTable_1.default(newComputedArgs);
                    console.log(newTable);
                    this.isFetching = false;
                    this.isFinished = true;
                    return newTable;
                }
                else {
                    this.stopFetching();
                    return table;
                }
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    fetchWorker() {
        return __awaiter(this, void 0, void 0, function* () {
            while (this.isFetching) {
                return yield this.fetchOne();
            }
        });
    }
    startFetching() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isFetching = true;
            // for(let i = 0; i < keywords.length; i++) {
            //   this.searchEntityName = keywords[i];
            //   this.searchType = `${this.searchEntityName === "" ? "" : `Contains`}`;
            //   return this.fetchWorker();
            // }
            return this.fetchWorker();
        });
    }
    _read() {
        if (this.isFetching || this.isFinished)
            return;
        return this.startFetching();
    }
}
exports.default = CorporationBasicRawStream;
//# sourceMappingURL=CorporationBasicRawStreams.js.map