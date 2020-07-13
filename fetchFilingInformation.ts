var { getHttp } = require('./httpService');
import  logger  from './common/winston';

async function  fetchFilingInformation(businessId: any) {
    var fillingInfoEndpoint = `https://cfda.sos.wa.gov/api/BusinessSearch/GetBusinessFilingList?IsOnline=true&businessId=${businessId}`;
    logger.log({
        level: 'debug',
        message: `Filing information (${businessId}) : , ${fillingInfoEndpoint}`
    });
    const data = await getHttp(fillingInfoEndpoint);
    return data
}

export default fetchFilingInformation;