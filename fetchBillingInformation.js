var { getHttp } = require('./httpService');

async function  fetchFilingInformation(BusinessID) {
    var fillingInfoEndpoint = `https://cfda.sos.wa.gov/api/BusinessSearch/GetBusinessFilingList?IsOnline=true&businessId=${BusinessID}`;
    console.log(notice('Filing information', fillingInfoEndpoint));
    const data = await getHttp(fillingInfoEndpoint);
    return data
}

module.exports = fetchFilingInformation;