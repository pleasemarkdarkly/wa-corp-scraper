var {
  annualPost
} = require('./httpService')
const pdf = require('pdf-parse');
const querystring = require('querystring');

var annualReportEnpoint = "https://cfda.sos.wa.gov/api/Common/DownloadOnlineFilesByNumber?fileName=Certificates\\2020\\04\\0013438857_OnlineReport.pdf&CorrespondenceFileName=0013438857_OnlineReport.pdf&DocumentTypeId=4"

var annualReportData = querystring.stringify({
  "DocumentID": "16362324",
  "DocumentTypeID": "4",
  "DocumentTypeName": "ANNUAL REPORT - FULFILLED",
  "FileLocationCorrespondence": "Certificates\\2020\\04\\0013438857_OnlineReport.pdf",
  "CorrespondenceFileName": "0013438857_OnlineReport.pdf",
  "FilingNumber": "0",
  "TransactionID": "0",
  "WorkorderID": "0",
  "BusinessID": "0",
  "TrademarkID": "0",
  "RegistrationNo": "0",
  "IsOnline": "false",
  "FilingDateTime": "2020-04-23T10:48:35",
  "UserName": "",
  "DocumentTable": "BUSINESSCORRESPONDENCE",
  "IsPublicVisible": "false",
  "Source": "ONLINE",
  "NumberOfPages": "0",
  "UncommitedTID": "0",
  "CreatedDate": "0001-01-01T00:00:00",
  "FilerID": "0",
  "UserID": "0",
  "CreatedBy": "0",
  "ModifiedBy": "0",
  "$$hashKey": "object:94",
})

async function fetchAnnualReport() {
  console.log('attempting to get %j', annualReportData);
  const data = await annualPost(annualReportEnpoint, annualReportData)
  console.log(data);
  pdf(data).then(function (info) {
    info.toString("utf8")
    console.log(info.text);
  });
}

module.exports = fetchAnnualReport