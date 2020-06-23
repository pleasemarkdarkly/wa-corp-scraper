var {
  postHttp
} = require('./httpService')
var fetchAnnualReportCriteriaEnpoint = "https://cfda.sos.wa.gov/api/Common/GetTransactionDocumentsList"

var fetchAnnualReportCriteriaData = querystring.stringify({
  "ID": "11681672",
  "FilingNumber": "13438857"
});

async function fetchAnnualReportCriteria() {
  console.log('attempting to get %j', fetchAnnualReportCriteriaEnpoint);
  const data = await postHttp(fetchAnnualReportCriteriaEnpoint, fetchAnnualReportCriteriaData)
  console.log(data);
}

module.exports = fetchAnnualReportCriteria