import stream from "stream";
import fetchTable from "./fetchTable";
import clc from "cli-color";
import logger from "./common/winston";

var info = clc.white.bold;
var error = clc.red.bold;
var warn = clc.yellow;
var notice = clc.blue;

class CorporationBasicRawStream extends stream.Readable {
  isFetching: Boolean = false;
  isFinished: Boolean = false;

  pageId: any = 1;

  pageCount: number;

  businessTypeId: any;
  args: {};
  searchEntityName: string = "";
  searchType: string = "";

  constructor(pageId: any, businessTypeId: any, args: {}) {
    super({ objectMode: true, highWaterMark: 128 });

    this.pageId = pageId;
    this.args = args;
    this.businessTypeId = businessTypeId;

    if (!this.pageId) throw new Error("The page number must be specified.");
    if (!this.businessTypeId)
      throw new Error("The business type must be specified.");
  }

  async fetchOne(pageCount: number) {
    const fetchArgs = {
      PageID: this.pageId,
      PageCount: pageCount,
      BusinessTypeID: this.businessTypeId,
      SearchEntityName: this.searchEntityName,
      SearchType: this.searchType,
    };
    const computedArgs = { ...this.args, ...fetchArgs };
    logger.log({
      level: "debug",
      message: "CorporationBasicRawStream fetch arguments",
    });
    logger.log({
      level: "debug",
      message: info(),
    });
    try {
      if (pageCount === -1) {
        pageCount = Math.abs(pageCount);
        let pageNumber = 1
        const allArgs = {
          PageID: pageNumber,
          PageCount: 1000,
          BusinessTypeID: this.businessTypeId,
          SearchEntityName: this.searchEntityName,
          SearchType: this.searchType,
        };
        const computedArgs = { ...this.args, ...allArgs };
        logger.log({
          level: 'debug',
          message: info()
        });
        const table = await fetchTable(computedArgs);
        try {
          if(table) {
            const { TOTAL_AVAILABLE_BUSINESS } = table;
              if (TOTAL_AVAILABLE_BUSINESS > 1000) {
                let calculator = Math.floor((TOTAL_AVAILABLE_BUSINESS / 1000) - 1);
                for (let index = 0; index < calculator; index++) {
                  this.isFetching = true;
                  pageNumber++;
                }
              }
              this.isFetching = false;
              this.isFinished = true;
              console.log(table);
              return table;
          } else {
            this.isFetching = false;
              this.isFinished = true;
              console.log(table);
              return table;
          }
        } catch(error) {
          logger.log({
            level: 'debug',
            message: `Main fetch error: ${error}`
          })
        }
      } else {
        try {
          const table = await fetchTable(computedArgs);
          if (table) {
            const { TOTAL_AVAILABLE_BUSINESS } = table;
            console.log(table);
          if (!table) {
              this.isFetching = false;
              this.isFinished = true;
              return table;
            } else if (TOTAL_AVAILABLE_BUSINESS) {
              this.pageId = Math.floor(TOTAL_AVAILABLE_BUSINESS - pageCount);
              const newArgs = {
                PageID: this.pageId,
                PageCount: pageCount, //to change back to 100
                BusinessTypeID: this.businessTypeId,
                SearchEntityName: this.searchEntityName,
                SearchType: this.searchType,
              };
              const newComputedArgs = { ...this.args, ...newArgs };
              const newTable = await fetchTable(newComputedArgs);
              console.log(newTable);
              this.isFetching = false;
              this.isFinished = true;
              return newTable;
            } else {
              this.stopFetching();
              return table;
            }
          }
        } catch(error) {
          logger.log({
            level: 'debug',
            message: `Fetch table error: ${error}`
          })
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  async fetchWorker(pageCount: number) {
    while (this.isFetching) {
      return await this.fetchOne(pageCount);
    }
  }

  async startFetching(pageCount: number) {
    this.isFetching = true;
    return this.fetchWorker(pageCount);
  }

  stopFetching = () => (this.isFetching = false);

 async _read(pageCount: number) {    
    if (this.isFetching || this.isFinished) return;
    return this.startFetching(pageCount);
  }
}

export default CorporationBasicRawStream;
