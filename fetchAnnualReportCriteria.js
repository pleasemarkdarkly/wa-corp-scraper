var {
  postHttp
} = require('./httpService');
const querystring = require("querystring");


var fetchAnnualReportCriteriaEndpoint = "https://cfda.sos.wa.gov/api/Common/GetTransactionDocumentsList"

// var fetchAnnualReportCriteriaData = {
//   "ID": "557070",
//   "FilingNumber": "13674375"
// };

async function fetchAnnualReportCriteria(FilingNumber, ID) {
  var fetchAnnualReportCriteriaData = {
      FilingNumber,
      ID
    };
  console.log('attempting to get %j', fetchAnnualReportCriteriaEndpoint);
  console.time("time-taken")
  const data = await postHttp(fetchAnnualReportCriteriaEndpoint, fetchAnnualReportCriteriaData);
    return data;
}

module.exports = fetchAnnualReportCriteria;