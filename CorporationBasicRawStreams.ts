import stream from "stream";
import fetchTable from "./fetchTable";
import clc from "cli-color";
import logger from "./common/winston";

var info = clc.white.bold;
var error = clc.red.bold;
var warn = clc.yellow;
var notice = clc.blue;

enum BusinessType {
  WA_LIMITED_LIABILITY_CORPORATION = 65,
  WA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP = 67,
  WA_LIMITED_LIABILITY_PARTNERSHIP = 68,
  WA_LIMITED_PARTNERSHIP = 69,
  WA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY = 79,
  WA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP = 76,
  WA_PROFESSIONAL_SERVICE_CORPORATION = 85,
  WA_PROFIT_CORPORATION = 86,
  WA_NONPROFIT_CORPORATION = 73,
  WA_PUBLIC_BENEFIT_CORPORATION = 87,
};
export type businesTypeString = keyof typeof BusinessType;
class CorporationBasicRawStream {
  isFetching: Boolean = false;
  isFinished: Boolean = false;
  pageId: any = 1;
  pageCount: number;
  businessTypeId: any;
  args: {};
 
  constructor(pageId: any, args: {}) {
    this.pageId = pageId;
    this.args = args;
    if (!this.pageId) throw new Error("The page number must be specified.");

  }

  async fetchOne(pageCount: any, businesType: businesTypeString) {
    const id = BusinessType[businesType]
    if(!id) {
      logger.log({
        level: 'info',
        message: 'Enter corrrect company name'
      })
      return;
    }
    logger.log({
      level: 'info',
      message: `The business type id is ${id}`
    })
    if(typeof pageCount === 'string') pageCount = pageCount.toUpperCase().trim();
    console.log(pageCount);
    
    logger.log({
      level: "debug",
      message: "CorporationBasicRawStream fetch arguments",
      pageCount: `The total business to be processed is ${pageCount}`
    });
    logger.log({
      level: "debug",
      message: info(),
    });
    try {
      if (pageCount === 'ALL') {
        let pageNumber = 1
        const allArgs = {
          PageID: pageNumber,
          PageCount: 5,
          BusinessTypeID: id
        };
        const computedArgs = { ...this.args, ...allArgs };
        logger.log({
          level: 'debug',
          message: info()
        });
        const table = await fetchTable(computedArgs);
        try {
          if(table) {
            let calculator;
            const { TOTAL_AVAILABLE_BUSINESS } = table;
              if (TOTAL_AVAILABLE_BUSINESS > 1000) {
                  calculator = Math.floor((TOTAL_AVAILABLE_BUSINESS / 1000) - 1);
                  for (let index = 0; index < 2; index++) {
                    let pageNumber = 1
                    const allArgs = {
                      PageID: pageNumber,
                      PageCount: 5,
                      BusinessTypeID: id
                    };
                    const computedArgs = { ...this.args, ...allArgs };
                    logger.log({
                      level: 'debug',
                      message: info()
                    });
                    const table = await fetchTable(computedArgs);
                }
                logger.log({
                  level: 'info',
                  message: `Then number of total business is ${TOTAL_AVAILABLE_BUSINESS}`,
                  count: `The total loop is ${calculator}`,
                  pageNumber: `The page number is ${pageNumber}`,
                })
                console.log(table);
                return table;
              }
              // this.isFetching = false;
              // this.isFinished = true;
          } else {
            this.isFetching = false;
              this.isFinished = true;
              // console.log(table);
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
          const fetchArgs = {
            PageID: this.pageId,
            PageCount: pageCount,
            BusinessTypeID: id,
          };
          const computedArgs = { ...this.args, ...fetchArgs };
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
                PageCount: pageCount, 
                BusinessTypeID: id
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

  async fetchWorker(pageCount: any, businesType: businesTypeString) {
    while (this.isFetching) {
      return await this.fetchOne(pageCount, businesType);
    }
  }

  async startFetching(pageCount: any, businesType: businesTypeString) {
    this.isFetching = true;
    return this.fetchWorker(pageCount, businesType);
  }

  stopFetching = () => (this.isFetching = false);

 async _read(pageCount: any, businesType: businesTypeString) {    
    if (this.isFetching || this.isFinished) return;
    return this.startFetching(pageCount, businesType);
  }
}

export default CorporationBasicRawStream;
