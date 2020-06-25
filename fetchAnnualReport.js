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
     backstr_three = str_three.replace('you answered \"yes\"',"n")
     newstr_three = backstr_three.replace(/\r?\n|\r/g, "")
    newstr_three=JSON.parse(newstr_three)
      const report = { 
         "Universal Business Identifier": newstr_one['6'],
        "Business Name": newstr_one['11'],
        "Business Type": newstr_one['16'],
        "Filling Date": newstr_one['78'],
       "Principal Office Phone": newstr_two['17'],
        "Principal Office Email": newstr_two['23'], 
        "Governor First Name" : newstr_two['107'],
        "Governor Last Name": newstr_two['108'],
        "Nature of Business" : newstr_one['60'],
        'Initial Report': newstr_one['101']
      }
      console.log(report);
      return report
  });
}

module.exports = fetchAnnualReport;
