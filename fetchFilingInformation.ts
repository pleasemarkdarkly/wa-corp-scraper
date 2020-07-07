var { getHttp } = require('./httpService');
import  logger  from './config/winston';

async function  fetchFilingInformation(BusinessID: string) {
    var fillingInfoEndpoint = `https://cfda.sos.wa.gov/api/BusinessSearch/GetBusinessFilingList?IsOnline=true&businessId=${BusinessID}`;
    logger.log({
        level: 'info',
        message: `Filing information (${BusinessID}) : , ${fillingInfoEndpoint}`
    });
    const data = await getHttp(fillingInfoEndpoint);
    return data
}

export default fetchFilingInformation;