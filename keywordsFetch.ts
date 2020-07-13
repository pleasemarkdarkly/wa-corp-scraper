import clc from "cli-color";
import logger from "./common/winston";
import fetchTableKeywords from './fetchTableKeywords'
import businessSearchCriteria from "./businessSearchcriteria";
import delay from "delay";
const { default: PQueue } = require("p-queue");
require("dotenv").config();

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


export const getBusinessByKeywords = async (
    businessTypeId: number, 
    pageId: number, 
    pageCount: number, 
    keywords: string
    ) => {
    const args = {
        ...businessSearchCriteria,
        BusinessTypeID : businessTypeId,
        PageID: pageId,
        PageCount: pageCount
    }    
  const keyJson = await fetchTableKeywords(args, keywords)
  return keyJson
}


function test_with_keywords(concurrency: number, pageId: number, pageCount: number, keywords: string) {
    const queue = new PQueue({ concurrency });
  
    (async () => {
      // await delay(200);
      const firstTask = await getBusinessByKeywords(BusinessType.WA_LIMITED_LIABILITY_CORPORATION, pageId, pageCount, keywords);
      await queue.add(() => firstTask);
      logger.log({
        level: "info",
        message: "COMPLETED: WA_LIMITED_LIABILITY_CORPORATION",
      });
    })();
  
    (async () => {
      // await delay(200);
      const secondTask = await getBusinessByKeywords(BusinessType.WA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP, pageId, pageCount, keywords);
      await queue.add(() => secondTask);
      logger.log({
        level: "info",
        message: "Done: WA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP"
      });
    })();
  
    (async () => {
      // await delay(200);
      const thirdTask = await getBusinessByKeywords(BusinessType.WA_LIMITED_LIABILITY_PARTNERSHIP, pageId, pageCount, keywords);
      await queue.add(() => thirdTask);
      logger.log({
        level: "info",
        message: "Done: WA_LIMITED_LIABILITY_PARTNERSHIP",
      });
    })();
  
    (async () => {
      // await delay(200);
      const fourthTask = await getBusinessByKeywords(BusinessType.WA_LIMITED_PARTNERSHIP, pageId, pageCount, keywords);
      await queue.add(() => fourthTask);
      logger.log({
        level: "info",
        message: "Done: CWA_LIMITED_PARTNERSHIP",
      });
    })();
  
    (async () => {
      // await delay(200);
      const fifthTask = await getBusinessByKeywords(BusinessType.WA_NONPROFIT_CORPORATION, pageId, pageCount, keywords);
      await queue.add(() => fifthTask);
      logger.log({
        level: "info",
        message: "Done: WA_NONPROFIT_CORPORATION",
      });
    })();
  
    (async () => {
      // await delay(200);
      const sixthTask = await getBusinessByKeywords(BusinessType.WA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY, pageId, pageCount, keywords);
      await queue.add(() => sixthTask);
      logger.log({
        level: "info",
        message: "Done: WA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY",
      });
    })();
  
    (async () => {
      // await delay(200);
      const seventhTask = await getBusinessByKeywords(BusinessType.WA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP,  pageId, pageCount, keywords);
      await queue.add(() => seventhTask);
      logger.log({
        level: "info",
        message: "Done: WA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP",
      });
    })();
  
    (async () => {
      // await delay(200);
      const eighhtTask = await getBusinessByKeywords(BusinessType.WA_PROFESSIONAL_SERVICE_CORPORATION, pageId, pageCount, keywords);
      await queue.add(() => eighhtTask);
      logger.log({
        level: "info",
        message: "Done: WA_PROFESSIONAL_SERVICE_CORPORATION",
      });
    })();
  
    (async () => {
      // await delay(200);
      const ninthTask = await getBusinessByKeywords(BusinessType.WA_PROFIT_CORPORATION, pageId, pageCount, keywords);
      await queue.add(() => ninthTask);
      logger.log({
        level: "info",
        message: "Done: CWA_NONPROFIT_CORPORATION",
      });
    })();
  
    (async () => {
      // await delay(200);
      const tenthTask = await getBusinessByKeywords(BusinessType.WA_PUBLIC_BENEFIT_CORPORATION, pageId, pageCount, keywords);
      await queue.add(() => tenthTask);
      logger.log({
        level: "info",
        message: "Done: CWA_PUBLIC_BENEFIT_CORPORATION",
      });
    })();
  
    logger.log({
      level: "info",
      message: "Starting to fetch  businesses by keywords",
    });
  }
  
export default test_with_keywords;