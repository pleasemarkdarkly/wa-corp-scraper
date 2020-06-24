var { getHttp } = require('./httpService');
var BusinessInfoEndpoint = 'https://cfda.sos.wa.gov/api/BusinessSearch/BusinessInformation?businessID=1206337';

async function  fetchBusinessInformation() {
   console.log('attempting to get %j', BusinessInfoEndpoint);
   const data =  await getHttp(BusinessInfoEndpoint);
   console.log(data);
}

module.exports = fetchBusinessInformation;