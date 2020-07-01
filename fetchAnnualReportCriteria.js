var {
  postHttp
} = require('./httpService');

var clc = require("cli-color");

var info = clc.white.bold;
var error = clc.red.bold;
var warn = clc.yellow;
var notice = clc.blue;


var fetchAnnualReportCriteriaEndpoint = "https://cfda.sos.wa.gov/api/Common/GetTransactionDocumentsList"
async function fetchAnnualReportCriteria(FilingNumber, ID) {
  var fetchAnnualReportCriteriaData = {
      FilingNumber,
      ID
    };
  console.log(notice('Annual report ', fetchAnnualReportCriteriaEndpoint));
  // console.time("Time-taken");
  const data = await postHttp(fetchAnnualReportCriteriaEndpoint, fetchAnnualReportCriteriaData);
    return data;
}

module.exports = fetchAnnualReportCriteria;