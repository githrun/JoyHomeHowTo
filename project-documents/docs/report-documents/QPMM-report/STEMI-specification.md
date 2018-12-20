## STEMI case Definition

* Data entry that fulfills the following filters is a STEMI case data.

_'AND' relationship between each filter in the table below_

| Table Name           | Column Name                              | Column Nullable?  | Inclusion Value(s)                                                                                                 | Join Column     |
|----------------------|------------------------------------------|-------------------|--------------------------------------------------------------------------------------------------------------------|-----------------|
| CardiacWaitListEntry | WaitTimeProcedureCD                      | Not Null          | 'W.CAR.CATHD.CA'                                                                                                   | WaitlistEntryID |
| CardiacWaitListEntry | RemovalReasonCD                          | Null              | 'PS'                                                                                                               |                 |
| CardiacReferral      | ReferralPrimaryReasonCD                  | Null              | 'D'                                                                                                                | WaitlistEntryID |
| CardiacReferral      | ReferralPrimaryReasonTypeCD              | Null              | 'S'                                                                                                                | WaitlistEntryID |
| CardiacStemiActivity | PPInHospitalPatient_IND                  | Null (*Y/N only*) | !='Y'                                                                                                              | WaitlistEntryID |
| CardiacWaitListEntry | Facility Number for AcceptanceSiteNumber | Null              | Must within [Advance Program Center List](data-transformation.md#cardiac-program-centers-list) and is a STEMI site |                 |


???+ notes "Notes"
	* For the PPInHospitalPatient_IND condition in above table, current code get all records that with either PPInHospitalPatient_IND = 'Y' or PPAmbulance_IND = 'Y' or PPSelfTransport_IND = 'Y' as  STEMI raw records

## STEMI case indicators

### Balloon 90 PCI Indicator

| Table Name               | Column Name                                      | Column Nullable? | Inclusion Value(s)               | Join Column     |
|--------------------------|--------------------------------------------------|------------------|----------------------------------|-----------------|
| CardiacStemiActivity     | FibrinolysisAdministered_CD                      | Null (_data_)    | 'N'                              | WaitlistEntryID |
| CardiacOfflistingDetails | Cath_ProcedureDonePrimaryReperfusionIND (_PPCI_) | Not Null         | 'Y'                              | WaitlistEntryID |
| Compute                  | Grouping                                         | Not Null         | in ('Ambulance PCI', 'Self PCI') | Please see [Grouping Calculation](STEMI-specification.md#2-grouping-calculation) for details|
| Compute                  | Reperfusion Time                                 | Null             | <= 90                            | Please see [Reperfusion Time Calculation](STEMI-specification.md##3-reperfusion-time-calculation) for details|


???+ important "Notes"
	* From Grouping Calculation, the first two conditions (row 1 and 2) are redundant when Grouping column has value "Ambulance PCI" or "Self PCI"
	* When Grouping column has value "Ambulance PCI" or "Self PCI", it also means the "Data Quality" records (whose grouping value are "PCI No Data") are also excluded

### Balloon Non-120 PCI Indicator

'AND' relationship between each condition in the table below

| Table Name               | Column Name                                      | Column Nullable?  | Indicator Value(s) | Join Column      |
|--------------------------|--------------------------------------------------|-------------------|--------------------|------------------|
| CardiacStemiActivity     | FibrinolysisAdministered_CD                      | Null (_data_)     | 'N'                | WaitlistEntryID |
| CardiacOfflistingDetails | Cath_ProcedureDonePrimaryReperfusionIND (_PPCI_) | Not Null          | 'Y'                | WaitlistEntryID |
| CardiacStemiActivity     | PPDirectFieldToCath_IND                          | Null (*Y/N only*) | != 'Y'             | WaitlistEntryID |
| Compute				   | Grouping |Not Null| 'Non-PCI'| Please see [Grouup Calculation](STEMI-specification.md#2-grouping-calculation) for details|
| Compute				   | Reperfusion Time |Null| <= 120| Please see [Reperfusion Time Calculation](STEMI-specification.md#3-reperfusion-time-calculation) for details|



???+ important "Notes"
	* From Grouping Calculation, the first three conditions (row 1, 2 and 3) are redundant when Grouping column has value "Non-PCI"
	* When Grouping column has value "Non-PCI", it also means the "Data Quality" records (whose grouping value are "Non-PCI No Data") are also excluded

### Fibrinolytic 30 Indicator

| Table Name           | Column Name                 | Column Nullable?  | Indicator Value(s) | Join Column      |
|----------------------|-----------------------------|-------------------|--------------------|------------------|
| CardiacStemiActivity | FibrinolysisAdministered_CD | Null (_data_)     | 'Y'                | WaitlistEntryID} |
| CardiacStemiActivity | PPDirectFieldToCath_IND     | Null (*Y/N only*) | != 'Y'             | WaitlistEntryID} |
| Compute              | Lytic Grouping              | Not Null          | 'Lytic'            | Please see [Lytic Grouping Calculation](STEMI-specification.md#4-lytic-grouping-calculation) for details |
| Compute              | Lytic Time                  | Null              | <= 30              | Please see [Lytic Time Calculation](STEMI-specification.md#5-lytic-time-calculation) for details |


???+ important "Notes"
	* From Lytic Grouping Calculation, the first tow conditions (row 1 and 2) are redundant when Lytic Grouping column has value "Lytic"
	* When Lytic Grouping column has value "Non-PCI", it also means the "Data Quality" records (whose grouping value are "Non-PCI No Data") are also excluded


## Compute Columns Design

| Column Name                  | Source Columns | Column Nullable? | Column Type | Compute Values   | Notes                                                                                                                |
|------------------------------|----------------|------------------|-------------|------------------|----------------------------------------------------------------------------------------------------------------------|
| STEMI Fiscal year and Quater | RemovalDate    | Not Null         | varchar(20) | sample: 17/18 Q1 | The fiscal year starts from April 1st to March 31th next year, April to June is the first quarter of the fiscal year |
| Presentation				   | 3 columns involve presentation calculation|Not Null|varchar(30)|'No Presentation'<br>'Too Many Presentation'<br>'Ambulance'<br>'Self-Transport'<br>'In-Hospital'|See [Presentation Calcution](STEMI-specification.md#1-presentation-calculation) for details|
| Grouping					   | All columns involve grouping calculation|Not Null|varchar(30)|'In-Hospital'<br>'Not PPCI'<br>'Fibrinolysis'<br>Fibrinolysis Contraindicated'<br>'Non-PCI Exclude'<br>'Non-PCI No Data'<br>'PCI No Data'<br>'Ambulance PCI'<br>'Self PCI'<br>'Check'|See [Grouping Calcution](STEMI-specification.md#2-grouping-calculation) for details|
| Reperfusion Time			   | All columns involve reperfusion time calculation|Null|int| minutes|See [Reperfusion Time](STEMI-specification.md#3-reperfusion-time-calculation) for details|
| Lytic Grouping			   | All columns involve lytic grouping calculation|Not Null|varchar(20)|'In-Hospital'<br>'No Lytic'<br>'Direct to Cath Lab'<br>'Missing Location'<br>'Data Quality'<br>'Lytic'<br>'Check'|See [Lytic Grouping](STEMI-specification.md#2-grouping-calculation) for details
| Lytic Time				   | All columns involve reperfusion time calculation | Null|int|minutes| See [Lytic Time](STEMI-specification.md#5-lytic-time-calculation) for details|

### 1. Presentation Calculation

_'OR' relationship between each condition in the table below, first meet condition returns_

| Table Name           | Column Name(s)                                                    | Column Nullable? | Condition         | Calculated Value        |
|----------------------|-------------------------------------------------------------------|------------------|-------------------|-------------------------|
| CardiacStemiActivity | PPAmbulance_IND<br>PPSelfTransport_IND<br>PPInHospitalPatient_IND | Null (Y/N only)  | All  Nulls        | 'No Presentation'       |
| CardiacStemiActivity | Same as above                                                     | Null (Y/N only)  | More than one 'Y' | 'Too Many Presentation' |
| CardiacStemiActivity | PPAmbulance_IND                                                   | Null (Y/N only)  | 'Y'               | 'Ambulance'             |
| CardiacStemiActivity | PPSelfTransport_IND                                               | Null (Y/N only)  | 'Y'               | 'Self-Transport'        |
| CardiacStemiActivity | PPInHospitalPatient_IND                                           | Null (Y/N only)  | 'Y'               | 'In-Hospital'           |


???+ danger "Discusss"
	* Presentation column seems not used anywhere in Excel Template file for calculation
	* According to Excel file "Scordcard STEMI Report Specificaitons", there are more rules should be added, such as if PPFieldToEDPCIHospital_IND = 'Y', then PPAmbulance_IND must be 'Y' and PPFieldToEDNonPCIHospital_IND must be 'N', otherwise the case should be excluded for indicator calculation
	* However, from Wait Time applicatio UI, user actually cannot enter such bad data into Wait Time database


### 2. Grouping Calculation

_'OR' relationship between each condition in the table below, first meet condition returns_

| Table Name               | Column Name(s)                          | Column Nullable?  | Condition         | Calculated Value               |
|--------------------------|-----------------------------------------|-------------------|-------------------|--------------------------------|
| CardiacStemiActivity     | PPInHospitalPatient_IND                 | Null (Y/N only)   | 'Y'               | 'In-Hospital'                  |
| CardiacOfflistingDetails | Cath_ProcedureDonePrimaryReperfusionIND | Not Null          | 'N'               | 'Not PPCI'                     |
| CardiacStemiActivity     | FibrinolysisAdministered_CD             | Null (Y,N,F,Null) | in ('Y',**Null**) | 'Fibrinolysis'                 |
| CardiacStemiActivity     | FibrinolysisAdministered_CD             | Null (Y,N,F,Null) | 'F'               | 'Fibrinolysis Contraindicated' |
| CardiacStemiActivity	   |PPAmbulance_IND<br>PPFieldToEDNonPCIHospital_IND<br>SiteName for PP_NonPCISiteNumber<br>|Null (Y/N only)<br>Null (Y/N only)<br>Null|'Y' +<br>'Y' +<br>in('Other',Null) |'Non-PCI Exclude'|
| CardiacStemiActivity	   |PPSelfTransport_IND<br>PPSelfTransportToNonPCIHospital_IND<br>SiteName for PP_NonPCISiteNumber<br>|Null (Y/N only)<br>Null (Y/N only)<br>Null|'Y' +<br>'Y' +<br>in('Other',Null) |'Non-PCI Exclude'|
| CardiacStemiActivity	   |PPAmbulance_IND<br>PPFieldToEDNonPCIHospital_IND<br>( First Hospital Arrival DateTime<br>First Balloon Inflation/Device DateTime<br>)|Null (Y/N only)<br>Null (Y/N only)<br>Null<br>Null|'Y' +<br>'Y' +<br> (Null or <br>Null or<br>First Hospital Arrival DateTime > First Balloon Inflation/Device DateTime )|'Non-PCI No Data'|
| CardiacStemiActivity	   |PPSelfTransport_IND<br>PPSelfTransportToNonPCIHospital_IND<br>( First Hospital Arrival DateTime<br>First Balloon Inflation/Device DateTime<br>)|Null (Y/N only)<br>Null (Y/N only)<br>Null<br>Null|'Y' +<br>'Y' +<br> (Null or <br>Null or<br>First Hospital Arrival DateTime > First Balloon Inflation/Device DateTime )|'Non-PCI No Data'|
| CardiacStemiActivity	   |PPAmbulance_IND<br>(PPFieldToEDPCIHospital_IND <br>PPDirectFieldToCath_IND)<br>( **First Contact with Paramedics DateTime**<br>First Balloon Inflation/Device DateTime<br><br>)|Null (Y/N only)<br>Null (Y/N only)<br>Null (Y/N only)<br>Null<br>Null|'Y' + <br>('Y' or<br>'Y') +<br> (Null or <br>Null or<br> **First Contact with Paramedics DateTime** > First Balloon Inflation/Device DateTime )|'PCI No Data'|
| CardiacStemiActivity	   |PPSelfTransport_IND<br>PPSelfTransportToPCIHospital_IND<br>( First Hospital Arrival DateTime<br>First Balloon Inflation/Device DateTime<br>)|Null (Y/N only)<br>Null (Y/N only)<br>Null<br>Null|'Y' +<br>'Y' +<br> (Null or <br>Null or<br>First Hospital Arrival DateTime > First Balloon Inflation/Device DateTime )|'PCI No Data'|
| CardiacStemiActivity	   |PPAmbulance_IND<br>(PPFieldToEDPCIHospital_IND <br>PPDirectFieldToCath_IND)|Null (Y/N only)<br>Null (Y/N only)<br>Null (Y/N only)|'Y' + <br>('Y' or<br>'Y') | 'Ambulance PCI' |
| CardiacStemiActivity	   |PPSelfTransport_IND<br>PPSelfTransportToPCIHospital_IND|Null (Y/N only)<br>Null (Y/N only)|'Y' +<br>'Y' |'Self PCI'|
| CardiacStemiActivity	   |PPAmbulance_IND<br>PPFieldToEDNonPCIHospital_IND|Null (Y/N only)<br>Null (Y/N only)|'Y' + <br>'Y' | 'Non-PCI' |
| CardiacStemiActivity	   |PPAmbulance_IND<br>PPSelfTransportToNoPCIHospital_IND|Null (Y/N only)<br>Null (Y/N only)|'Y' + <br>'Y' | 'Non-PCI' |
| else||||'Check'|

???+ danger "Discuss"
	* Row 5 formula: Except "Other" as SiteName for PP_NonPCISiteNumber, there are possible site names "Medical Facility Outside of Country" and "Medical Facility Outside of Ontario". Record with these two site name should also fall into 'Non-PCI Exclude' bucket. Luckily, Wait time production database has no any record has site name for PP_NonPCISiteNumber as "Other", "Medical Facility Outside of Country" nor "Medical Facility Outside of Ontario".

### 3. Reperfusion Time Calculation

_'OR' relationship between each condition in the table below, first meet condition returns_

| Table Name                      | Column Name(s) | Column Nullable? | Condition | Calculated Value |
|---------------------------------|----------------|------------------|-----------|------------------|
|Compute	 					  | Grouping|Not Null| in ('In-Hospital',<br> 'Not PPCI',<br>  'Fibrinolysis',<br>  'Fibrinolysis Contraindicated',<br> 'Non-PCI Exclude',<br>  'Non-PCI No Data',<br>  'PCI No Data',<br>  'Check')| Null|
|Compute<br>CardiacStemiActivity  | Grouping<br>FirstBalloonInflation_Date FirstBalloonInflation_Time<br>FirstContactParamedics_Date FirstContactParamedics_Time|Not Null<br>Null<br>Null|'Ambulance PCI'| (First Balloon Inflation/Device DateTime - First Contact with Paramedics DateTime) in rounded minutes|
|Compute<br>CardiacStemiActivity  | Grouping<br>FirstBalloonInflation_Date FirstBalloonInflation_Time<br>FirstHospitalArrival_Date FirstHospitalArrival_Time|Not Null<br>Null<br>Null|'Self PCI'| (First Balloon Inflation/Device DateTime - First Hospital Arrival DateTime) in rounded minutes|
|Compute<br>CardiacStemiActivity  | Grouping<br>FirstBalloonInflation_Date FirstBalloonInflation_Time<br>FirstHospitalArrival_Date FirstHospitalArrival_Time|Not Null<br>Null<br>Null|'Non PCI'| (First Balloon Inflation/Device DateTime - First Hospital Arrival DateTime) in rounded minutes|

### 4. Lytic Grouping Calculation

_'OR' relationship between each condition in the table below, first meet condition returns_

| Table Name           | Column Name(s)                         | Column Nullable?                   | Condition             | Calculated Value     |
|----------------------|----------------------------------------|------------------------------------|-----------------------|----------------------|
| CardiacStemiActivity | PPInHospitalPatient_IND                | Null (Y/N only)                    | 'Y'                   | 'In-Hospital'        |
| CardiacStemiActivity | FibrinolysisAdministered_CD            | Null (Y,N,F,Null)                  | in ('N','F',**Null**) | 'No Lytic'           |
| CardiacStemiActivity | PPDirectFieldToCath_IND                | Null (Y/N only)                    | 'Y'                   | 'Direct to Cath Lab' |
| CardiacStemiActivity|( PPFieldToEDNonPCIHospital_IND<br>PPSelfTransportToNonPCIHospital_IND)+<br>SiteName for PP_NonPCISiteNumber|Null (Y/N only)<br>Null (Y/N only)<br>Null|('Y' or<br>'Y') + <br> in ('Other','Medical Facility Outside of Country','Null')|'Missing Location'|
| CardiacStemiActivity | FirstHospitalArrival_Date<br>FirstHospitalArrival_Time<br>InitialTherapy_DateGiven_Date<br>InitialTherapy_DateGiven_Time|Null<br>Null| Any column is null or <br>First Hospital Arrival DateTime > Initial Therapy Given DataTime| 'Data Quality'|
| CardiacStemiActivity | PPAmbulance_IND<br>PPSelfTransport_IND | Null (Y/N only)<br>Null (Y/N only) | 'Y' or<br>'Y'         | 'Lytic'              |
| else                 |                                        |                                    |                       | 'Check'              |

???+ note "Note"
	* In Wait Time production database, there is no any record that PP_NonPCISiteNumber value is "Other" or "Facility OUtside of Country/Ontario"


### 5. Lytic Time Calculation

_'OR' relationship between each condition in the table below, first meet condition returns_

| Table Name | Column Name(s) | Column Nullable? | Condition                                                                                                | Calculated Value |
|------------|----------------|------------------|----------------------------------------------------------------------------------------------------------|------------------|
| Compute    | Lytic Grouping | Not Null         | in ('In-Hospital',<br> 'No Lytic', <br>'Direct to Cath Lab',<br>'Missing Location', <br>'Data Quality' ) | Null             |
| Compute	 | Lytic Grouping<br>FirstHospitalArrival_Date<br>FirstHospitalArrival_Time<br>InitialTherapy_DateGiven_Date<br>InitialTherapy_DateGiven_Time|Not Null<br>Null<br>Null| 'Lytic'|Initial Therapy Given DateTime - First Hospital Arrival DateTime rounded in minutes|

### 6. Lytic Site Calculation

_'OR' relationship between each condition in the table below, first meet condition returns_

| Table Name                      | Column Name(s) | Column Nullable? | Condition                                                    | Calculated Value |
|---------------------------------|----------------|------------------|--------------------------------------------------------------|------------------|
| Compute                         | Lytic Grouping | Not Null         | in ('In-Hospital',<br> 'No Lytic', <br>'Direct to Cath Lab') | Null             |
| Compute<br>CardiacStemiActivity | Grouping<br> (PPFieldToEDPCIHospital_IND<br>PPSelfTransportToPCIHospital_IND)|Not Null<br>Null (Y/N only)<br>Null (Y/N only)|'Data Quality' + <br>('Y' or<br>'Y') | [Planned Service Location ( SiteName for AcceptanceSiteNumber)] + "Data Quality"|
| Compute<br>CardiacStemiActivity | Grouping<br> (PPFieldToEDNonPCIHospital_IND<br>PPSelfTransportToNonPCIHospital_IND)<br>Site Name for PP_NonPCISiteNumber|Not Null<br>Null (Y/N only)<br>Null (Y/N only)<br>Null|'Data Quality' + <br>('Y' or<br>'Y') +<br> Empty/Null| NULL|
| Compute<br>CardiacStemiActivity | Grouping<br> (PPFieldToEDNonPCIHospital_IND<br>PPSelfTransportToNonPCIHospital_IND)|Not Null<br>Null (Y/N only)<br>Null (Y/N only)|'Data Quality' + <br>('Y' or<br>'Y') | [Site Name for PP_NonPCISiteNumber] + "Data Quality"|
|CardiacStemiActivity			  |(PPFieldToEDPCIHospital_IND<br>PPSelfTransportToPCIHospital_IND)|Null (Y/N only)<br>Null (Y/N only)|'Y' or<br>'Y' | [Planned Service Location (SiteName for AcceptanceSiteNumber)]|
|CardiacStemiActivity			  |(PPFieldToEDNonPCIHospital_IND<br>PPSelfTransportToNonPCIHospital_IND)|Null (Y/N only)<br>Null (Y/N only)|'Y' or<br>'Y' | [Site Name for PP_NonPCISiteNumber]|

???+ danger "Discuss"
	* From business perspecitve, row 3 means if Lytic Grouping calcuation result is 'Missing Location", then Lytic Site Calcuation is empty? Otherwise, how about "Medical Facility Outside of Country", "Medical Facility Outside of Ontario"? Row 2's logic couldn't never meet, since when Lytic Grouping result is 'Data Quality", it already exclude Null site.