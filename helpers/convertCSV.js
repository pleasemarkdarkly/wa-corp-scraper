const fs = require('fs')
const moment = require('moment')
function ConvertToCSV(objArray, id) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';
    
    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }

        str += line + '\r\n';
    }    
        const file = fs.createWriteStream(`./csv-output/${moment().format('MM-DD-YYYY HH-mm')}.csv`);
        file.write(str);
        file.end();
    return str;
}

module.exports = ConvertToCSV