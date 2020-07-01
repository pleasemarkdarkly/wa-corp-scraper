var clc = require("cli-color");
var businessSearchCriteria = require('./businessSearchcriteria')
var CorporationBasicRawStream = require("./CorporationBasicRawStreams");
const pLimit = require('p-limit');


require('dotenv').config()

var info = clc.white.bold;
var error = clc.red.bold;
var warn = clc.yellow;
var notice = clc.blue;

const ALL_RECORDS = -1;

// All Business Types 
const BusinessType_WA_LIMITED_LIABILITY_CORPORATION = 65,
  BusinessType_WA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP = 67,
  BusinessType_WA_LIMITED_LIABILITY_PARTNERSHIP = 68,
  BusinessType_WA_LIMITED_PARTNERSHIP = 69,
  BusinessType_WA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY = 79,
  BusinessType_WA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP = 76,
  BusinessType_WA_PROFESSIONAL_SERVICE_CORPORATION = 85,
  BusinessType_WA_PROFIT_CORPORATION = 86,
  BusinessType_WA_NONPROFIT_CORPORATION = 73,
  BusinessType_WA_PUBLIC_BENEFIT_CORPORATION = 87;

// TODO: Ask Natasha about what other entities Non-Profits?
// const BusinessType = {
//   WA_LIMITED_LIABILITY_CORPORATION: 65,
//   WA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP: 67,
//   WA_LIMITED_LIABILITY_PARTNERSHIP: 68,
//   WA_LIMITED_PARTNERSHIP: 69,
//   WA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY: 79,
//   WA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP: 76,
//   WA_PROFESSIONAL_SERVICE_CORPORATION: 85,
//   WA_PROFIT_CORPORATION: 86,
//   WA_NON_PROFIT: 1,
// }

// CorporationBasicRawStream(PageCount, PageID, concurrency, BusinessTypeID,  criteria  )
// PageCount = The number of business to fetch at a time
// PageID = The starting page
// concurrency = The number of pages to load more
// BusinessTypeID = The business type number
// criteria = the remaining business search criteria

// console.log(info("INFO: Fetch 100 first and last of designated business types"));

/*
    const WA_CORPORATION_ALL = new CorporationBasicRawStream(-1, 1, 1, BusinessType, businessSearchCriteria);
    WA_CORPORATION_ALL._read();

    The following block is the preferred output for each company from the PDF parse and the console.log.

    (bold, green)
    BusinessType.WA_LIMITED_LIABILITY_CORPORATION: total 32,000

    (no coloring)
    (1)       Universal Business Identifier (UBI) | Business Name | Business Type | Date Filed
              Principal Office Phone | Principal Office Email | Governor First Name | Governor Last Name
              Nature of Business | Initial Report Received Date
    ...

    (32000)   Universal Business Identifier (UBI) | Business Name | Business Type | Date Filed
              Principal Office Phone | Principal Office Email | Governor First Name | Governor Last Name
              Nature of Business | Initial Report Received Date

    BusinessType.WA_LIMITED_LIABILITY_CORPORATION: time to scrape (200ms/12m) per entity/total (red/yellow)


    (bold, green) Example Summary
    Business Type: Scanned 32000 out of 32000, taking 200ms per entity. 50211 total PDF scanned. 
    Total entities 1,020,092 scanned taking 6h:01m:12 an average of .200ms per. 
*/

BusinessType_WA_LIMITED_LIABILITY_CORPORATION
const WA_LIMITED_LIABILITY_CORPORATION = new CorporationBasicRawStream(
   100,
   1,
   1,
   BusinessType_WA_LIMITED_LIABILITY_CORPORATION,
   businessSearchCriteria
 );
//WA_LIMITED_LIABILITY_CORPORATION._read();


 BusinessType_WA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP
const WA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP = new CorporationBasicRawStream(
  100,
  1,
  1,
  BusinessType_WA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP,
  businessSearchCriteria
);
//WA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP._read();

BusinessType_WA_LIMITED_LIABILITY_PARTNERSHIP
const WA_LIMITED_LIABILITY_PARTNERSHIP = new CorporationBasicRawStream(
  100,
  1,
  1,
  BusinessType_WA_LIMITED_LIABILITY_PARTNERSHIP,
  businessSearchCriteria
);
//WA_LIMITED_LIABILITY_PARTNERSHIP._read();

BusinessType_WA_LIMITED_PARTNERSHIP
const WA_LIMITED_PARTNERSHIP = new CorporationBasicRawStream(
  100,
  1,
  1,
  BusinessType_WA_LIMITED_PARTNERSHIP,
  businessSearchCriteria
);
//WA_LIMITED_PARTNERSHIP._read();

BusinessType_WA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY
const WA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY = new CorporationBasicRawStream(
   100,
   1,
   1,
   BusinessType_WA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY,
   businessSearchCriteria
 );
//WA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY._read();

BusinessType_WA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP
const WA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP = new CorporationBasicRawStream(
  100,
  1,
  1,
  BusinessType_WA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP,
  businessSearchCriteria
);
//WA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP._read();

BusinessType_WA_PROFESSIONAL_SERVICE_CORPORATION
const WA_PROFESSIONAL_SERVICE_CORPORATION = new CorporationBasicRawStream(
  100,
  1,
  1,
  BusinessType_WA_PROFESSIONAL_SERVICE_CORPORATION,
  businessSearchCriteria
);
//WA_PROFESSIONAL_SERVICE_CORPORATION._read();

BusinessType_WA_PROFIT_CORPORATION
const WA_PROFIT_CORPORATION = new CorporationBasicRawStream(
  100,
  1,
  1,
  BusinessType_WA_PROFIT_CORPORATION,
  businessSearchCriteria
);

BusinessType_WA_NONPROFIT_CORPORATION
const WA_NONPROFIT_CORPORATION = new CorporationBasicRawStream(
  100,
  1,
  1,
  BusinessType_WA_NONPROFIT_CORPORATION,
  businessSearchCriteria
);
//WA_NONPROFIT_CORPORATION._read();

BusinessType_WA_PUBLIC_BENEFIT_CORPORATION
const WA_PUBLIC_BENEFIT_CORPORATION = new CorporationBasicRawStream(
  100,
  1,
  1,
  BusinessType_WA_PUBLIC_BENEFIT_CORPORATION,
  businessSearchCriteria
);
// WA_PUBLIC_BENEFIT_CORPORATION._read();

BusinessType_WA_LIMITED_LIABILITY_CORPORATION
const WA_LIMITED_LIABILITY_CORPORATION_ALL = new CorporationBasicRawStream(
  ALL_RECORDS,
  1,
  1,
  BusinessType_WA_LIMITED_LIABILITY_CORPORATION,
  businessSearchCriteria
);
//WA_LIMITED_LIABILITY_CORPORATION_ALL._read();

BusinessType_WA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP
const WA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP_ALL = new CorporationBasicRawStream(
  ALL_RECORDS,
  1,
  1,
  BusinessType_WA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP,
  businessSearchCriteria
);
//WA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP_ALL._read();

BusinessType_WA_LIMITED_LIABILITY_PARTNERSHIP
const WA_LIMITED_LIABILITY_PARTNERSHIP_ALL = new CorporationBasicRawStream(
  ALL_RECORDS,
  1,
  1,
  BusinessType_WA_LIMITED_LIABILITY_PARTNERSHIP,
  businessSearchCriteria
);
//WA_LIMITED_LIABILITY_PARTNERSHIP_ALL._read();

BusinessType_WA_LIMITED_PARTNERSHIP
const WA_LIMITED_PARTNERSHIP_ALL = new CorporationBasicRawStream(
  ALL_RECORDS,
  1,
  1,
  BusinessType_WA_LIMITED_PARTNERSHIP,
  businessSearchCriteria
);
//WA_LIMITED_PARTNERSHIP_ALL._read();

BusinessType_WA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY
const WA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY_ALL = new CorporationBasicRawStream(
 ALL_RECORDS,
  1,
  1,
  BusinessType_WA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY,
  businessSearchCriteria
);
//WA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY_ALL._read();

 BusinessType_WA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP
const WA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP_ALL = new CorporationBasicRawStream(
  ALL_RECORDS,
  1,
  1,
  BusinessType_WA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP,
  businessSearchCriteria
);
//WA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP_ALL._read();


BusinessType_WA_PROFESSIONAL_SERVICE_CORPORATION
const WA_PROFESSIONAL_SERVICE_CORPORATION_ALL = new CorporationBasicRawStream(
  ALL_RECORDS,
  1,
  1,
  BusinessType_WA_PROFESSIONAL_SERVICE_CORPORATION,
  businessSearchCriteria
);
//WA_PROFESSIONAL_SERVICE_CORPORATION_ALL._read();


BusinessType_WA_PROFIT_CORPORATION
const WA_PROFIT_CORPORATION_ALL = new CorporationBasicRawStream(
  ALL_RECORDS,
  1,
  1,
  BusinessType_WA_PROFIT_CORPORATION,
  businessSearchCriteria
);
//WA_PROFIT_CORPORATION_ALL._read();

BusinessType_WA_PUBLIC_BENEFIT_CORPORATION
const WA_PUBLIC_BENEFIT_CORPORATION_ALL = new CorporationBasicRawStream(
  ALL_RECORDS,
  1,
  1,
  BusinessType_WA_PUBLIC_BENEFIT_CORPORATION,
  businessSearchCriteria
);
//WA_PUBLIC_BENEFIT_CORPORATION_ALL._read();

BusinessType_WA_NONPROFIT_CORPORATION
const WA_NONPROFIT_CORPORATION_ALL = new CorporationBasicRawStream(
  ALL_RECORDS,
  1,
  1,
  BusinessType_WA_NONPROFIT_CORPORATION,
  businessSearchCriteria
);
//WA_NONPROFIT_CORPORATION_ALL._read();


 const run_200_business = async () => {
   let promises =[], promise;
   try {
    const limit = pLimit(1);
    promise = [
    limit(() => WA_LIMITED_LIABILITY_CORPORATION._read()),
    limit(() => WA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP._read()),
    limit(() => WA_LIMITED_LIABILITY_PARTNERSHIP._read()),
    limit(() => WA_LIMITED_PARTNERSHIP._read()),
    limit(() => WA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY._read()),
    limit(() => WA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP._read()),
    limit(() => WA_PROFESSIONAL_SERVICE_CORPORATION._read()),
    limit(() => WA_PROFIT_CORPORATION._read()),
    limit(() => WA_NONPROFIT_CORPORATION._read()),
    limit(() => WA_PUBLIC_BENEFIT_CORPORATION._read()),
  ]; 
  for (let i = 0; i < promise.length; i++) {
    promises.push(promise[i])
  }
    (async () => {
        // Only one promise is run at once
     const result =   await Promise.all(promises);
    })();
   } catch(error) {
     console.log(error);
     return error;
   }
 }

 const run_all_business = async () => {
  let promises =[], promise;
  try {
   const limit = pLimit(1);
   promise = [
   limit(() => WA_LIMITED_LIABILITY_CORPORATION_ALL._read()),
   limit(() => WA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP_ALL._read()),
   limit(() => WA_LIMITED_LIABILITY_PARTNERSHIP_ALL._read()),
   limit(() => WA_LIMITED_PARTNERSHIP_ALL._read()),
   limit(() => WA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY_ALL._read()),
   limit(() => WA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP_ALL._read()),
   limit(() => WA_PROFESSIONAL_SERVICE_CORPORATION_ALL._read()),
   limit(() => WA_PROFIT_CORPORATION_ALL._read()),
   limit(() => WA_NONPROFIT_CORPORATION_ALL._read()),
   limit(() => WA_PUBLIC_BENEFIT_CORPORATION_ALL._read()),
 ]; 
 for (let i = 0; i < promise.length; i++) {
   promises.push(promise[i])
 }
   (async () => {
       // Only one promise is run at once
    const result =   await Promise.all(promises);
   })();
  } catch(error) {
    console.log(error);
    return error;
  }
}

run_200_business();
//  run_all_business();