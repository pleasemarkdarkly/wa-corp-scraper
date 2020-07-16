import businessSearchCriteria from "./businessSearchcriteria";
import CorporationBasicRawStream from "./CorporationBasicRawStreams";


require("dotenv").config();

export const BUSINESS_CORPORATION = new CorporationBasicRawStream(
    1,
    businessSearchCriteria
  );
  
  // export const CWA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP_ALL = new CorporationBasicRawStream(
  //   1,
  //   businessSearchCriteria
  // );
  
  // export const CWA_LIMITED_LIABILITY_PARTNERSHIP_ALL = new CorporationBasicRawStream(
  //   1,
  //   businessSearchCriteria
  // );
  
  // export const CWA_LIMITED_PARTNERSHIP_ALL = new CorporationBasicRawStream(
  //   1,
  //   businessSearchCriteria
  // );
  
  // export const CWA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY_ALL = new CorporationBasicRawStream(
  //   1,
  //   businessSearchCriteria
  // );
  
  // export const CWA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP_ALL = new CorporationBasicRawStream(
  //   1,
  //   businessSearchCriteria
  // );
  
  // export const CWA_PROFESSIONAL_SERVICE_CORPORATION_ALL = new CorporationBasicRawStream(
  //   1,
  //   businessSearchCriteria
  // );
  
  // export const CWA_PROFIT_CORPORATION_ALL = new CorporationBasicRawStream(
  //   1,
  //   businessSearchCriteria
  // );
  
  // export const CWA_PUBLIC_BENEFIT_CORPORATION_ALL = new CorporationBasicRawStream(
  //   1,
  //   businessSearchCriteria
  // );
  
  // export const CWA_NONPROFIT_CORPORATION_ALL = new CorporationBasicRawStream(
  //   1,
  //   businessSearchCriteria
  // );