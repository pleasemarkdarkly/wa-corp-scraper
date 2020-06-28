var { getHttp } = require('./httpService');
var clc = require("cli-color");
var info = clc.white.bold;
var error = clc.red.bold;
var warn = clc.yellow;
var notice = clc.blue;

var BusinessInfoEndpoint = 'https://cfda.sos.wa.gov/api/BusinessSearch/BusinessInformation?businessID=1206337';

async function  fetchBusinessInformation() {
   console.log(notice('Attempting to get %j', BusinessInfoEndpoint));
   const data =  await getHttp(BusinessInfoEndpoint);
   console.log(data);
}

module.exports = fetchBusinessInformation;