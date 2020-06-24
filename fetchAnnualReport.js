var { annualPost } = require("./httpService");
const pdf = require("pdf-parse");
const querystring = require("querystring");

var annualReportEndpoint =
  "https://cfda.sos.wa.gov/api/Common/DownloadOnlineFilesByNumber?fileName=Certificates\\2020\\04\\0013415175_OnlineReport.pdf&CorrespondenceFileName=0013415175_OnlineReport.pdf&DocumentTypeId=4";

var annualReportData = querystring.stringify({
  DocumentID: "16289888",
  DocumentTypeID: "4",
  DocumentTypeName: "ANNUAL REPORT - FULFILLED",
  FileLocationCorrespondence:
    "Certificates\\2020\\04\\0013438857_OnlineReport.pdf",
  CorrespondenceFileName: "0013438857_OnlineReport.pdf",
  FilingNumber: "0",
  TransactionID: "0",
  WorkorderID: "0",
  BusinessID: "0",
  TrademarkID: "0",
  RegistrationNo: "0",
  IsOnline: "false",
  FilingDateTime: "2020-04-13T14:32:05",
  UserName: "",
  DocumentTable: "BUSINESSCORRESPONDENCE",
  IsPublicVisible: "false",
  Source: "ONLINE",
  NumberOfPages: "0",
  UncommitedTID: "0",
  CreatedDate: "0001-01-01T00:00:00",
  FilerID: "0",
  UserID: "0",
  CreatedBy: "0",
  ModifiedBy: "0",
  $$hashKey: "object:4204",
});

async function fetchAnnualReport() {
  const data = await annualPost(annualReportEndpoint, annualReportData);
  console.log("_________________DADADADADAD_________________", data);
  pdf(data).then(function (info) {
    info.toString("utf8");
    console.log("INFO----------------------", info.text);
  });
}

module.exports = fetchAnnualReport;
