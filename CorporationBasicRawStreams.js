const stream = require('stream');
const  fetchTable   = require('./fetchTable');

class CorporationBasicRawStream extends stream.Readable {
  concurrency = 4;
  isFetching = false;
  isFinished = false;
  PageID = 1;
  PageCount;
  BusinessTypeID;

  constructor(PageCount, PageID, concurrency, BusinessTypeID, args) {
    super({ objectMode: true, highWaterMark: 128 });

    this.PageCount = PageCount
    this.PageID = PageID
    this.args = args
    this.concurrency = concurrency
    this.BusinessTypeID = BusinessTypeID

    if(!this.PageCount) throw new Error("The number of businesses on each page must be included");
    if(!this.PageID) throw new Error("The page number must be specified")
    if(!this.BusinessTypeID) throw new Error("The business type must be specified")
  }

  async fetchOne() {
    const fetchArgs = {
      PageID : this.PageID,
      PageCount: this.PageCount,
      BusinessTypeID: this.BusinessTypeID,
    };

    const computedArgs = { ...this.args, ...fetchArgs };
    console.log(fetchArgs);
    
    try {
      const table = await fetchTable(computedArgs);
      console.log(table);
      const { TotalRowCount } = table

      if (!table) {
          this.isFetching = false;
          this.isFinished = true;
          return;
      } 
      else if(TotalRowCount) {
        this.PageID = Math.floor((TotalRowCount / 100));
        const newArgs = {
          PageID : this.PageID,
          PageCount: 100,
          BusinessTypeID: this.BusinessTypeID,
        };
        const newComputedArgs = { ...this.args, ...newArgs };
        console.log(newArgs);
        const newTable = await fetchTable(newComputedArgs);
        console.log(newTable);
        this.isFetching = false;
        this.isFinished = true;
        return;
      }
      else {
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
    for (let i = 0; i < this.concurrency; i++){
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