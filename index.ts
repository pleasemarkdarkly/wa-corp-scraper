/** @format */

import clc from "cli-color";
import businessSearchCriteria from "./businessSearchcriteria";
import CorporationBasicRawStream from "./CorporationBasicRawStreams";
import logger from "./common/winston";
import delay from "delay";

const { default: PQueue } = require("p-queue");
require("dotenv").config();

var info = clc.white.bold;
var error = clc.red.bold;
var warn = clc.yellow;
var notice = clc.blue;

const ALL_RECORDS = -1;
const _RECORDS = 100;

const BusinessType = {
  WA_LIMITED_LIABILITY_CORPORATION: 65,
  WA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP: 67,
  WA_LIMITED_LIABILITY_PARTNERSHIP: 68,
  WA_LIMITED_PARTNERSHIP: 69,
  WA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY: 79,
  WA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP: 76,
  WA_PROFESSIONAL_SERVICE_CORPORATION: 85,
  WA_PROFIT_CORPORATION: 86,
  WA_NONPROFIT_CORPORATION: 73,
  WA_PUBLIC_BENEFIT_CORPORATION: 87,
};

/*
    WA_LIMITED_LIABILITY_CORPORATION: total 32,000

    (1)       Universal Business Identifier (UBI) | Business Name | Business Type | Date Filed
              Principal Office Phone | Principal Office Email | Governor First Name | Governor Last Name
              Nature of Business | Initial Report Received Date
    ...

    (32000)   Universal Business Identifier (UBI) | Business Name | Business Type | Date Filed
              Principal Office Phone | Principal Office Email | Governor First Name | Governor Last Name
              Nature of Business | Initial Report Received Date

    BusinessType.WA_LIMITED_LIABILITY_CORPORATION: time to scrape (200ms/12m) per entity/total (red/yellow)

    Summary:
    Business Type: Scanned 32000 out of 32000, taking 200ms per entity. 50211 total PDF scanned. 
    Total entities 1,020,092 scanned taking 6h:01m:12 an average of .200ms per. 
*/

// TODO: Move to test module
const CWA_LIMITED_LIABILITY_CORPORATION = new CorporationBasicRawStream(
  _RECORDS,
  1,
  BusinessType.WA_LIMITED_LIABILITY_CORPORATION,
  businessSearchCriteria
);

const CWA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP = new CorporationBasicRawStream(
  _RECORDS,
  1,
  BusinessType.WA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP,
  businessSearchCriteria
);

const CWA_LIMITED_LIABILITY_PARTNERSHIP = new CorporationBasicRawStream(
  _RECORDS,
  1,
  BusinessType.WA_LIMITED_LIABILITY_PARTNERSHIP,
  businessSearchCriteria
);

const CWA_LIMITED_PARTNERSHIP = new CorporationBasicRawStream(
  _RECORDS,
  1,
  BusinessType.WA_LIMITED_PARTNERSHIP,
  businessSearchCriteria
);

const CWA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY = new CorporationBasicRawStream(
  _RECORDS,
  1,
  BusinessType.WA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY,
  businessSearchCriteria
);

const CWA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP = new CorporationBasicRawStream(
  _RECORDS,
  1,
  BusinessType.WA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP,
  businessSearchCriteria
);

const CWA_PROFESSIONAL_SERVICE_CORPORATION = new CorporationBasicRawStream(
  _RECORDS,
  1,
  BusinessType.WA_PROFESSIONAL_SERVICE_CORPORATION,
  businessSearchCriteria
);

const CWA_PROFIT_CORPORATION = new CorporationBasicRawStream(
  _RECORDS,
  1,
  BusinessType.WA_PROFIT_CORPORATION,
  businessSearchCriteria
);

const CWA_NONPROFIT_CORPORATION = new CorporationBasicRawStream(
  _RECORDS,
  1,
  BusinessType.WA_NONPROFIT_CORPORATION,
  businessSearchCriteria
);

const CWA_PUBLIC_BENEFIT_CORPORATION = new CorporationBasicRawStream(
  _RECORDS,
  1,
  BusinessType.WA_PUBLIC_BENEFIT_CORPORATION,
  businessSearchCriteria
);

// TODO: Move to its own module

const CWA_LIMITED_LIABILITY_CORPORATION_ALL = new CorporationBasicRawStream(
  ALL_RECORDS,
  1,
  BusinessType.WA_LIMITED_LIABILITY_CORPORATION,
  businessSearchCriteria
);

const CWA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP_ALL = new CorporationBasicRawStream(
  ALL_RECORDS,
  1,
  BusinessType.WA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP,
  businessSearchCriteria
);

const CWA_LIMITED_LIABILITY_PARTNERSHIP_ALL = new CorporationBasicRawStream(
  ALL_RECORDS,
  1,
  BusinessType.WA_LIMITED_LIABILITY_PARTNERSHIP,
  businessSearchCriteria
);

const CWA_LIMITED_PARTNERSHIP_ALL = new CorporationBasicRawStream(
  ALL_RECORDS,
  1,
  BusinessType.WA_LIMITED_PARTNERSHIP,
  businessSearchCriteria
);

const CWA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY_ALL = new CorporationBasicRawStream(
  ALL_RECORDS,
  1,
  BusinessType.WA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY,
  businessSearchCriteria
);

const CWA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP_ALL = new CorporationBasicRawStream(
  ALL_RECORDS,
  1,
  BusinessType.WA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP,
  businessSearchCriteria
);

const CWA_PROFESSIONAL_SERVICE_CORPORATION_ALL = new CorporationBasicRawStream(
  ALL_RECORDS,
  1,
  BusinessType.WA_PROFESSIONAL_SERVICE_CORPORATION,
  businessSearchCriteria
);

const CWA_PROFIT_CORPORATION_ALL = new CorporationBasicRawStream(
  ALL_RECORDS,
  1,
  BusinessType.WA_PROFIT_CORPORATION,
  businessSearchCriteria
);

const CWA_PUBLIC_BENEFIT_CORPORATION_ALL = new CorporationBasicRawStream(
  ALL_RECORDS,
  1,
  BusinessType.WA_PUBLIC_BENEFIT_CORPORATION,
  businessSearchCriteria
);

const CWA_NONPROFIT_CORPORATION_ALL = new CorporationBasicRawStream(
  ALL_RECORDS,
  1,
  BusinessType.WA_NONPROFIT_CORPORATION,
  businessSearchCriteria
);

// TODO: move to its own test module
function test_main() {
  const queue = new PQueue({ concurrency: 1 });

  (async () => {
    await delay(200);
    const firstTask = await CWA_LIMITED_LIABILITY_CORPORATION._read();
    await queue.add(firstTask);
    logger.log({
      level: "info",
      message: "COMPLETED: CWA_LIMITED_LIABILITY_CORPORATION",
    });
  })();

  (async () => {
    await delay(200);
    const secondTask = await CWA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP._read();
    await queue.add(secondTask);
    logger.log({
      level: "info",
      message: "Done: CWA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP",
    });
  })();

  (async () => {
    await delay(200);
    const thirdTask = await CWA_LIMITED_LIABILITY_PARTNERSHIP._read();
    await queue.add(thirdTask);
    logger.log({
      level: "info",
      message: "Done: CWA_LIMITED_LIABILITY_PARTNERSHIP",
    });
  })();

  (async () => {
    await delay(200);
    const fourthTask = await CWA_LIMITED_PARTNERSHIP._read();
    await queue.add(fourthTask);
    logger.log({
      level: "info",
      message: "Done: CWA_LIMITED_PARTNERSHIP",
    });
  })();

  (async () => {
    await delay(200);
    const fifthTask = await CWA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY._read();
    await queue.add(fifthTask);
    logger.log({
      level: "info",
      message: "Done: CWA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY",
    });
  })();

  (async () => {
    await delay(200);
    const sixthTask = await CWA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP._read();
    await queue.add(sixthTask);
    logger.log({
      level: "info",
      message: "Done: CWA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP",
    });
  })();

  (async () => {
    await delay(200);
    const seventhTask = await CWA_PROFESSIONAL_SERVICE_CORPORATION._read();
    await queue.add(seventhTask);
    logger.log({
      level: "info",
      message: "Done: CWA_PROFESSIONAL_SERVICE_CORPORATION",
    });
  })();

  (async () => {
    await delay(200);
    const eighhtTask = await CWA_PROFIT_CORPORATION._read();
    await queue.add(eighhtTask);
    logger.log({
      level: "info",
      message: "Done: CWA_PROFIT_CORPORATION",
    });
  })();

  (async () => {
    await delay(200);
    const ninthTask = await CWA_NONPROFIT_CORPORATION._read();
    await queue.add(ninthTask);
    logger.log({
      level: "info",
      message: "Done: CWA_NONPROFIT_CORPORATION",
    });
  })();

  (async () => {
    await delay(200);
    const tenthTask = await CWA_PUBLIC_BENEFIT_CORPORATION._read();
    await queue.add(tenthTask);
    logger.log({
      level: "info",
      message: "Done: CWA_PUBLIC_BENEFIT_CORPORATION",
    });
  })();

  logger.log({
    level: "info",
    message: "Starting to fetch 200 businesses by keywords",
  });
}

function get_random_int(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

// TODO: this is the only thing to be in index.ts
function main() {
  const queue = new PQueue({ concurrency: 3 });

  (async () => {

    await delay(get_random_int(1000));
    const firstTask = await CWA_LIMITED_LIABILITY_CORPORATION_ALL._read();
    await queue.add(firstTask);
    logger.log({
      level: "info",
      message: "COMPLETED: CWA_LIMITED_LIABILITY_CORPORATION",
    });
  })();

  (async () => {
    await delay(get_random_int(1000));
    const secondTask = await CWA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP_ALL._read();
    await queue.add(secondTask);
    logger.log({
      level: "info",
      message: "Done: CWA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP",
    });
  })();

  (async () => {
    await delay(get_random_int(1000));
    const thirdTask = await CWA_LIMITED_LIABILITY_PARTNERSHIP_ALL._read();
    await queue.add(thirdTask);
    logger.log({
      level: "info",
      message: "Done: CWA_LIMITED_LIABILITY_PARTNERSHIP",
    });
  })();

  (async () => {
    await delay(get_random_int(1000));
    const fourthTask = await CWA_LIMITED_PARTNERSHIP_ALL._read();
    await queue.add(fourthTask);
    logger.log({
      level: "info",
      message: "Done: CWA_LIMITED_PARTNERSHIP",
    });
  })();

  (async () => {
    await delay(get_random_int(1000));
    const fifthTask = await CWA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY_ALL._read();
    await queue.add(fifthTask);
    logger.log({
      level: "info",
      message: "Done: CWA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY",
    });
  })();

  (async () => {
    await delay(get_random_int(1000));
    const sixthTask = await CWA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP_ALL._read();
    await queue.add(sixthTask);
    logger.log({
      level: "info",
      message: "Done: CWA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP",
    });
  })();

  (async () => {
    await delay(get_random_int(1000));
    const seventhTask = await CWA_PROFESSIONAL_SERVICE_CORPORATION_ALL._read();
    await queue.add(seventhTask);
    logger.log({
      level: "info",
      message: "Done: CWA_PROFESSIONAL_SERVICE_CORPORATION",
    });
  })();

  (async () => {
    await delay(get_random_int(1000));
    const eighhtTask = await CWA_PROFIT_CORPORATION_ALL._read();
    await queue.add(eighhtTask);
    logger.log({
      level: "info",
      message: "Done: CWA_PROFIT_CORPORATION",
    });
  })();

  (async () => {
    await delay(get_random_int(1000));
    const ninthTask = await CWA_NONPROFIT_CORPORATION_ALL._read();
    await queue.add(ninthTask);
    logger.log({
      level: "info",
      message: "Done: CWA_NONPROFIT_CORPORATION",
    });
  })();

  (async () => {
    await delay(get_random_int(1000));
    const tenthTask = await CWA_PUBLIC_BENEFIT_CORPORATION_ALL._read();
    await queue.add(tenthTask);
    logger.log({
      level: "info",
      message: "Done: CWA_PUBLIC_BENEFIT_CORPORATION",
    });
  })();

  logger.log({
    level: "info",
    message: "Starting to fetch all business by keywords",
  });
}

// TODO: create parseArguments module with the files I provided earlier

// /*
//   TODO: yargs
//   --concurrency

//   */

// TODO: On Ctrl-C Save location of company fetches to resume on restart
// TODO: save state on any interrupts
/*
  https://nodejs.org/api/process.html

  process.on('SIGINT', function() {
    logger.log("Caught interrupt signal");

    if (i_should_exit)
        process.exit();
  });
  */

//  run_200_business();
// run_all_business();

main();
