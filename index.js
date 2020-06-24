
  var CorporationBasicRawStream = require('./CorporationBasicRawStreams')
  var businessSearchcriteria = require('./businessSearchcriteria')
  var fetchAnnualReport = require('./fetchAnnualReport')


//   enum BusinessType {
//     WA_LIMITED_LIABILITY_CORPORATION = 65,
//     WA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP = 67,
//     WA_LIMITED_LIABILITY_PARTNERSHIP = 68,
//     WA_LIMITED_PARTNERSHIP = 69,
//     WA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY = 79,
//     WA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP = 76,
//     WA_PROFESSIONAL_SERVICE_CORPORATION = 85,
//     WA_PROFIT_CORPORATION = 86,
// }

  // CorporationBasicRawStream(PageCount, PageID, concurrency, BusinessTypeID,  criteria  )
  // PageCount = The number of business to fetch at a time
  // PageID = The starting page
  // concurrency = The number of pages to load more
  // BusinessTypeID = The business type number
  // criteria = the remaining business search criteria
  
  

//  WA_LIMITED_LIABILITY_CORPORATION = 65 
 const WA_LIMITED_LIABILITY_CORPORATION = new CorporationBasicRawStream(100, 1, 1, 65, businessSearchcriteria )

//  WA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP = 67,
 const WA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP = new CorporationBasicRawStream(100, 1, 1, 67, businessSearchcriteria )

 //     WA_LIMITED_LIABILITY_PARTNERSHIP = 68,
 const WA_LIMITED_LIABILITY_PARTNERSHIP = new CorporationBasicRawStream(100, 1, 1, 68, businessSearchcriteria )

 //     WA_LIMITED_PARTNERSHIP = 69,
 const WA_LIMITED_PARTNERSHIP = new CorporationBasicRawStream(100, 1, 1, 69, businessSearchcriteria )

//     WA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY = 79,
const WA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY = new CorporationBasicRawStream(100, 1, 1, 79, businessSearchcriteria )

//     WA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP = 76,
const WA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP = new CorporationBasicRawStream(100, 1, 1, 76, businessSearchcriteria )

//     WA_PROFESSIONAL_SERVICE_CORPORATION = 85,
const WA_PROFESSIONAL_SERVICE_CORPORATION = new CorporationBasicRawStream(100, 1, 1, 85, businessSearchcriteria )

//     WA_PROFIT_CORPORATION = 86,
const WA_PROFIT_CORPORATION = new CorporationBasicRawStream(100, 1, 1, 86, businessSearchcriteria )


// FETCH 100 FIRST AND 100 LAST OF ALL BUSINESS TYPES
     WA_LIMITED_LIABILITY_CORPORATION._read()
 //     WA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP._read()
 //     WA_LIMITED_LIABILITY_PARTNERSHIP._read()
 //     WA_LIMITED_PARTNERSHIP._read()
 //     WA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY._read()
 //     WA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP._read()
 //     WA_PROFESSIONAL_SERVICE_CORPORATION._read()
    //  WA_PROFIT_CORPORATION._read()

// fetch annual report in text
// fetchAnnualReport()

