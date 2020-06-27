var { annualPost } = require("./httpService");
const pdf = require("pdf-parse");
const annualSearchCriteria = require('./annualSearchCriteria')
const querystring = require('querystring');


  var annualReportEndpoint =  
  "https://cfda.sos.wa.gov/api/Common/DownloadOnlineFilesByNumber?fileName=Certificates\\2020\\04\\0013415175_OnlineReport.pdf&CorrespondenceFileName=0013415175_OnlineReport.pdf&DocumentTypeId=4"

function render_page(pageData) {
  let render_options = {
      normalizeWhitespace: false,
      disableCombineTextItems: false
  }
  return pageData.getTextContent(render_options)
  .then(function(textContent) {
        var obj = {}, txt = '', txtArr = [], mtx
        textContent.items.forEach(function(property, i) {
          obj[i]= property.str
        });        
      return JSON.stringify(obj)
  });
 
}

let options = {
  pagerender: render_page
}


async function fetchAnnualReport(annualSearchCriteria) {
  console.time("Time-taken-to-fetch-annual-report")
  console.log("fetch the annual report of designated business type");

 
  const FileLocationCorrespondence = annualSearchCriteria.FileLocationCorrespondence;
  const CorrespondenceFileName = annualSearchCriteria.CorrespondenceFileName;
  const DocumentTypeID = annualSearchCriteria.DocumentTypeID;

  console.log(FileLocationCorrespondence, CorrespondenceFileName, );
  
  var annualReportEndpoint = 
  `https://cfda.sos.wa.gov/api/Common/DownloadOnlineFilesByNumber?fileName=${FileLocationCorrespondence}&CorrespondenceFileName=${CorrespondenceFileName}&DocumentTypeId=${DocumentTypeID}`
 
  
  console.log('Attempting to get %j', annualReportEndpoint);

  
  const data = await annualPost(annualReportEndpoint, annualSearchCriteria);
  // console.log("_________________DADADADADAD_________________", data);
  pdf(data, options).then(function (info) {
    console.log("-----------------------------ANNUAL REPORT----------------------");
    let properties, 
        str_one, 
        backstr_one, 
        newstr_one, 
        str_two, 
        backstr_two, 
        newstr_two,
        str_three,
        backstr_three,
        newstr_three;
       properties = info.text.split('}');
       str_one = properties[0].replace(/.$/,' "} ')
       backstr_one = str_one.replace('you answered \"yes\"',"n")
       newstr_one = backstr_one.replace(/\r?\n|\r/g, "")
      //  console.log(newstr_one);

       newstr_one=JSON.parse(newstr_one)
      
      str_two = properties[1].replace(/.$/,' "} ')
      backstr_two = str_two.replace('you answered \"yes\"',"n")
      newstr_two = backstr_two.replace(/\r?\n|\r/g, "")
      // console.log(newstr_two);

     newstr_two=JSON.parse(newstr_two)

     str_three = properties[2].replace(/.$/,' "} ')
     backstr_three = str_three.replace('you answered \"yes\"',"you answered yes")
     newstr_three = backstr_three.replace(/\r?\n|\r/g, "")
    //  console.log(newstr_three);

    newstr_three=JSON.parse(newstr_three)
    // console.log(newstr_one, newstr_two, newstr_three);
    
      const report = { 
        name: newstr_one['6'],
        type: newstr_one['16'],
        status: newstr_one['21'],
        ubi: newstr_one['11'],
        principal_office: newstr_two['33'],
        registered_agent_name: newstr_two['100'],
        registered_agent_consent:  `${newstr_one['68']} ${newstr_one['70']}`,
        registered_agent_mailing_address: ` ${newstr_two['102']} ${newstr_one['103']} ${newstr_one['104']}`,
        date_filed: newstr_one['80'],
        principal_office_phone: newstr_two['17'],
        principal_office_email: newstr_two['23'], 
        principal_office_street_address: `${newstr_one['26']}, ${newstr_one['28']}`,
        governor_first_name: newstr_two['113'],
        governor_last_name: newstr_two['114'],
        nature_of_business : newstr_one['62'],       
        return_address_for_filing: `${newstr_three['37']} ${newstr_three['38']} ${newstr_three['39']}`,
        return_address_attention: `${newstr_three['37']} ${newstr_three['38']} ${newstr_three['39']}`,
        signer_last_name: newstr_three['59'],
        signer_first_name: newstr_three['53'],
        signer_title: newstr_three['70'],
        initial_report_work_order: newstr_three['76'],
        initial_report_received_date: newstr_one['103'],
        initial_report_amount: newstr_one['104'],
      }
      console.log(report);
      return report
  });
}

module.exports = fetchAnnualReport;
