const fs = require('fs')
import  logger  from './winston';
const moment = require('moment')
import path from 'path';


 const ConvertToCSV = (result: any, searchEntity: any) =>
  new Promise(async (resolve, reject) => {
    try {
   let keywordsPath = path.resolve(
     './csv-output',
     `${searchEntity}-${moment().format("YYYY-MM-DD")}.csv`
   );
   logger.log({
     level: 'debug',
     message: keywordsPath,
   })
      if (!fs.existsSync(keywordsPath)) {
        const csvHeader =
        'Business Name,UBI,Search Term,Business Status,Nature of Business,Principal Office Email,Principal Office Phone,Principal Office Street Address (1),Principal Office Street Address (2),Principal Office City,Principal Office State,Principal Office Zip,Principal Office Address Full,Principal Office Mailing Street Address (1),Principal Office Mailing Street Address (2),Principal Office Mailing City,Principal Office Mailing State,Principal Office Mailing Street Zip,Principal Office Mailing Address Full,Business Expiration Date,Business Formation Date,Governor First name,Governor Last Name,Governor Type,Registered Agent First Name,Registered Agent Last Name,Registered Agent Mailing Address,Registered Agent Email,Return Address for Filing Attention First Name,Return Address for Filing Attention Last Name,Return Address for Filing Attention Email,Return Address Filing Mailing Street Address (1),Return Address Filing Mailing Street Address (2),Return Address Filing Mailing City,Return Address Filing Mailing State,Return Address Filing Mailing Zip,Authorized Person Signer Title,Authorized Person Signer First Name,Authorized Person Signer Last Name,Authorized Person Type,Last Filing Date,Business Keywords \r\n'
        fs.writeFileSync(keywordsPath, csvHeader);
      }

      const csvLine = ConvertCSVNq(result)
      fs.appendFileSync(keywordsPath, csvLine);
      logger.log({
        level: 'debug',
        message: 'csv updated successfully'
      })
      resolve(true);
    } catch (error) {
      logger.log({
        level: "error",
        message: `saveToCsv Error: ${error}`,
      });

      reject(error);
    }
  });


function ConvertCSVNq(objArray: any) {
  let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  let str = '', str2  = '', header = '';    
  for (let i = 0; i < array.length; i++) {
      let line = '';
      for (let index in array[i]) {
          if (line != '') line += ','
          if (header != '') header += ','
          line += `${array[i][index]}`;
          header += `"${index}"`;
      }
      str += `${line}` + '\r\n';
  } 
  return str
}

function ConvertCSV(objArray: any) {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '', str2  = '', header = '';    
    for (let i = 0; i < array.length; i++) {
        let line = '';
        for (let index in array[i]) {
            if (line != '') line += ', '
            if (header != '') header += ', '
            line += `${array[i][index]}`;
            header += `"${index}"`;
        }
        str += `${line}` + '\r\n';
    } 
    return str
}

export const testJsonCSVNq = (result: any, keyword: any) =>
  new Promise(async (resolve, reject) => {
    try {
      let testKeywordsPath = path.resolve(
        './csv-output-wq-test',
        `${keyword}-${moment().format("YYYY-MM-DD")}.csv`
      );
      logger.log({
        level: 'debug',
        message: testKeywordsPath,
      })
         if (!fs.existsSync(testKeywordsPath)) {
           const csvHeader =
           'Business Name,UBI,Search Term,Business Status,Nature of Business,Principal Office Email,Principal Office Phone,Principal Office Street Address (1),Principal Office Street Address (2),Principal Office City,Principal Office State,Principal Office Zip,Principal Office Address Full,Principal Office Mailing Street Address (1),Principal Office Mailing Street Address (2),Principal Office Mailing City,Principal Office Mailing State,Principal Office Mailing Street Zip,Principal Office Mailing Address Full,Business Expiration Date,Business Formation Date,Governor First name,Governor Last Name,Governor Type,Registered Agent First Name,Registered Agent Last Name,Registered Agent Mailing Address,Registered Agent Email,Return Address for Filing Attention First Name,Return Address for Filing Attention Last Name,Return Address for Filing Attention Email,Return Address Filing Mailing Street Address (1),Return Address Filing Mailing Street Address (2),Return Address Filing Mailing City,Return Address Filing Mailing State,Return Address Filing Mailing Zip,Authorized Person Signer Title,Authorized Person Signer First Name,Authorized Person Signer Last Name,Authorized Person Type,Last Filing Date,Business Keywords \r\n'
           fs.writeFileSync(testKeywordsPath, csvHeader);
         }
   
         const csvLine = ConvertCSVNq(result)
         fs.appendFileSync(testKeywordsPath, csvLine);
         logger.log({
           level: 'debug',
           message: 'csv updated successfully'
         })
         resolve(true);
       } catch (error) {
         logger.log({
           level: "error",
           message: `saveToCsv Error: ${error}`,
         });
   
         reject(error);
       }
  });

export const testJsonCSV = (result: any, keyword: any) =>
  new Promise(async (resolve, reject) => {
    try {
      let testKeywordsPath = path.resolve(
        './csv-output-test',
        `${keyword}-${moment().format("YYYY-MM-DD")}.csv`
      );
      logger.log({
        level: 'debug',
        message: testKeywordsPath,
      })
         if (!fs.existsSync(testKeywordsPath)) {
           const csvHeader =
           'Business Name,UBI,Search Term,Business Status,Nature of Business,Principal Office Email,Principal Office Phone,Principal Office Street Address (1),Principal Office Street Address (2),Principal Office City,Principal Office State,Principal Office Zip,Principal Office Address Full,Principal Office Mailing Street Address (1),Principal Office Mailing Street Address (2),Principal Office Mailing City,Principal Office Mailing State,Principal Office Mailing Street Zip,Principal Office Mailing Address Full,Business Expiration Date,Business Formation Date,Governor First name,Governor Last Name,Governor Type,Registered Agent First Name,Registered Agent Last Name,Registered Agent Mailing Address,Registered Agent Email,Return Address for Filing Attention First Name,Return Address for Filing Attention Last Name,Return Address for Filing Attention Email,Return Address Filing Mailing Street Address (1),Return Address Filing Mailing Street Address (2),Return Address Filing Mailing City,Return Address Filing Mailing State,Return Address Filing Mailing Zip,Authorized Person Signer Title,Authorized Person Signer First Name,Authorized Person Signer Last Name,Authorized Person Type,Last Filing Date,Business Keywords \r\n'
           fs.writeFileSync(testKeywordsPath, csvHeader);
         }
   
         const csvLine = ConvertCSV(result)
         fs.appendFileSync(testKeywordsPath, csvLine);
         logger.log({
           level: 'debug',
           message: 'csv updated successfully'
         })
         resolve(true);
       } catch (error) {
         logger.log({
           level: "error",
           message: `saveToCsv Error: ${error}`,
         });
   
         reject(error);
       }
  });

export const jsonCSV = (result: any, keyword: any) =>
  new Promise(async (resolve, reject) => {
    try {
   let keywordsPath = path.resolve(
     './csv-output',
     `${keyword}-${moment().format("YYYY-MM-DD")}.csv`
   );
   logger.log({
     level: 'debug',
     message: keywordsPath,
   })
      if (!fs.existsSync(keywordsPath)) {
        const csvHeader =
        'Business Name,UBI,Search Term,Business Status,Nature of Business,Principal Office Email,Principal Office Phone,Principal Office Street Address (1),Principal Office Street Address (2),Principal Office City,Principal Office State,Principal Office Zip,Principal Office Address Full,Principal Office Mailing Street Address (1),Principal Office Mailing Street Address (2),Principal Office Mailing City,Principal Office Mailing State,Principal Office Mailing Street Zip,Principal Office Mailing Address Full,Business Expiration Date,Business Formation Date,Governor First name,Governor Last Name,Governor Type,Registered Agent First Name,Registered Agent Last Name,Registered Agent Mailing Address,Registered Agent Email,Return Address for Filing Attention First Name,Return Address for Filing Attention Last Name,Return Address for Filing Attention Email,Return Address Filing Mailing Street Address (1),Return Address Filing Mailing Street Address (2),Return Address Filing Mailing City,Return Address Filing Mailing State,Return Address Filing Mailing Zip,Authorized Person Signer Title,Authorized Person Signer First Name,Authorized Person Signer Last Name,Authorized Person Type,Last Filing Date,Business Keywords \r\n'
          fs.writeFileSync(keywordsPath, csvHeader);
      }

      const csvLine = ConvertCSVNq(result)
      fs.appendFileSync(keywordsPath, csvLine);
      logger.log({
        level: 'debug',
        message: 'csv updated successfully'
      })
      resolve(true);
    } catch (error) {
      logger.log({
        level: "error",
        message: `saveToCsv Error: ${error}`,
      });

      reject(error);
    }
  });

  export const jsonCSVNq = (result: any, keyword: any) =>
  new Promise(async (resolve, reject) => {
    try {
      let keywordsPath = path.resolve(
        './csv-output',
        `${keyword}-${moment().format("YYYY-MM-DD")}.csv`
      );
      logger.log({
        level: 'debug',
        message: keywordsPath,
      })
         if (!fs.existsSync(keywordsPath)) {
           const csvHeader =
           'Business Name,UBI,Search Term,Business Status,Nature of Business,Principal Office Email,Principal Office Phone,Principal Office Street Address (1),Principal Office Street Address (2),Principal Office City,Principal Office State,Principal Office Zip,Principal Office Address Full,Principal Office Mailing Street Address (1),Principal Office Mailing Street Address (2),Principal Office Mailing City,Principal Office Mailing State,Principal Office Mailing Street Zip,Principal Office Mailing Address Full,Business Expiration Date,Business Formation Date,Governor First name,Governor Last Name,Governor Type,Registered Agent First Name,Registered Agent Last Name,Registered Agent Mailing Address,Registered Agent Email,Return Address for Filing Attention First Name,Return Address for Filing Attention Last Name,Return Address for Filing Attention Email,Return Address Filing Mailing Street Address (1),Return Address Filing Mailing Street Address (2),Return Address Filing Mailing City,Return Address Filing Mailing State,Return Address Filing Mailing Zip,Authorized Person Signer Title,Authorized Person Signer First Name,Authorized Person Signer Last Name,Authorized Person Type,Last Filing Date,Business Keywords \r\n'
           fs.writeFileSync(keywordsPath, csvHeader);
         }
   
         const csvLine = ConvertCSVNq(result)
         fs.appendFileSync(keywordsPath, csvLine);
         logger.log({
           level: 'debug',
           message: 'csv updated successfully'
         })
         resolve(true);
       } catch (error) {
         logger.log({
           level: "error",
           message: `saveToCsv Error: ${error}`,
         });
   
         reject(error);
       }
  });

export default ConvertToCSV