var { getHttp } = require('./httpService')


var BussinessInfoEndpoint = 'https://cfda.sos.wa.gov/api/BusinessSearch/BusinessInformation?businessID=1206337'


 async function  fetchBusinessInformation() {
    console.log('attempting to get %j', BussinessInfoEndpoint);
    const data =  await getHttp(BussinessInfoEndpoint)
    console.log(data);
 }

 module.exports = fetchBusinessInformation