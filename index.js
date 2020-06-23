
  var CorporationBasicRawStream = require('./CorporationBasicRawStreams')
  var businessSearchcriteria = require('./businessSearchcriteria')
  var fetchAnnualReport = require('./fetchAnnualReport')

  // CorporationBasicRawStream(PageCount, PageID, concurrency, criteria  )
  // PageCount = The number of business to fetch at a time
  // PageID = The starting page
  // concurrency = The number of pages to load more
  // criteria = the remaining business search criteria

 const corp = new CorporationBasicRawStream("25", "1", "4", businessSearchcriteria )
corp._read()

// fetch annual report in text
// fetchAnnualReport()

