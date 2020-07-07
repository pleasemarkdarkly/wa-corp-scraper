var { postHttp } = require("./httpService");
import  logger  from './common/winston';

var fetchAnnualReportCriteriaEndpoint =
  "https://cfda.sos.wa.gov/api/Common/GetTransactionDocumentsList";
  // is filing number a class? or ID a class
async function fetchAnnualReportCriteria(fillingNumber: string, id: string) {
  var fetchAnnualReportCriteriaData = {
    FilingNumber: fillingNumber,
    ID: id,
  };
  
  logger.log({
    level: 'debug',
    message: `Annual report: ${fetchAnnualReportCriteriaEndpoint}`
  });

  const data = await postHttp(
    fetchAnnualReportCriteriaEndpoint,
    fetchAnnualReportCriteriaData
  );
  return data;
}

export default fetchAnnualReportCriteria;
