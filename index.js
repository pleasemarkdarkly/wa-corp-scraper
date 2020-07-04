var clc = require("cli-color");
var businessSearchCriteria = require("./businessSearchcriteria");
var CorporationBasicRawStream = require("./CorporationBasicRawStreams");
const pLimit = require("p-limit");

require("dotenv").config();

var info = clc.white.bold;
var error = clc.red.bold;
var warn = clc.yellow;
var notice = clc.blue;

const ALL_RECORDS = -1;
const _RECORDS = 100;

const BusinessType = {
  WA_LIMITED_LIABILITY_CORPORATION: 65,
  WA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP: 67,
  WA_LIMITED_LIABILITY_PARTNERSHIP: 68,
  WA_LIMITED_PARTNERSHIP: 69,
  WA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY: 79,
  WA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP: 76,
  WA_PROFESSIONAL_SERVICE_CORPORATION: 85,
  WA_PROFIT_CORPORATION: 86,
  WA_NONPROFIT_CORPORATION: 73,
  WA_PUBLIC_BENEFIT_CORPORATION: 87,
};

// CorporationBasicRawStream(PageCount, PageID, BusinessTypeID,  criteria)
// PageCount = The number of business to fetch at a time
// PageID = The starting page
// BusinessTypeID = The business type number
// criteria = the remaining business search criteria

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

const CWA_LIMITED_LIABILITY_CORPORATION = new CorporationBasicRawStream(
  _RECORDS,
  1,
  BusinessType.WA_LIMITED_LIABILITY_CORPORATION,
  businessSearchCriteria
);

const CWA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP = new CorporationBasicRawStream(
  _RECORDS,
  1,
  BusinessType.WA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP,
  businessSearchCriteria
);

const CWA_LIMITED_LIABILITY_PARTNERSHIP = new CorporationBasicRawStream(
  _RECORDS,
  1,
  BusinessType.WA_LIMITED_LIABILITY_PARTNERSHIP,
  businessSearchCriteria
);

const CWA_LIMITED_PARTNERSHIP = new CorporationBasicRawStream(
  _RECORDS,
  1,
  BusinessType.WA_LIMITED_PARTNERSHIP,
  businessSearchCriteria
);

const CWA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY = new CorporationBasicRawStream(
  _RECORDS,
  1,
  BusinessType.WA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY,
  businessSearchCriteria
);

const CWA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP = new CorporationBasicRawStream(
  _RECORDS,
  1,
  BusinessType.WA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP,
  businessSearchCriteria
);

const CWA_PROFESSIONAL_SERVICE_CORPORATION = new CorporationBasicRawStream(
  _RECORDS,
  1,
  BusinessType.WA_PROFESSIONAL_SERVICE_CORPORATION,
  businessSearchCriteria
);

const CWA_PROFIT_CORPORATION = new CorporationBasicRawStream(
  _RECORDS,
  1,
  BusinessType.WA_PROFIT_CORPORATION,
  businessSearchCriteria
);

const CWA_NONPROFIT_CORPORATION = new CorporationBasicRawStream(
  _RECORDS,
  1,
  BusinessType.WA_NONPROFIT_CORPORATION,
  businessSearchCriteria
);

const CWA_PUBLIC_BENEFIT_CORPORATION = new CorporationBasicRawStream(
  _RECORDS,
  1,
  BusinessType.WA_PUBLIC_BENEFIT_CORPORATION,
  businessSearchCriteria
);

const CWA_LIMITED_LIABILITY_CORPORATION_ALL = new CorporationBasicRawStream(
  ALL_RECORDS,
  1,
  BusinessType.WA_LIMITED_LIABILITY_CORPORATION,
  businessSearchCriteria
);

const CWA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP_ALL = new CorporationBasicRawStream(
  ALL_RECORDS,
  1,
  BusinessType.WA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP,
  businessSearchCriteria
);

const CWA_LIMITED_LIABILITY_PARTNERSHIP_ALL = new CorporationBasicRawStream(
  ALL_RECORDS,
  1,
  BusinessType.WA_LIMITED_LIABILITY_PARTNERSHIP,
  businessSearchCriteria
);

const CWA_LIMITED_PARTNERSHIP_ALL = new CorporationBasicRawStream(
  ALL_RECORDS,
  1,
  BusinessType.WA_LIMITED_PARTNERSHIP,
  businessSearchCriteria
);

const CWA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY_ALL = new CorporationBasicRawStream(
  ALL_RECORDS,
  1,
  BusinessType.WA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY,
  businessSearchCriteria
);

const CWA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP_ALL = new CorporationBasicRawStream(
  ALL_RECORDS,
  1,
  BusinessType.WA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP,
  businessSearchCriteria
);

const CWA_PROFESSIONAL_SERVICE_CORPORATION_ALL = new CorporationBasicRawStream(
  ALL_RECORDS,
  1,
  BusinessType.WA_PROFESSIONAL_SERVICE_CORPORATION,
  businessSearchCriteria
);

const CWA_PROFIT_CORPORATION_ALL = new CorporationBasicRawStream(
  ALL_RECORDS,
  1,
  BusinessType.WA_PROFIT_CORPORATION,
  businessSearchCriteria
);

const CWA_PUBLIC_BENEFIT_CORPORATION_ALL = new CorporationBasicRawStream(
  ALL_RECORDS,
  1,
  BusinessType.WA_PUBLIC_BENEFIT_CORPORATION,
  businessSearchCriteria
);

const CWA_NONPROFIT_CORPORATION_ALL = new CorporationBasicRawStream(
  ALL_RECORDS,
  1,
  BusinessType.WA_NONPROFIT_CORPORATION,
  businessSearchCriteria
);

/* 
  TODO: Move to testing module, and add switch to yargs
*/

const run_200_business = async () => {
  let promises = [],
    promise;
  try {
    const limit = pLimit(1);
    promise = [
      limit(() => CWA_LIMITED_LIABILITY_CORPORATION._read()),
      limit(() => CWA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP._read()),
      limit(() => CWA_LIMITED_LIABILITY_PARTNERSHIP._read()),
      limit(() => CWA_LIMITED_PARTNERSHIP._read()),
      limit(() => CWA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY._read()),
      limit(() => CWA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP._read()),
      limit(() => CWA_PROFESSIONAL_SERVICE_CORPORATION._read()),
      limit(() => CWA_PROFIT_CORPORATION._read()),
      limit(() => CWA_NONPROFIT_CORPORATION._read()),
      limit(() => CWA_PUBLIC_BENEFIT_CORPORATION._read()),
    ];
    for (let i = 0; i < promise.length; i++) {
      promises.push(promise[i]);
    }
    (async () => {
      // Only one promise is run at once
      const result = await Promise.all(promises);
    })();
  } catch (error) {
    console.log(error);
    return error;
  }
};

/*
  TODO: yargs 
  --concurrency 

  */

const num_threads = 1;

const run_all_business = async () => {
  let promises = [],
    promise;
  try {
    const limit = pLimit(num_threads);
    promise = [
      limit(() => CWA_LIMITED_LIABILITY_CORPORATION_ALL._read()),
      limit(() => CWA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP_ALL._read()),
      limit(() => CWA_LIMITED_LIABILITY_PARTNERSHIP_ALL._read()),
      limit(() => CWA_LIMITED_PARTNERSHIP_ALL._read()),
      limit(() => CWA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY_ALL._read()),
      limit(() => CWA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP_ALL._read()),
      limit(() => CWA_PROFESSIONAL_SERVICE_CORPORATION_ALL._read()),
      limit(() => CWA_PROFIT_CORPORATION_ALL._read()),
      limit(() => CWA_NONPROFIT_CORPORATION_ALL._read()),
      limit(() => CWA_PUBLIC_BENEFIT_CORPORATION_ALL._read()),
    ];
    for (let i = 0; i < promise.length; i++) {
      promises.push(promise[i]);
    }
    (async () => {
      // Only one promise is run at once
      const result = await Promise.all(promises);
    })();
  } catch (error) {
    console.log(error);
    return error;
  }
};

// TODO: On Ctrl-C Save location of company fetches to resume on restart
  /*
  https://nodejs.org/api/process.html

  process.on('SIGINT', function() {
    console.log("Caught interrupt signal");

    if (i_should_exit)
        process.exit();
  });
  */

// run_200_business();
run_all_business();
