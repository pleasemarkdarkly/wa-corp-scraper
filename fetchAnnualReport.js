var { annualPost } = require("./httpService");
const pdf = require("pdf-parse");
const annualSearchCriteria = require('./annualSearchCriteria')

  var annualReportEndpoint =  
  "https://cfda.sos.wa.gov/api/Common/DownloadOnlineFilesByNumber?fileName=Certificates\\2020\\05\\0013525549_OnlineReport.pdf&CorrespondenceFileName=0013525549_OnlineReport.pdf&DocumentTypeId=4"

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


async function fetchAnnualReport() {
  console.time("Time-taken-to-fetch-annual-report")
  console.log("fetch the annual report of designated business type");
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
       newstr_one=JSON.parse(newstr_one)
      
      str_two = properties[1].replace(/.$/,' "} ')
      backstr_two = str_two.replace('you answered \"yes\"',"n")
      newstr_two = backstr_two.replace(/\r?\n|\r/g, "")
     newstr_two=JSON.parse(newstr_two)

     str_three = properties[2].replace(/.$/,' "} ')
     backstr_three = str_three.replace('you answered \"yes\"',"you answered yes")
     newstr_three = backstr_three.replace(/\r?\n|\r/g, "")
    newstr_three=JSON.parse(newstr_three)
    // console.log(newstr_one, newstr_two, newstr_three);
    
      const report = { 
        name: newstr_one['6'],
        type: newstr_one['16'],
        status: newstr_one['21'],
        ubi: newstr_one['11'],
        principal_office: newstr_two['29'],
        registered_agent_name: newstr_two['93'],
        registered_agent_consent:  `${newstr_one['84']} ${newstr_one['85']}`,
        registered_agent_mailing_address: `${newstr_one['31']} ${newstr_one['32']} ${newstr_one['33']}`,
        date_filed: newstr_one['78'],
        principal_office_phone: newstr_two['17'],
        principal_office_email: newstr_two['23'], 
        principal_office_street_address: newstr_one['26'],
        governor_first_name: newstr_two['107'],
        governor_last_name: newstr_two['108'],
        nature_of_business : newstr_one['60'],       
        return_address_for_filing: `${newstr_three['37']} ${newstr_three['38']} ${newstr_three['39']}`,
        return_address_attention: `${newstr_three['37']} ${newstr_three['38']} ${newstr_three['39']}`,
        signer_last_name: newstr_three['75'],
        signer_first_name: newstr_three['70'],
        signer_title: newstr_three['86'],
        initial_report_work_order: newstr_three['95'],
        initial_report_received_date: newstr_one['101'],
        initial_report_amount: newstr_three['99'],
      }
      console.log(report);
      return report
  });
}

module.exports = fetchAnnualReport;
