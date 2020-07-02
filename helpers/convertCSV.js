const fs = require('fs')
const moment = require('moment')

function ConvertToCSV(objArray, id) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '', str2  = '', header = '';
    
    for (var i = 0; i < array.length; i++) {
        let line = '';
        for (var index in array[i]) {
            if (line != '') line += ','
            if (header != '') header += ' '

            line += `${array[i][index]}`;
            header += index;
        }

        str += line + '\r\n';
    } 
    str2 += header + '\r\n';
   
        const file = fs.createWriteStream(`./csv-output/${moment().format('MM-DD-YYYY HH-mm')}.csv`);
        file.write(str2);
        file.write(str);
        file.end();
    return str;
}

module.exports = ConvertToCSV