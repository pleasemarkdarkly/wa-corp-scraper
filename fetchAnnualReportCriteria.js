var {
  postHttp
} = require('./httpService');

var fetchAnnualReportCriteriaEndpoint = "https://cfda.sos.wa.gov/api/Common/GetTransactionDocumentsList"

var fetchAnnualReportCriteriaData = querystring.stringify({
  "ID": "11681672",
  "FilingNumber": "13438857"
});

async function fetchAnnualReportCriteria() {
  console.log('attempting to get %j', fetchAnnualReportCriteriaEndpoint);
  const data = await postHttp(fetchAnnualReportCriteriaEndpoint, fetchAnnualReportCriteriaData);
  console.log(data);
}

module.exports = fetchAnnualReportCriteria;