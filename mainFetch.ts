import businessSearchCriteria from "./businessSearchcriteria";
import CorporationBasicRawStream from "./CorporationBasicRawStreams";


require("dotenv").config();


const ALL_RECORDS = -1;

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
export const CWA_LIMITED_LIABILITY_CORPORATION_ALL = new CorporationBasicRawStream(
    
    1,
    BusinessType.WA_LIMITED_LIABILITY_CORPORATION,
    businessSearchCriteria
  );
  
  export const CWA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP_ALL = new CorporationBasicRawStream(
    
    1,
    BusinessType.WA_LIMITED_LIABILITY_CORPORATION_PARTNERSHIP,
    businessSearchCriteria
  );
  
  export const CWA_LIMITED_LIABILITY_PARTNERSHIP_ALL = new CorporationBasicRawStream(
    
    1,
    BusinessType.WA_LIMITED_LIABILITY_PARTNERSHIP,
    businessSearchCriteria
  );
  
  export const CWA_LIMITED_PARTNERSHIP_ALL = new CorporationBasicRawStream(
    
    1,
    BusinessType.WA_LIMITED_PARTNERSHIP,
    businessSearchCriteria
  );
  
  export const CWA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY_ALL = new CorporationBasicRawStream(
    
    1,
    BusinessType.WA_PROFESSIONAL_LIMITED_LIABILITY_COMPANY,
    businessSearchCriteria
  );
  
  export const CWA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP_ALL = new CorporationBasicRawStream(
    
    1,
    BusinessType.WA_PROFESSIONAL_LIMITED_LIABILITY_PARTNERSHIP,
    businessSearchCriteria
  );
  
  export const CWA_PROFESSIONAL_SERVICE_CORPORATION_ALL = new CorporationBasicRawStream(
    
    1,
    BusinessType.WA_PROFESSIONAL_SERVICE_CORPORATION,
    businessSearchCriteria
  );
  
  export const CWA_PROFIT_CORPORATION_ALL = new CorporationBasicRawStream(
    
    1,
    BusinessType.WA_PROFIT_CORPORATION,
    businessSearchCriteria
  );
  
  export const CWA_PUBLIC_BENEFIT_CORPORATION_ALL = new CorporationBasicRawStream(
    
    1,
    BusinessType.WA_PUBLIC_BENEFIT_CORPORATION,
    businessSearchCriteria
  );
  
  export const CWA_NONPROFIT_CORPORATION_ALL = new CorporationBasicRawStream(

    1,
    BusinessType.WA_NONPROFIT_CORPORATION,
    businessSearchCriteria
  );