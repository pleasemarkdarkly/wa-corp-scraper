#### Washington Corporation Scraper

`https://www.sos.wa.gov/corps/alldata.aspx` provides the entire data set to initialize the mongodb database.
Every night at 2am, https://www.sos.wa.gov/_assets/corps/jsonCorpsData.zip
Entities without an UBI can be skipped and are of no value. Entities without the following fields are without value and should not be retained:

```
BusinessName
UBI
BusinessType: see below for the specific active business types
PrincipalOfficeStreetAddress
NatureOfBusiness
PrincipalOffice (ALL Details)
    Phone
    Email
    Street
    Mailing
Governors
    Title
    Type
    EntityName
    First
    Last
NatureOfBusiness (Listed twice on the annual report and is worth capturing both to ensure consistency.)
ReturnAddressForThisFiling
    Attention (Name)
    Email
    Address
```

### Running the Scraper

The following commands run the current project. To `ALL BUSINESS FETCH` use the following command. 

```
yarn run corps company_keyword_scraper --c=1 --id=-1 --keyword=illustrations  
```

The following command runs a shorter test amount. `TEST WITH COUNT --COUNT =200`
```
yarn run corps company_keyword_scraper --c=1 --id=1 --count=200 --keyword=illustrations  
```

The following command runs `ALL BUSINESS FETCH` which collects all businesses:
```
yarn run corps company_info_scraper --c=1 --count=-1
```

The `TEST WITH COUNT-- TO RUN FIRST 100 AND LAST 100--- count=100`
```
yarn run corps company_info_scraper_test --c=1 --count=100
```

The `package.json` includes the following command to run all.
```
yarn run runall
```

### Scraper

Initial Business Types:

* WA LIMITED LIABILITY COMPANY
* WA LIMITED LIABILITY LIMITED PARTNERSHIP
* WA LIMITED LIABILITY PARTNERSHIP
* WA LIMITED PARTNERSHIP
* WA PROFESSIONAL LIMITED LIABILITY COMPANY
* WA PROFESSIONAL LIMITED LIABILITY PARTNERSHIP
* WA PROFESSIONAL SERVICE CORPORATION
* WA PROFIT CORPORATION
* WA NONPROFIT CORPORATION
* WA PUBLIC BENEFIT CORPORATION

### Workflow

Visiting https://ccfs.sos.wa.gov/#/BusinessSearch, each business type and active search in the advanced form https://ccfs.sos.wa.gov/#/AdvancedSearch provides summary business information and business filings such as annual report, initial filing at the bottom right of the results, 'View Filings'. The PDFs contain the following name value pairs:

Universal Business Identifier (UBI)
Business Name
Business Type
Principal Office
Registered Agent Name
Registered Agent Consent
Registered Agent Mailing Address
Status - Active
Date Filed
Effective Date
Principal Office Phone
Principal Office Email
Principal Office Street Address
Governor First Name
Governor Last Name
Nature of Business
Return Address for Filing
Return Address Attention
Signer Last Name
Signer First Name
Signer Title
Initial Report Work Order
Initial Report Received Date
Initial Report Amount

(incomplete use a superset of both the initial report and the annual report)

### Project Package

`https://github.com/pleasemarkdarkly/typescript-express-docker` to encapsulate the final project. 

### Express Routes / Rest API and Search Page

The following fields are searchable and return a list grid of results which can be expanded with a right drawer or inline to present all details. 
Search by Individual Name or Business Name and Keywords.
Scraper combines Business Name, Nature of Business after removing stop words for keywords variable. Scraper combines all individual names for keywords for names field.

* Business Name
* Nature of Business
* Registered Agent Name
* Governors Name
* Return Address (Attention) Name 


### Rest API

```
/lawyer/[state]/bar_number
```

```
/corporation/[state]/ubi_number
```

### CLI TBD

Define command line parameters to be consistent, monorepo for setting proxy, output directory, mongodb connection string and any special type 

```
--proxy
--directory | --database [mongodb:27027]
--export [filename]
--refresh 120d # in days 

--corp-type 

    WA LIMITED LIABILITY COMPANY
    WA LIMITED LIABILITY LIMITED PARTNERSHIP
    WA LIMITED LIABILITY PARTNERSHIP
    WA LIMITED PARTNERSHIP
    WA PROFESSIONAL LIMITED LIABILITY COMPANY
    WA PROFESSIONAL LIMITED LIABILITY PARTNERSHIP
    WA PROFESSIONAL SERVICE CORPORATION
    WA PROFIT CORPORATION
    ...

--wa-status

    ACTIVE
    RETIRED
    PRO-BONO
    ...

```