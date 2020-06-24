var businessSearchCriteria = new URLSearchParams();
businessSearchCriteria.append("Type", "Agent");
businessSearchCriteria.append("BusinessStatusID", "1");
businessSearchCriteria.append(
  "Content-Type",
  "application/x-www-form-businessSearchCriteria"
);
businessSearchCriteria.append("SearchEntityName", "");
businessSearchCriteria.append("SearchType", "");
businessSearchCriteria.append("BusinessTypeID", "0");
businessSearchCriteria.append("AgentName", "");
businessSearchCriteria.append("PrincipalName", "");
businessSearchCriteria.append("StartDateOfIncorporation", "");
businessSearchCriteria.append("EndDateOfIncorporation", "");
businessSearchCriteria.append("ExpirationDate", "");
businessSearchCriteria.append("IsSearch", "true");
businessSearchCriteria.append("IsShowAdvanceSearch", "true");
businessSearchCriteria.append("AgentAddress[IsAddressSame]", "false");
businessSearchCriteria.append("AgentAddress[IsValidAddress]", "false");
businessSearchCriteria.append(
  "AgentAddress[isUserNonCommercialRegisteredAgent]",
  "false"
);
businessSearchCriteria.append("AgentAddress[IsInvalidState]", "false");
businessSearchCriteria.append("AgentAddress[baseEntity][FilerID]", "0");
businessSearchCriteria.append("AgentAddress[baseEntity][UserID]", "0");
businessSearchCriteria.append("AgentAddress[baseEntity][CreatedBy]", "0");
businessSearchCriteria.append("AgentAddress[baseEntity][ModifiedBy]", "0");
businessSearchCriteria.append("AgentAddress[FullAddress]", "WA, USA");
businessSearchCriteria.append("AgentAddress[ID]", "0");
businessSearchCriteria.append("AgentAddress[State]", "WA");
businessSearchCriteria.append("AgentAddress[Country]", "USA");
businessSearchCriteria.append("PrincipalAddress[IsAddressSame]", "false");
businessSearchCriteria.append("PrincipalAddress[IsValidAddress]", "false");
businessSearchCriteria.append(
  "PrincipalAddress[isUserNonCommercialRegisteredAgent]",
  "false"
);
businessSearchCriteria.append("PrincipalAddress[IsInvalidState]", "false");
businessSearchCriteria.append("PrincipalAddress[baseEntity][FilerID]", "0");
businessSearchCriteria.append("PrincipalAddress[baseEntity][UserID]", "0");
businessSearchCriteria.append("PrincipalAddress[baseEntity][CreatedBy]", "0");
businessSearchCriteria.append("PrincipalAddress[baseEntity][ModifiedBy]", "");
businessSearchCriteria.append("PrincipalAddress[FullAddress]", "WA, USA");
businessSearchCriteria.append("PrincipalAddress[ID]", "0");
businessSearchCriteria.append("PrincipalAddress[State]", "");
businessSearchCriteria.append("PrincipalAddress[Country]", "USA");
businessSearchCriteria.append("PageID", "1");
businessSearchCriteria.append("PageCount", "25");

module.exports = businessSearchCriteria;
