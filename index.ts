/** @format */

import logger from "./common/winston";
import delay from "delay";
import {
  CWA_LIMITED_LIABILITY_CORPORATION_ALL,
  CWA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP_ALL,
  CWA_LIMITED_LIABILITY_PARTNERSHIP_ALL,
  CWA_LIMITED_PARTNERSHIP_ALL,
  CWA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY_ALL,
  CWA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP_ALL,
  CWA_PROFESSIONAL_SERVICE_CORPORATION_ALL,
  CWA_PROFIT_CORPORATION_ALL,
  CWA_PUBLIC_BENEFIT_CORPORATION_ALL,
  CWA_NONPROFIT_CORPORATION_ALL
} from './mainFetch';
import testMain, { get_random_int } from './testMain'


const { default: PQueue } = require("p-queue");
require("dotenv").config();


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


function main(concurrency: number) {
  const queue = new PQueue({ concurrency});

  (async () => {
    await delay(get_random_int(1000));
    const firstTask = await CWA_LIMITED_LIABILITY_CORPORATION_ALL._read();
    // await queue.add(firstTask);
    logger.log({
      level: "info",
      message: "COMPLETED: CWA_LIMITED_LIABILITY_CORPORATION",
    });
  })();

  (async () => {
    await delay(get_random_int(1000));
    const secondTask = await CWA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP_ALL._read();
    // await queue.add(secondTask);
    logger.log({
      level: "info",
      message: "Done: CWA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP",
    });
  })();

  (async () => {
    await delay(get_random_int(1000));
    const thirdTask = await CWA_LIMITED_LIABILITY_PARTNERSHIP_ALL._read();
    // await queue.add(thirdTask);
    logger.log({
      level: "info",
      message: "Done: CWA_LIMITED_LIABILITY_PARTNERSHIP",
    });
  })();

  (async () => {
    await delay(get_random_int(1000));
    const fourthTask = await CWA_LIMITED_PARTNERSHIP_ALL._read();
    // await queue.add(fourthTask);
    logger.log({
      level: "info",
      message: "Done: CWA_LIMITED_PARTNERSHIP",
    });
  })();

  (async () => {
    await delay(get_random_int(1000));
    const fifthTask = await CWA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY_ALL._read();
    // await queue.add(fifthTask);
    logger.log({
      level: "info",
      message: "Done: CWA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY",
    });
  })();

  (async () => {
    await delay(get_random_int(1000));
    const sixthTask = await CWA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP_ALL._read();
    // await queue.add(sixthTask);
    logger.log({
      level: "info",
      message: "Done: CWA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP",
    });
  })();

  (async () => {
    await delay(get_random_int(1000));
    const seventhTask = await CWA_PROFESSIONAL_SERVICE_CORPORATION_ALL._read();
    // await queue.add(seventhTask);
    logger.log({
      level: "info",
      message: "Done: CWA_PROFESSIONAL_SERVICE_CORPORATION",
    });
  })();

  (async () => {
    await delay(get_random_int(1000));
    const eighhtTask = await CWA_PROFIT_CORPORATION_ALL._read();
    // await queue.add(eighhtTask);
    logger.log({
      level: "info",
      message: "Done: CWA_PROFIT_CORPORATION",
    });
  })();

  (async () => {
    await delay(get_random_int(1000));
    const ninthTask = await CWA_NONPROFIT_CORPORATION_ALL._read();
    // await queue.add(ninthTask);
    logger.log({
      level: "info",
      message: "Done: CWA_NONPROFIT_CORPORATION",
    });
  })();

  (async () => {
    await delay(get_random_int(1000));
    const tenthTask = await CWA_PUBLIC_BENEFIT_CORPORATION_ALL._read();
    // await queue.add(tenthTask);
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

main(1)
// testMain(1)
export default main;