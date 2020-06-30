var { getHttp } = require('./httpService');
var clc = require("cli-color");
var info = clc.white.bold;
var error = clc.red.bold;
var warn = clc.yellow;
var notice = clc.blue;

async function  fetchFilingInformation(BusinessID) {
    // console.time("Time-taken");
    var fillingInfoEndpoint = `https://cfda.sos.wa.gov/api/BusinessSearch/GetBusinessFilingList?IsOnline=true&businessId=${BusinessID}`;
    console.log(notice('Filing information', fillingInfoEndpoint));
    // console.time(info("Time-taken"))
    const data = await getHttp(fillingInfoEndpoint);
    return data
}

module.exports = fetchFilingInformation;