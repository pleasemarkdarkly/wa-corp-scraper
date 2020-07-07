import stream from "stream";
import fetchTable from "./fetchTable";
import clc  from "cli-color";
import logger from './config/winston'

var info = clc.white.bold;
var error = clc.red.bold;
var warn = clc.yellow;
var notice = clc.blue;


/*
  camel case and ID is Id or id but no ID

*/

class CorporationBasicRawStream extends stream.Readable {
  isFetching: Boolean = false;
  isFinished: Boolean = false;
 
 // change to pageId 
  pageId: any = 1;

  // pageCount unless this is a class 
  pageCount: any;

  businessTypeId: any;
  args: {};
  searchEntityName: string = '';
  searchType: string = '';

  constructor(pageCount: any, pageId: any, businessTypeId: any, args: {}) {
    super({ objectMode: true, highWaterMark: 128 });

    
    this.pageCount = pageCount;
    this.pageId = pageId;
    this.args = args;
    this.businessTypeId = businessTypeId;

    if (!this.pageCount)
      throw new Error(
        "The number of businesses on each page must be included."
      );
    if (!this.pageId) throw new Error("The page number must be specified.");
    if (!this.businessTypeId)
      throw new Error("The business type must be specified.");
  }

  async fetchOne() {
    const fetchArgs = {
      PageID: this.pageId,
      PageCount: this.pageCount,
      BusinessTypeID: this.businessTypeId,
      SearchEntityName: this.searchEntityName,
      SearchType: this.searchType,
    };

    const computedArgs = { ...this.args, ...fetchArgs };

    // logger.log(info("CorporationBasicRawStream fetch arguments:"));

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
        const computedArgs = { ...this.args, ...allArgs };
        // logger.log(allArgs);
        const table = await fetchTable(computedArgs); 
       const  { TOTAL_AVAILABLE_BUSINESS } = table;
        let totalTable,
          Tables = [];
        for (let i = 0; i < 10; i++) {
          const newArgs = {
            PageID: this.pageId,
            PageCount: 
              `${TOTAL_AVAILABLE_BUSINESS > 100
                ? Math.floor(TOTAL_AVAILABLE_BUSINESS / 100)
                : TOTAL_AVAILABLE_BUSINESS}`
            ,
            BusinessTypeID: this.businessTypeId,
            SearchEntityName: this.searchEntityName,
            SearchType: this.searchType,
          };
          const newComputedArgs: any = { ...this.args, ...newArgs };

          logger.log({
            level: 'verbose',
            message: `CorporationBasicRawStream (newComputedArgs): ${newComputedArgs}`
          });
          totalTable = await fetchTable(newComputedArgs);
          this.pageCount++;

          logger.log({
            level: 'verbose',
            message: `CorporationBasicRawStream (totalTable): ${totalTable}`
          });

          if (TOTAL_AVAILABLE_BUSINESS < 100) return totalTable;
          Tables.push(totalTable);
        }
        this.isFetching = false;
        this.isFinished = true;
        return Tables;
      }
      const table = await fetchTable(computedArgs);
      const { TOTAL_AVAILABLE_BUSINESS } = table;
      console.log({table});

      if (!table) {
        this.isFetching = false;
        this.isFinished = true;
        return;
      } else if (TOTAL_AVAILABLE_BUSINESS) {
        this.pageId = Math.floor(TOTAL_AVAILABLE_BUSINESS / 5);
        const newArgs = {
          PageID: this.pageId,
          PageCount: 5, //to change back to 100
          BusinessTypeID: this.businessTypeId,
          SearchEntityName: this.searchEntityName,
          SearchType: this.searchType,
        };
        const newComputedArgs = { ...this.args, ...newArgs };
        console.log(newComputedArgs);
        const newTable = await fetchTable(newComputedArgs);
        console.log(newTable);
        this.isFetching = false;
        this.isFinished = true;
        return newTable;
      } else {
        this.stopFetching();
        return table;
      }
    } catch (e) {
      console.error(e);
    }
  }

  async fetchWorker() {
    while (this.isFetching) {
      return await this.fetchOne();
    }
  }

  async startFetching() {
    this.isFetching = true;
      // for(let i = 0; i < keywords.length; i++) {
      //   this.searchEntityName = keywords[i];
      //   this.searchType = `${this.searchEntityName === "" ? "" : `Contains`}`;
      //   return this.fetchWorker();
      // }
    return this.fetchWorker();

  }

  stopFetching = () => (this.isFetching = false);

  _read() {
    if (this.isFetching || this.isFinished) return;
    return this.startFetching();
  }
}

export default CorporationBasicRawStream;
