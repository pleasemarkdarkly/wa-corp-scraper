// import logger from "./common/winston";
// import delay from "delay";
// import {
//   CWA_LIMITED_LIABILITY_CORPORATION,
//   CWA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP,
//   CWA_LIMITED_LIABILITY_PARTNERSHIP,
//   CWA_LIMITED_PARTNERSHIP,
//   CWA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY,
//   CWA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP,
//   CWA_PROFESSIONAL_SERVICE_CORPORATION,
//   CWA_PROFIT_CORPORATION,
//   CWA_PUBLIC_BENEFIT_CORPORATION,
//   CWA_NONPROFIT_CORPORATION
// } from './testMainFetch';

// const { default: PQueue } = require("p-queue");
// require("dotenv").config();


// function test_main(concurrency: number, pageCount: number) {
//     const queue = new PQueue({ concurrency });
  
//     (async () => {
//       await delay(200);
//       const firstTask = await CWA_LIMITED_LIABILITY_CORPORATION._read(pageCount);
//       await queue.add(() => firstTask);
//       logger.log({
//         level: "info",
//         message: "COMPLETED: CWA_LIMITED_LIABILITY_CORPORATION",
//       });
//     })();
  
//     (async () => {
//       await delay(200);
//       const secondTask = await CWA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP._read(pageCount);
//       await queue.add(() => secondTask);
//       logger.log({
//         level: "info",
//         message: "Done: CWA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP",
//       });
//     })();
  
//     (async () => {
//       await delay(200);
//       const thirdTask = await CWA_LIMITED_LIABILITY_PARTNERSHIP._read(pageCount);
//       await queue.add(() => thirdTask);
//       logger.log({
//         level: "info",
//         message: "Done: CWA_LIMITED_LIABILITY_PARTNERSHIP",
//       });
//     })();
  
//     (async () => {
//       await delay(200);
//       const fourthTask = await CWA_LIMITED_PARTNERSHIP._read(pageCount);
//       await queue.add(() => fourthTask);
//       logger.log({
//         level: "info",
//         message: "Done: CWA_LIMITED_PARTNERSHIP",
//       });
//     })();
  
//     (async () => {
//       await delay(200);
//       const fifthTask = await CWA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY._read(pageCount);
//       await queue.add(() => fifthTask);
//       logger.log({
//         level: "info",
//         message: "Done: CWA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY",
//       });
//     })();
  
//     (async () => {
//       await delay(200);
//       const sixthTask = await CWA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP._read(pageCount);
//       await queue.add(() => sixthTask);
//       logger.log({
//         level: "info",
//         message: "Done: CWA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP",
//       });
//     })();
  
//     (async () => {
//       await delay(200);
//       const seventhTask = await CWA_PROFESSIONAL_SERVICE_CORPORATION._read(pageCount);
//       await queue.add(() => seventhTask);
//       logger.log({
//         level: "info",
//         message: "Done: CWA_PROFESSIONAL_SERVICE_CORPORATION",
//       });
//     })();
  
//     (async () => {
//       await delay(200);
//       const eighhtTask = await CWA_PROFIT_CORPORATION._read(pageCount);
//       await queue.add(() => eighhtTask);
//       logger.log({
//         level: "info",
//         message: "Done: CWA_PROFIT_CORPORATION",
//       });
//     })();
  
//     (async () => {
//       await delay(200);
//       const ninthTask = await CWA_NONPROFIT_CORPORATION._read(pageCount);
//       await queue.add(() => ninthTask);
//       logger.log({
//         level: "info",
//         message: "Done: CWA_NONPROFIT_CORPORATION",
//       });
//     })();
  
//     (async () => {
//       await delay(200);
//       const tenthTask = await CWA_PUBLIC_BENEFIT_CORPORATION._read(pageCount);
//       await queue.add(() => tenthTask);
//       logger.log({
//         level: "info",
//         message: "Done: CWA_PUBLIC_BENEFIT_CORPORATION",
//       });
//     })();
  
//     logger.log({
//       level: "info",
//       message: "Starting to fetch 200 businesses by keywords",
//     });
//   }
  
//   export function get_random_int(max: number) {
//     return Math.floor(Math.random() * Math.floor(max));
//   }
  
//   export default test_main;