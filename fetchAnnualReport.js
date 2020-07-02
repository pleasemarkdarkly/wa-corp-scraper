var { annualPost } = require("./httpService");
const pdf = require("pdf-parse");

var clc = require("cli-color");

var info = clc.white.bold;
var error = clc.red.bold;
var warn = clc.yellow;
var notice = clc.blue;

var annualReportEndpoint =
  "https://cfda.sos.wa.gov/api/Common/DownloadOnlineFilesByNumber?fileName=Certificates\\2020\\04\\0013415175_OnlineReport.pdf&CorrespondenceFileName=0013415175_OnlineReport.pdf&DocumentTypeId=4";

function render_page(pageData) {
  let render_options = {
    normalizeWhitespace: false,
    disableCombineTextItems: false,
  };
  return pageData.getTextContent(render_options).then(function (textContent) {
    var obj = {},
      txt = "",
      txtArr = [],
      mtx,
      obj2 = {};
    textContent.items.forEach(function (property, i) {
      txt += property.str;
      // obj[i]= property.str
    });
    txt = txt.replace(/     /g, "");
    txt = txt.replace(/    /g, "");
    txt = txt.replace(/   /g, "");
    // txt = txt.replace(/  /g, "")
    txt = txt.split(" ");

    txt.forEach(function (t, i) {
      obj[i] = t;
    });
    // console.log(obj2);
    return JSON.stringify(obj);
  });
}

let options = {
  pagerender: render_page,
};

/*
  TODO: create variable to save stop word extracted business purpose and business name, var keywords;
        https://www.npmjs.com/package/stopword
        each "contact has to have a unique email" so for CSV create contact for each email/individual (governor or signer)
*/

async function fetchAnnualReport(annualSearchCriteria) {
  console.time("Time-taken-to-fetch-annual-report");
  console.log(notice("Fetch the annual report of designated business type"));

  const FileLocationCorrespondence =
    annualSearchCriteria.FileLocationCorrespondence;
  const CorrespondenceFileName = annualSearchCriteria.CorrespondenceFileName;
  const DocumentTypeID = annualSearchCriteria.DocumentTypeID;

  console.log(FileLocationCorrespondence, CorrespondenceFileName);

  var annualReportEndpoint = `https://cfda.sos.wa.gov/api/Common/DownloadOnlineFilesByNumber?fileName=${FileLocationCorrespondence}&CorrespondenceFileName=${CorrespondenceFileName}&DocumentTypeId=${DocumentTypeID}`;

  console.log(notice("Attempting to get %j", annualReportEndpoint));
  console.time("Time-taken-to-fetch-annual-report");
  const data = await annualPost(annualReportEndpoint, annualSearchCriteria);
  pdf(data, options).then(function (info) {
    console.log(
      "-----------------------------ANNUAL REPORT----------------------"
    );
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
    properties = info.text.split("}");
    str_one = properties[0].replace(/.$/, ' "} ');
    backstr_one = str_one.replace('you answered "yes"', "n");
    newstr_one = backstr_one.replace(/\r?\n|\r/g, "");
    //  console.log(newstr_one);

    newstr_one = JSON.parse(newstr_one);

    str_two = properties[1].replace(/.$/, ' "} ');
    backstr_two = str_two.replace('you answered "yes"', "n");
    newstr_two = backstr_two.replace(/\r?\n|\r/g, "");
    // console.log(newstr_two);

    newstr_two = JSON.parse(newstr_two);

    str_three = properties[2].replace(/.$/, ' "} ');
    backstr_three = str_three.replace('you answered "yes"', "you answered yes");
    newstr_three = backstr_three.replace(/\r?\n|\r/g, "");
    //  console.log(newstr_three);

    newstr_three = JSON.parse(newstr_three);
    console.log(newstr_one, newstr_two, newstr_three);
    /*
    TODO: Extract the following (basically all the variables from the annual/initial report)

    "UBI", "Business Name", "Business Type", "Business Status", "Nature of Business", "Principal Office Email", "Principal Office Phone", "Principal Office Street Address (1)", "Principal Office Street Address (2)", "Principal Office City", "Principal Office State", "Principal Office Zip", "Principal Office Address Full", "Principal Office Mailing Street Address (1)", "Principal Office Mailing Street Address (2)", "Principal Office Mailing City", "Principal Office Mailing State", "Principal Office Mailing Street Zip", "Principal Office Mailing Address Full", "Business Expiration Date", "Business Formation Date", Governor First name", "Governor Last Name", "Governor Type", "Registered Agent First Name", "Registered Agent Last Name", "Registered Agent Mailing Address", "Registered Agent Email", "Return Address for Filing Attention First Name", "Return Address for Filing Attention Last Name", "Return Address for Filing Attention Email", "Return Address Filing Mailing Street Address (1)", "Return Address Filing Mailing Street Address (2", "Return Address Filing Mailing City", "Return Address Filing Mailing State", "Return Address Filing Mailing Zip", "Authorized Person Signer Title", "Authorized Person Signer First Name", "Authorized Person Signer Last Name", "Authorized Person Type", "Last Filing Date", "Business Keywords"
*/
    const report = {
      name: `${newstr_one["8"]} ${newstr_one["9"]}`,
      type: `${newstr_one["21"]} ${newstr_one["22"]} ${newstr_one["23"]}`,
      status: newstr_one["28"],
      ubi: `${newstr_one["14"]} ${newstr_one["15"]} ${newstr_one["16"]}`,

      principal_office: newstr_two["33"],
      registered_agent_name: `${newstr_three["49"]} ${newstr_one["54"]}`,
      registered_agent_consent: `${newstr_one["68"]} ${newstr_one["70"]}`,
      registered_agent_mailing_address: `${newstr_one["50"]} ${newstr_one["51"]} ${newstr_one["52"]} ${newstr_one["53"]} ${newstr_one["54"]} ${newstr_one["55"]} ${newstr_one["56"]} ${newstr_one["57"]} ${newstr_one["58"]}`,
      date_filed: newstr_one["117"],
      principal_office_phone: newstr_one["101"],
      principal_office_email: newstr_one["105"],
      principal_office_street_address: `${newstr_one["35"]} ${newstr_one["36"]} ${newstr_one["37"]} ${newstr_one["38"]} ${newstr_one["39"]} ${newstr_one["40"]} ${newstr_one["41"]} ${newstr_one["42"]} ${newstr_one["43"]}`,
      governor_first_name: newstr_two["113"],
      governor_last_name: newstr_two["114"],
      nature_of_business: `${newstr_one["89"]} ${newstr_one["90"]} ${newstr_one["91"]} `,
      return_address_for_filing: `${newstr_three["37"]} ${newstr_three["38"]} ${newstr_three["39"]}`,
      return_address_attention: `${newstr_three["37"]} ${newstr_three["38"]} ${newstr_three["39"]}`,
      signer_last_name: newstr_three["59"],
      signer_first_name: newstr_three["53"],
      signer_title: newstr_three[""],
      initial_report_work_order: `${newstr_three["90"]} ${newstr_three["91"]}`,
      initial_report_received_date: newstr_three["95"],
      initial_report_amount: newstr_three["97"],
    };
    console.log(report);
    return report;
  });
}

module.exports = fetchAnnualReport;
