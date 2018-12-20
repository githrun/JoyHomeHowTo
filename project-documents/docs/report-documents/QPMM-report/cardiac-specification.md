## Elective CATH case Definition

* Data entry that fulfills the following filters is an elective CATH case data.
* However, some elective CATH cases have the data quality issue so that the report couldn't calculate the type of indicator accordingly, such record will count as DQ.

_'AND' relationship between each filter in the table below_

| Table Name |  Column Name | Column Nullable? |Inclusion Value(s)| Join Column |
|--------|--------|--------|--------|--------|
|CardiacWaitListEntry|WaitTimeProcedureCD|Not Null|'W.CAR.CATHD.CA'|WaitlistEntryID|
|CardiacWaitListEntry|RemovalReasonCD|Null|'PS'|  |
|CardiacWaitListEntry|PriorityLevelCD|Null| 3 or 4| |
|CardiacReferral|ReferralPrimaryReasonCD|Null|'D'|WaitlistEntryID|
|CardiacOfflistingDetails|Cath_CoronaryAngiogramIND|Null(*Y/N only*)|'Y'|WaitlistEntryID|
|WaitlistEntryBooking|IsActive|Null (*0/1 only*)|1|WaitlistEntryID|
|CardiacReferral|**ReferralPrimaryReasonTypeCD**|Null| != 'S' (Null data included)|WaitlistEntryID|
|CardiacReferral|**Cath_PreviousCabgProcedureCD**|Null|!='Y' (Null data included)| |
|CardiacOfflistingDetails|Cath_DiagnosticProcedureAbortedIND|Null (*Y/N only*)| !='Y'|WaitlistEntryID|
| Compute | Wait Location<br>see [Home Calculation](cardiac-specification.md#home-calculation)| Not Null| 'Home'||
|CardiacWaitListEntry| Facility Number for AcceptanceSiteNumber|Null| Must within selected sites within [Cardiac Program Center List](data-transformation.md#cardiac-program-centers-list)|

???+ important "Notes"
	* **ReferralPrimaryReasonTypeCD** has value Null in database, Null value record would be included
	* **Cath_PreviousCabgProcedureCD** has value Null in database, Null value record would be included
	* From Wait Time production database, after 2016, there are no CATH case with ReferralPrimaryReasonTypeCD has null value, 270 null value records in total
	* From Wait Time production database, after 2016, there are 9 CATH case with Cath_PreviousCabgProcedureCD has null value, 52 null value records in total


## Cardiac CATH Indicators
For an [Elective CATH case](cardiac-specification.md#elective-cath-case-definition), it will fall into one of following three indicators, or [Data Qaulity](cardiac-specification.md#elective-cath-case-data-quality):

* **Normal**

	CATH case were the result was normal anatomy

* **Non Significant**

	CATH case were the result was Non-Significant CAD

* **Disease**

	CATH case were the  results indicated disease was found

For an elective CATH case, the code checks 'Normal' indicator first, then checks 'Non-Significant' indicator, and then check 'Disease' indicator, at last checks 'DQ' flag.


### 1. Normal Indicator

**Indicator Definition:** A CCN waitlist entry that matches the CATH data definition and the result was normal anatomy

**Calculation Formula:**

| Table Name |  Column Name | Column Nullable? |Indicator Value(s)| Join Column |
|--------|--------|--------|--------|--------|
| CardiacOfflistingDetails|Cath_NonSignificantCADIND<br>Cath_NormalAnatomyIND|Not Null (*Y/N only*)| 'N' + <br>'Y'|WaitlistEntryID|

???+ danger "Discuss"
	* The current code only checks Cath_NormalAnatomyIND equals 'Y', so that if a record has both flags 'Y',  the record would fall into 'Normal' bucket.
	* Strictly speaking, a record with both flags  'Y' should fall into 'DQ' bucket. On Wait Time production database, there are 26 such records from the year 2010 and  2011.


### 2. Non Significant Indicator

**Indicator Definition:** A CCN waitlist entry that matches the CATH data definition and the result was Non-Significant CAD

**Calculation Formula:**

_'OR' relationship between each condition in the table below, first meet condition returns true_

| Table Name |  Column Name | Column Nullable? |Indicator Value(s)| Join Column |
|--------|--------|--------|--------|--------|
| CardiacOfflistingDetails|Cath_NonSignificantCADIND<br>Cath_NormalAnatomyIND|Not Null (*Y/N only*)|'Y' +  <br>  'N'|WaitlistEntryID|
|CardiacOfflistingDetails|Cath_NonSignificantCADIND<br>Cath_NormalAnatomyIND<br>Cath_NativeLmCD<br>Cath_NativeProxLadCD<br>Cath_NativeMidDistalLadCD <br>Cath_NativeCircumflexCD<br>Cath_NativeRcaCD|Not Null (*Y/N only*)<br>Not Null (*Y/N only*)<br>Null<br>Null<br>Null<br>Null<br>Null|'N' + <br>'N' + <br>'N' + <br>'N' + <br>'N' + <br>'N' + <br>'N'<br> |||


???+ Note "Notes"
	* For the first condition, the current code only checks Cath_NonSignificantCADIND equals 'Y'. Since the code check 'Normal' indicator first, a record with both flags 'Y' wouldn't fall into this 'Non-Significant' bucket.


### 3. Disease Indicator

**Indicator Definition:** This indicator is the percentage of elective CATHs performed where the result indicated the presence of coronary artery disease (CAD). CAD is defined as the presence of atherosclerotic disease with >50% stenosis in the left main or >70% stenosis in other coronary vessels.

**Calculation Formula:**

_'AND' relationship between each condition in the table below_

| Table Name |  Column Name | Column Nullable? |Indicator Value(s)| Join Column |
|--------|--------|--------|--------|--------|
| CardiacOfflistingDetails|Cath_NonSignificantCADIND<br>Cath_NormalAnatomyIND|Not Null (*Y/N only*)|'N' +<br>'N'|WaitlistEntryID|
| CardiacOfflistingDetails|Cath_NativeLmCD<br>Cath_NativeProxLadCD<br>Cath_NativeMidDistalLadCD <br>Cath_NativeCircumflexCD<br>Cath_NativeRcaCD|Null|any column is 'Y' |||


## Elective CATH case Data Quality

**Clinical Definition:** A CCN waitlist entry that matches the Elective CATH case definition and not enough information was provided to determine the result

**Calculation Formula:**

_'AND' relationship between each condition in the table below_

| Table Name |  Column Name | Column Nullable? |Indicator Value(s)| Join Column |
|--------|--------|--------|--------|--------|
| CardiacOfflistingDetails|Cath_NonSignificantCADIND<br>Cath_NormalAnatomyIND|Not Null (*Y/N only*)|'N' +<br>'N'|WaitlistEntryID|
| CardiacOfflistingDetails|Cath_NativeLmCD<br>Cath_NativeProxLadCD<br>Cath_NativeMidDistalLadCD <br>Cath_NativeCircumflexCD<br>Cath_NativeRcaCD|Null|1) all columns are Null<br> OR <br>2) one more columns is null and the rest are 'N'|||

## Home Calculation

Below is the calculation Logic for Wait Location.

_'OR' relationship between each condition in the table below, first meet condition returns true_

|Table Name  | Column Name |Column Nullable?|Column Value|Home ? | Join Column|
|------------|------------|-------------------|---|--|--|
|WaitlistEntryBooking|PatientWaitSiteNumberOther|Null (*data*) |99998|Home|WaitlistEntryID|
|WaitlistEntryBooking<br>CardiacWaitListEntry|PatientWaitSiteNumberOther<br>PatientWaitSiteNumber | Null(*data*)<br>Null(*data*)| Null + <br> 99998 |Home| WaitlistEntryID |
|WaitlistEntryBooking<br>CardiacWaitListEntry<br>CardiacReferral|PatientWaitSiteNumberOther<br>PatientWaitSiteNumber<br>SiteNumber|Null (*data*)<br>Null (*data*)<br>Null (*data*) |Null + <br> Null +<br>99998|Home|WaitlistEntryID|
||||else|'Not Home'|||

???+ danger "Discuss"
	* Current Epecification Excel file uses **WaitlistEntryBooking.PatientWaitSiteNumber**, however the CRS script uses **WaitlistEntryBooking.PatientWaitSiteNumber**==**Other**== column, and Aric confirms that should use **PatientWaitSiteNumberOther** column, Jeniffer's QA script also use the 'PatientWaitSiteNumberOther' column. Please confirm.

## Non Invasive Testing Calculation

* _Compute Column 'Home' must have value "Home" and then check condition in the following table_
* _'OR' relationship between each condition in the table below, first meet condition returns true_

| Table Name |  Column Name | Column Nullable? |Indicator Value(s)| Bucket|Join Column |
|--------|--------|--------|--------|--------|--|
|CardiacReferral|Cath_ExerciseEcgDoneCD<br>Cath_FunctionalImagingDoneCD|Null<br>Null|'D' + <br> in ('D','N','U', Null) |Testing| WaitlistEntryID|
|CardiacReferral|Cath_ExerciseEcgDoneCD<br>Cath_FunctionalImagingDoneCD|Null<br>Null| in('N','U', Null)) +<br>'D'  |Testing |WaitlistEntryID|
|CardiacReferral|Cath_ExerciseEcgDoneCD<br>Cath_FunctionalImagingDoneCD|Null<br>Null|'N' + <br> 'N' |No Testing| WaitlistEntryID|
|CardiacReferral|Cath_ExerciseEcgDoneCD<br>Cath_FunctionalImagingDoneCD|Null<br>Null|else combinations |Data Quality| WaitlistEntryID|


## Compute Columns Design

| Column Name  |  Source Columns |Column Nullable?|Column Type|Compute Values|Notes|
|--------------|---------------|-----------|------------------|------------|--|
|Fiscal year and Quater|RemovalDate|Not Null|varchar(20)|sample: 17/18 Q1|The fiscal year starts from April 1st to March 31th next year, April to June is the first quarter of the fiscal year|
|Disease Bucket| All columns invovle indicator and DQ calucation|Not Null|varchar(20)|"Normal"<br> "Non-Signifcant"<br> "Disease"<br> "Data Quality"|Please see [Cardiac CATH Indicators](cardiac-specification.md#cardiac-cath-indicators) and  [Elective CATH case Data Quality](cardiac-specification.md#elective-cath-case-data-quality) for details|
|Testing Bucket|All columns involve Non Invasive Testing calculation |Not Null|varchar(20)|"Testing"<br>"No Testing"<br>" Data Quality"|Please see [No Invasive Testing Calcuation](cardiac-specification.md#non-invasive-testing-calculation) section for details|
|Wait Location| All columns involve Home Calculation|Not Null|varchar(20)|"Home"<br>"Not Home"|Please see [Home Calcuation](cardiac-specification.md#home-calculation) section for details