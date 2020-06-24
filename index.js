
var CorporationBasicRawStream = require('./CorporationBasicRawStreams')
var businessSearchCriteria = require('./businessSearchCriteria')
var fetchAnnualReport = require('./fetchAnnualReport')

enum BusinessType {
  WA_LIMITED_LIABILITY_CORPORATION = 65,
  WA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP = 67,
  WA_LIMITED_LIABILITY_PARTNERSHIP = 68,
  WA_LIMITED_PARTNERSHIP = 69,
  WA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY = 79,
  WA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP = 76,
  WA_PROFESSIONAL_SERVICE_CORPORATION = 85,
  WA_PROFIT_CORPORATION = 86,
}

// CorporationBasicRawStream(PageCount, PageID, concurrency, BusinessTypeID,  criteria  )
// PageCount = The number of business to fetch at a time
// PageID = The starting page
// concurrency = The number of pages to load more
// BusinessTypeID = The business type number
// criteria = the remaining business search criteria

console.log("fetch 100 first and last of designated business types");

/*
TODO: Update CorporationBasicRawStream to accept -1 (for all records) and BusinessType object to crawl all filings of each BusinessType. Add ms timing and color logging.
      Adding the Filing PDF (https://www.npmjs.com/package/textract) not the pdfparse, timing and a summary output. Example function,

    const WA_CORPORATION_ALL = new CorporationBasicRawStream(-1, 1, 1, BusinessType, businessSearchCriteria);
    WA_CORPORATION_ALL._read();

    Example Summary
    Business Type: Scanned 32000 out of 32000, taking 200ms per entity. 50211 total PDF scanned. 
    Total entities 1,020,092 scanned taking 6h:01m:12 an average of .200ms per. 
*/

const WA_LIMITED_LIABILITY_CORPORATION = new CorporationBasicRawStream(100, 1, 1, BusinessType.WA_LIMITED_LIABILITY_CORPORATION, businessSearchCriteria);
WA_LIMITED_LIABILITY_CORPORATION._read();

const WA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP = new CorporationBasicRawStream(100, 1, 1, BusinessType.WA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP, businessSearchCriteria);
WA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP._read();

const WA_LIMITED_LIABILITY_PARTNERSHIP = new CorporationBasicRawStream(100, 1, 1, BusinessType.WA_LIMITED_LIABILITY_PARTNERSHIP, businessSearchCriteria);
WA_LIMITED_LIABILITY_PARTNERSHIP._read();

const WA_LIMITED_PARTNERSHIP = new CorporationBasicRawStream(100, 1, 1, BusinessType.WA_LIMITED_PARTNERSHIP, businessSearchCriteria);
WA_LIMITED_PARTNERSHIP._read();

const WA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY = new CorporationBasicRawStream(100, 1, 1, BusinessType.WA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY, businessSearchCriteria);
WA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY._read();

const WA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP = new CorporationBasicRawStream(100, 1, 1, BusinessType.WA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP, businessSearchCriteria);
WA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP._read();

const WA_PROFESSIONAL_SERVICE_CORPORATION = new CorporationBasicRawStream(100, 1, 1, BusinessType.WA_PROFESSIONAL_SERVICE_CORPORATION, businessSearchCriteria);
WA_PROFESSIONAL_SERVICE_CORPORATION._read();

const WA_PROFIT_CORPORATION = new CorporationBasicRawStream(100, 1, 1, BusinessType.WA_PROFIT_CORPORATION, businessSearchCriteria);
WA_PROFIT_CORPORATION._read();

// fetch annual report in text
fetchAnnualReport()

