"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const moment = require('moment');
/*
TODO: The header of the CSV is to look like the below general order.

"UBI", "Business Name", "Business Type", "Business Status", "Nature of Business", "Principal Office Email", "Principal Office Phone", "Principal Office Street Address (1)", "Principal Office Street Address (2)", "Principal Office City", "Principal Office State", "Principal Office Zip", "Principal Office Address Full", "Principal Office Mailing Street Address (1)", "Principal Office Mailing Street Address (2)", "Principal Office Mailing City", "Principal Office Mailing State", "Principal Office Mailing Street Zip", "Principal Office Mailing Address Full", "Business Expiration Date", "Business Formation Date", Governor First name", "Governor Last Name", "Governor Type", "Registered Agent First Name", "Registered Agent Last Name", "Registered Agent Mailing Address", "Registered Agent Email", "Return Address for Filing Attention First Name", "Return Address for Filing Attention Last Name", "Return Address for Filing Attention Email", "Return Address Filing Mailing Street Address (1)", "Return Address Filing Mailing Street Address (2", "Return Address Filing Mailing City", "Return Address Filing Mailing State", "Return Address Filing Mailing Zip", "Authorized Person Signer Title", "Authorized Person Signer First Name", "Authorized Person Signer Last Name", "Authorized Person Type", "Last Filing Date", "Business Keywords"

TODO: Each record above is to be printed in the following manner. This is an incomplete and out of order example, but illustrative of the general format.

"#WETHEPLANET LLC", "604 603 466", "Any Lawful Purpose", "BUSINESS ACTIVITIES PROMOTING AWARENESS OF THE NEED FOR DISRUPTIVE INNOVATION, AND THE DEVELOPMENT AND CREATION OF INITIATIVES THAT DEFY THE TRADITIONAL MODEL BY ACCELERATING THE RATE AT WHICH ONE MASTERS SKILLS INVOLVING SUSTAINABILITY, EXPONENTIAL TECHNOLOGIES, ENTREPRENEURSHIP, THE ENVIRONMENT, EDUCATION, SPACE EXPLORATION, DESIGN, GOVERNANCE, MUSIC, GLOBAL HEALTH, MEDIA, JOURNALISM, AND VENTURE GROWTH STRATEGY.","LAURA","MURANAKA","4155183716","LAURA@NOV.US","LAURA MURANAKA","undefined",

*/
function ConvertToCSV(objArray, BusinessTypeID, searchEntity) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '', str2 = '', header = '';
    for (var i = 0; i < array.length; i++) {
        let line = '';
        for (var index in array[i]) {
            if (line != '')
                line += ', ';
            if (header != '')
                header += ', ';
            line += `${array[i][index]}`;
            header += `"${index}"`;
        }
        str += `${line}` + '\r\n';
    }
    // str2 += `${header}` + '\r\n';
    str2 = `"Business Name", "UBI", "Search Term", "Business Status", "Nature of Business", "Principal Office Email", "Principal Office Phone", "Principal Office Street Address (1)", "Principal Office Street Address (2)", "Principal Office City", "Principal Office State", "Principal Office Zip", "Principal Office Address Full", "Principal Office Mailing Street Address (1)", "Principal Office Mailing Street Address (2)", "Principal Office Mailing City", "Principal Office Mailing State", "Principal Office Mailing Street Zip", "Principal Office Mailing Address Full", "Business Expiration Date", "Business Formation Date", Governor First name", "Governor Last Name", "Governor Type", "Registered Agent First Name", "Registered Agent Last Name", "Registered Agent Mailing Address", "Registered Agent Email", "Return Address for Filing Attention First Name", "Return Address for Filing Attention Last Name", "Return Address for Filing Attention Email", "Return Address Filing Mailing Street Address (1)", "Return Address Filing Mailing Street Address (2", "Return Address Filing Mailing City", "Return Address Filing Mailing State", "Return Address Filing Mailing Zip", "Authorized Person Signer Title", "Authorized Person Signer First Name", "Authorized Person Signer Last Name", "Authorized Person Type", "Last Filing Date", "Business Keywords"
   `;
    // TODO: Add Business Type code to filename, i.e. 86 - MM-DD...
    const file = fs.createWriteStream(`./searches/${searchEntity} - ${BusinessTypeID}-${moment().format('MM-DD-YYYY HH-mm')}.csv`);
    file.write(str2);
    file.write(str);
    file.end();
    return str;
}
exports.default = ConvertToCSV;
//# sourceMappingURL=convertCSV.js.map