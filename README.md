#### Washington Corporation Scraper / Crawler

### Initial download

`https://www.sos.wa.gov/corps/alldata.aspx` provides the entire data set to initialize the mongodb database. 

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

### Strategy for updating entity records

Add a flag by entity or by group (of previously searched) to 'watch' for information change, thus upon 2am nightly dump (configurable through .env days to update) the JSON is scanned for only the UBIs we are interested in updating. 


### Updates from the initial ingest

* Section is outdated due to the nightly bulk updates SOS provides

This repo crawls and mirrors the following active business types: 

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

_(incomplete use a superset of both the initial report and the annual report)

### Package

`https://github.com/pleasemarkdarkly/typescript-express-docker` to encapsulate the final project. 

### Schema

The above fields are contained within a Corporation collection within Mongo. Additionally, a log of when the data was first scraped and last verification date.

In addition to the above records a listing of all filings, document name, date of filing, are stored in Filings collection, the PDFs are not stored locally, however they are the main source of information. Periodic scanning (every quarter or four months) checks the existence of additional documents and updates the information accordingly. 

Statistic link on the Search page provides a high-level view of mongo charts. 

### Entity Flags

TBD

### Express Routes / Rest API and Search Page

The following fields are searchable and return a list grid of results which can be expanded with a right drawer or inline to present all details. 

Checkbox for Governors, Return Address Filing Name, Authorized Person Name and Business Name - share string. 

This is to say that a string is repeated between these fields. `https://www.npmjs.com/package/stopword` Should be used to remove words such as 'The' from interfering with this check.

---

Business Name
Nature of Business

---

Registered Agent Name
Governors Name
Return Address (Attention) Name 

### CLI TBD

The following commands are supported. 

Run the application in a daemon mode with forever. 
```
--daemon 
```

Specifies the port for express to use. Defaults to 4444.
```
--port [4444]
```

Directory or database.  Path to directory to save the Corporate and Filings collection as serialized objects or mongodb URI and port.
```
--directory | --database [mongodb:27027]
```

Countdown until next scan. Default is 120 days.
```
--countdown 120d 
```

Stylesheets. Directory to look for a .css file to replace express style of the search page.
```
--style
```

Rest API. Enable Rest API for reading and writing. 
```
--enable_rest
```

### Search commands

The following three commands are required together to export a file. The filename of the csv, which Business types to include and the search term to match against first, last name and business purpose.

Export functions. Export filename in csv. If no file is provided, a file template.csv is created. 
```
--export [filename]
```

BusinessType. Full BusinessType or 1 through 8, determines the Business types to be included in the search/export result. 
```
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

Search term. 
```
--search [term]
```