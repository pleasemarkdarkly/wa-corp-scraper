var {
  postHttp
} = require('./httpService');

var clc = require("cli-color");

var info = clc.white.bold;
var error = clc.red.bold;
var warn = clc.yellow;
var notice = clc.blue;

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
  console.log(notice('Attempting to get %j.', fetchAnnualReportCriteriaEndpoint));
  // console.time("Time-taken");
  const data = await postHttp(fetchAnnualReportCriteriaEndpoint, fetchAnnualReportCriteriaData);
    return data;
}

module.exports = fetchAnnualReportCriteria;