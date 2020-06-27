var { getHttp } = require('./httpService');

async function  fetchFillingInformation(BusinessID) {
    var fillingInfoEndpoint = `https://cfda.sos.wa.gov/api/BusinessSearch/GetBusinessFilingList?IsOnline=true&businessId=${BusinessID}`;
    console.log('attempting to get %j', fillingInfoEndpoint);
    console.time("time-taken")
    const data = await getHttp(fillingInfoEndpoint);
    return data
}

module.exports = fetchFillingInformation;