# STEMI LHIN Specification

## STEMI case Definition

* Data entry that fulfills the following filters is a STEMI case data.

_'AND' relationship between each filter in the table below_

| Table Name |  Column Name | Column Nullable? |Inclusion Value(s)| Join Column |
|--------|--------|--------|--------|--------|
|CardiacWaitListEntry|WaitTimeProcedureCD|Not Null|'W.CAR.CATHD.CA'|WaitlistEntryID|
|CardiacWaitListEntry|RemovalReasonCD|Null|'PS'|  |
|CardiacReferral|ReferralPrimaryReasonCD|Null|'D'|WaitlistEntryID|
|CardiacReferral|ReferralPrimaryReasonTypeCD|Null|'S'|WaitlistEntryID|
|CardiacStemiActivity|PPInHospitalPatient_IND|Null (*Y/N only*)| 'N'|WaitlistEntryID|
|CardiacWaitListEntry| AcceptanceSiteNumber|Null| Must within CCN_Reference.CCN_ListOfPCISites|SiteNumber|
|CardiacStemiActivity|PP_NonPCISiteNumber|Null| Null or (<br>Not in CCN_ListOfPCISites + <br> Not in CCN_ListOfExcludedSites) |SiteNumber|
|CardiacStemiActivity| Site Name for PP_NonPCISiteNumber|Null| Null or Not like  '%!!%'| SiteNumber|

## Compute Columns Design

### 1. BalloonPCI Indicator Calculation

_'AND' relationship between each filter in the table below_

|Table Name | Column Name(s)|Column Nullable? |Condition|
|--|--|--|--|
|CardiacStemiActivity|Cath_ProcedureDonePrimaryReperfusionIND|Not Null|'Y'|
|CardiacStemiActivity|FibrinolysisAdministered_CD|Null(Y,N,F,Null)| in (**'F'**,'N')|
|CardiacStemiActivity|PPAmbulance_IND<br>PPSelfTransport_IND<br> PPDirectFieldToCath_IND<br>PPFieldToEDPCIHospital_IND<br>PPSelfTransportToPCIHospital_IND| Null (Y/N)| **(**	PPAmbulance_IND = 'Y'	AND PPSelfTransport_IND = 'N'	AND (PPDirectFieldToCath_IND = 'Y' OR PPFieldToEDPCIHospital_IND = 'Y')<br>	**)**<br>**OR**<br>	**(**PPSelfTransport_IND = 'Y'	AND PPAmbulance_IND = 'N' AND PPSelfTransportToPCIHospital_IND = 'Y' **)**|

### 2. BalloonNonPCI Indicator Calculation

_'AND' relationship between each filter in the table below_

|Table Name | Column Name(s)|Column Nullable? |Condition|
|--|--|--|--|
|CardiacStemiActivity|Cath_ProcedureDonePrimaryReperfusionIND|Not Null|'Y'|
|CardiacStemiActivity|FibrinolysisAdministered_CD|Null(Y,N,F,Null)| in (**'F'**,'N')|
|CardiacStemiActivity|PPAmbulance_IND<br>PPSelfTransport_IND<br> PPFieldToEDNonPCIHospital_IND<br>PPSelfTransportToNonPCIHospital_IND| Null (Y/N)| **(** PPAmbulance_IND = 'Y' AND PPSelfTransport_IND = 'N'	AND PPFieldToEDNonPCIHospital_IND = 'Y' **)**<br>**OR**<br>**(** PPSelfTransport_IND = 'Y' 	AND PPAmbulance_IND = 'N' 	AND PPSelfTransportToNonPCIHospital_IND = 'Y' **)**|