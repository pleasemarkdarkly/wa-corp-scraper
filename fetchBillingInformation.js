var { getHttp } = require('./httpService')
var fillingInfoEndpoint = 'https://cfda.sos.wa.gov/api/BusinessSearch/GetBusinessFilingList?IsOnline=true&businessId=557070'


async function  fetchFillingInformation() {
    console.log('attempting to get %j', fillingInfoEndpoint);
    const data =   await getHttp(fillingInfoEndpoint)
    console.log(data);
}

module.exports = fetchFillingInformation