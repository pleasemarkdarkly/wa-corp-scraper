var { postHttp } = require("./httpService");

var fetchAnnualReportCriteriaEndpoint =
  "https://cfda.sos.wa.gov/api/Common/GetTransactionDocumentsList";
  // is filing number a class? or ID a class
async function fetchAnnualReportCriteria(FilingNumber: string, ID: string) {
  var fetchAnnualReportCriteriaData = {
    FilingNumber,
    ID,
  };
  
  console.log("Annual report ", fetchAnnualReportCriteriaEndpoint);

  const data = await postHttp(
    fetchAnnualReportCriteriaEndpoint,
    fetchAnnualReportCriteriaData
  );
  return data;
}

export default fetchAnnualReportCriteria;
