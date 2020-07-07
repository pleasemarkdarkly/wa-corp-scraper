var { getHttp } = require('./httpService');

async function  fetchFilingInformation(BusinessID: string) {
    var fillingInfoEndpoint = `https://cfda.sos.wa.gov/api/BusinessSearch/GetBusinessFilingList?IsOnline=true&businessId=${BusinessID}`;
    console.log('Filing information (' + BusinessID + '): ', fillingInfoEndpoint);
    const data = await getHttp(fillingInfoEndpoint);
    return data
}

export default fetchFilingInformation;