#### Washington Corporation Scraper / Crawler

### Washington Corporation Scraper Module and Search

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

### Scraper

Business Types:

`WA LIMITED LIABILITY COMPANY
WA LIMITED LIABILITY LIMITED PARTNERSHIP
WA LIMITED LIABILITY PARTNERSHIP
WA LIMITED PARTNERSHIP
WA PROFESSIONAL LIMITED LIABILITY COMPANY
WA PROFESSIONAL LIMITED LIABILITY PARTNERSHIP
WA PROFESSIONAL SERVICE CORPORATION
WA PROFIT CORPORATION`

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

---
Business Name | Nature of Business
---
Registered Agent Name | Governors Name | Return Address (Attention) Name 
---

### Rest API

/lawyer/[state]/bar_number
/corporation/[state]/ubi_number

### CLI TBD
```
--daemon 
--port [4444]
--directory | --database [mongodb:27027]
--refresh 120d # in days 
--export [filename]
--type 

WA LIMITED LIABILITY COMPANY
WA LIMITED LIABILITY LIMITED PARTNERSHIP
WA LIMITED LIABILITY PARTNERSHIP
WA LIMITED PARTNERSHIP
WA PROFESSIONAL LIMITED LIABILITY COMPANY
WA PROFESSIONAL LIMITED LIABILITY PARTNERSHIP
WA PROFESSIONAL SERVICE CORPORATION
WA PROFIT CORPORATION
```