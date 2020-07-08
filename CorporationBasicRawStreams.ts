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

  pageCount: any;

  businessTypeId: any;
  args: {};
  searchEntityName: string = "";
  searchType: string = "";

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

    logger.log({
      level: "debug",
      message: "CorporationBasicRawStream fetch arguments",
    });

    logger.log({
      level: "debug",
      message: info(),
    });

    try {
      if (this.pageCount === -1) {
        this.pageCount = Math.abs(this.pageCount);
        let pageNumber = 1
        const allArgs = {
          PageID: pageNumber,
          PageCount: 1000,
          BusinessTypeID: this.businessTypeId,
          SearchEntityName: this.searchEntityName,
          SearchType: this.searchType,
        };
        const computedArgs = { ...this.args, ...allArgs };
        console.log(allArgs);
        
        logger.log({
          level: 'debug',
          message: info()
        });
  
        const table = await fetchTable(computedArgs);
        try {
          if(table) {
            const { TOTAL_AVAILABLE_BUSINESS } = table;
              let calculator = Math.floor(TOTAL_AVAILABLE_BUSINESS / 1000)
              if (TOTAL_AVAILABLE_BUSINESS > 1000) {
                for (let index = 0; index < calculator; index++) {
                  this.isFetching = true;
                  pageNumber++;
                }
              }
              this.isFetching = false;
              this.isFinished = true;
              return table;
          }
        } catch(error) {
          logger.log({
            level: 'debug',
            message: `Main fetch error: ${error}`
          })
        }
      }
      try {
        const table = await fetchTable(computedArgs);
        if (table) {
          const { TOTAL_AVAILABLE_BUSINESS } = table;
          // logger.log({
          //   level: 'debug',
          //   message: JSON.stringify(table)
          // });
          console.log(table);
        if (!table) {
            this.isFetching = false;
            this.isFinished = true;
            return;
          } else if (TOTAL_AVAILABLE_BUSINESS) {
            this.pageId = Math.floor(TOTAL_AVAILABLE_BUSINESS / 5);
            const newArgs = {
              PageID: this.pageId,
              PageCount: 100, //to change back to 100
              BusinessTypeID: this.businessTypeId,
              SearchEntityName: this.searchEntityName,
              SearchType: this.searchType,
            };
            const newComputedArgs = { ...this.args, ...newArgs };
    
            /*
            logger.log({
              level: 'debug',
              message: JSON.stringify(newComputedArgs)
            });
            */
            const newTable = await fetchTable(newComputedArgs);
      
            console.log(newTable);
      /*
            logger.log({
              level: 'debug',
              message: JSON.stringify(newTable)
            });
      */
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

 async _read() {    
    if (this.isFetching || this.isFinished) return;
    return this.startFetching();
  }
}

export default CorporationBasicRawStream;
