var { getHttp } = require('./httpService');
import  logger  from './common/winston';

/// TODO: BusinessID => BusinessId NAMING CONVENTIONS!!!
async function  fetchFilingInformation(BusinessID: string) {
    var fillingInfoEndpoint = `https://cfda.sos.wa.gov/api/BusinessSearch/GetBusinessFilingList?IsOnline=true&businessId=${BusinessID}`;
    logger.log({
        level: 'debug',
        message: `Filing information (${BusinessID}) : , ${fillingInfoEndpoint}`
    });
    const data = await getHttp(fillingInfoEndpoint);
    return data
}

export default fetchFilingInformation;