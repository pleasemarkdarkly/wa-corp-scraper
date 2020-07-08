const fs = require('fs')
const moment = require('moment')

function ConvertToCSV(objArray: any, BusinessTypeId: string, searchEntity: string) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '', str2  = '', header = '';    
    for (var i = 0; i < array.length; i++) {
        let line = '';
        for (var index in array[i]) {
            if (line != '') line += ', '
            if (header != '') header += ', '
            line += `${array[i][index]}`;
            header += `"${index}"`;
        }
        str += `${line}` + '\r\n';
    } 
   str2 = '"Business Name", "UBI", "Search Term", "Business Status", "Nature of Business", "Principal Office Email", "Principal Office Phone", "Principal Office Street Address (1)", "Principal Office Street Address (2)", "Principal Office City", "Principal Office State", "Principal Office Zip", "Principal Office Address Full", "Principal Office Mailing Street Address (1)", "Principal Office Mailing Street Address (2)", "Principal Office Mailing City", "Principal Office Mailing State", "Principal Office Mailing Street Zip", "Principal Office Mailing Address Full", "Business Expiration Date", "Business Formation Date", Governor First name", "Governor Last Name", "Governor Type", "Registered Agent First Name", "Registered Agent Last Name", "Registered Agent Mailing Address", "Registered Agent Email", "Return Address for Filing Attention First Name", "Return Address for Filing Attention Last Name", "Return Address for Filing Attention Email", "Return Address Filing Mailing Street Address (1)", "Return Address Filing Mailing Street Address (2", "Return Address Filing Mailing City", "Return Address Filing Mailing State", "Return Address Filing Mailing Zip", "Authorized Person Signer Title", "Authorized Person Signer First Name", "Authorized Person Signer Last Name", "Authorized Person Type", "Last Filing Date", "Business Keywords" '+ '\r\n'
        // ${BusinessTypeId}
        const file = fs.createWriteStream(`./csv-output/${searchEntity}-${moment().format('MM-DD-YYYY-H-M-S')}.csv`);
        file.write(str2);
        file.write(str.trim());
        file.end();
    return str;
}

export function convertJsonToCSV(objArray: any, outputFilename: string) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '', str2  = '', header = '';    
    for (var i = 0; i < array.length; i++) {
        let line = '';
        for (var index in array[i]) {
            if (line != '') line += ', '
            if (header != '') header += ', '
            line += `${array[i][index]}`;
            header += `"${index}"`;
        }
        str += `${line}` + '\r\n';
    } 
   str2 = '"Business Name", "UBI", "Search Term", "Business Status", "Nature of Business", "Principal Office Email", "Principal Office Phone", "Principal Office Street Address (1)", "Principal Office Street Address (2)", "Principal Office City", "Principal Office State", "Principal Office Zip", "Principal Office Address Full", "Principal Office Mailing Street Address (1)", "Principal Office Mailing Street Address (2)", "Principal Office Mailing City", "Principal Office Mailing State", "Principal Office Mailing Street Zip", "Principal Office Mailing Address Full", "Business Expiration Date", "Business Formation Date", Governor First name", "Governor Last Name", "Governor Type", "Registered Agent First Name", "Registered Agent Last Name", "Registered Agent Mailing Address", "Registered Agent Email", "Return Address for Filing Attention First Name", "Return Address for Filing Attention Last Name", "Return Address for Filing Attention Email", "Return Address Filing Mailing Street Address (1)", "Return Address Filing Mailing Street Address (2", "Return Address Filing Mailing City", "Return Address Filing Mailing State", "Return Address Filing Mailing Zip", "Authorized Person Signer Title", "Authorized Person Signer First Name", "Authorized Person Signer Last Name", "Authorized Person Type", "Last Filing Date", "Business Keywords" '+ '\r\n'
        const file = fs.createWriteStream(`./csv-output/${outputFilename}-${moment().format('MM-DD-YYYY-H-M-S')}.csv`);
        file.write(str2);
        file.write(str.trim());
        file.end();
    return str;
}


export default ConvertToCSV