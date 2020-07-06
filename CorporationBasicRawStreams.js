const stream = require("stream");
const fetchTable = require("./fetchTable");
var clc = require("cli-color");

var info = clc.white.bold;
var error = clc.red.bold;
var warn = clc.yellow;
var notice = clc.blue;


/*
  camel case and ID is Id or id but no ID

*/

class CorporationBasicRawStream extends stream.Readable {
  isFetching = false;
  isFinished = false;
 
 // change to pageId 
  PageID = 1;

  // pageCount unless this is a class 
  PageCount;

  BusinessTypeID;

  constructor(PageCount, PageID, BusinessTypeID, SearchEntityName, args) {
    super({ objectMode: true, highWaterMark: 128 });

    
    this.PageCount = PageCount;
    this.PageID = PageID;
    this.args = args;
    
    this.SearchEntityName = SearchEntityName;
    this.BusinessTypeID = BusinessTypeID;

    if (!this.PageCount)
      throw new Error(
        "The number of businesses on each page must be included."
      );
    if (!this.PageID) throw new Error("The page number must be specified.");
    if (!this.BusinessTypeID)
      throw new Error("The business type must be specified.");
  }

  async fetchOne() {
    const fetchArgs = {
      PageID: this.PageID,
      PageCount: this.PageCount,
      BusinessTypeID: this.BusinessTypeID,
      SearchEntityName: this.SearchEntityName,
      SearchType: `${this.SearchEntityName === "" ? " " : `Contains`}`,
    };

    const computedArgs = { ...this.args, ...fetchArgs };

    // console.log(info("CorporationBasicRawStream fetch arguments:"));
    console.log(fetchArgs);

    try {
      if (this.PageCount === -1) {
        this.PageCount = Math.abs(this.PageCount);
        const allArgs = {
          PageID: this.PageCount,
          PageCount: this.PageCount,
          BusinessTypeID: this.BusinessTypeID,
          SearchEntityName: this.SearchEntityName,
          SearchType: `${this.SearchEntityName === "" ? "" : `Contains`}`,
        };
        const computedArgs = { ...this.args, ...allArgs };
        // console.log(allArgs);
        const table = await fetchTable(computedArgs);
        const { TOTAL_AVAILABLE_BUSINESS } = table;
        let totalTable,
          Tables = [];
        for (let i = 0; i < 100; i++) {
          const newArgs = {
            PageID: this.PageCount,
            PageCount: `${
              TOTAL_AVAILABLE_BUSINESS > 100
                ? parseInt(TOTAL_AVAILABLE_BUSINESS / 100)
                : TOTAL_AVAILABLE_BUSINESS
            }`,
            BusinessTypeID: this.BusinessTypeID,
          };
          const newComputedArgs = { ...this.args, ...newArgs };

          console.log(warn("CorporationBasicRawStream: newComputedArgs:"));
          console.log(newArgs);

          totalTable = await fetchTable(newComputedArgs);
          this.PageCount++;

          console.log(warn("CorporationBasicRawStream (totalTable):"));
          console.log(totalTable);

          if (TOTAL_AVAILABLE_BUSINESS < 100) return totalTable;
          Tables.push(totalTable);
        }
        this.isFetching = false;
        this.isFinished = true;
        return Tables;
      }
      const table = await fetchTable(computedArgs);
      const { TOTAL_AVAILABLE_BUSINESS } = table;
      console.log(table);

      if (!table) {
        this.isFetching = false;
        this.isFinished = true;
        return;
      } else if (TOTAL_AVAILABLE_BUSINESS) {
        this.PageID = Math.floor(TOTAL_AVAILABLE_BUSINESS / 10);
        const newArgs = {
          PageID: this.PageID,
          PageCount: 100, //to change back to 100
          BusinessTypeID: this.BusinessTypeID,
          SearchEntityName: this.SearchEntityName,
          SearchType: `${this.SearchEntityName === "" ? "" : `Contains`}`,
        };
        const newComputedArgs = { ...this.args, ...newArgs };
        console.log(newArgs);
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
    return this.fetchWorker();
  }

  stopFetching = () => (this.isFetching = false);

  _read() {
    if (this.isFetching || this.isFinished) return;
    return this.startFetching();
  }
}

module.exports = CorporationBasicRawStream;
