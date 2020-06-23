const stream = require('stream');
const fetchTable = require('./fetchTable');
// import { v4 as uuid } from "uuid";
// import logger from "@ca/logger";

class CorporationBasicRawStream extends stream.Readable {
  concurrency = 4;
  isFetching = false;
  isFinished = false;
  PageID = 1;
  PageCount;

  constructor(PageCount, PageID, concurrency, args) {
    super({
      objectMode: true,
      highWaterMark: 128
    });
    this.PageCount = PageCount
    this.PageID = PageID
    this.args = args
    this.concurrency = concurrency
    if (!this.PageCount)
      throw new Error("The number of businesses on each page must be included");
    if (!this.PageID)
      throw new Error("The page number must be specified")
  }
  async fetchOne() {
    const fetchArgs = {
      PageID: this.PageID,
      PageCount: this.PageCount,
    };
    const computedArgs = {
      ...this.args,
      ...fetchArgs
    };
    console.log(fetchArgs);

    try {
      const table = await fetchTable(computedArgs);
      if (!table) {
        this.isFetching = false;
        this.isFinished = true;
        return;
      } else {
        this.stopFetching();
      }
    } catch (e) {
      console.error(e);
    }
  }

  async fetchWorker() {
    while (this.isFetching) {
      await this.fetchOne();
    }
  }

  async startFetching() {
    this.isFetching = true;
    for (let i = 0; i < this.concurrency; i++) {
      this.fetchWorker();
      this.PageID++;
    }
  }

  stopFetching = () => (this.isFetching = false);

  _read() {
    if (this.isFetching || this.isFinished) return;
    this.startFetching();
  }
}

module.exports = CorporationBasicRawStream