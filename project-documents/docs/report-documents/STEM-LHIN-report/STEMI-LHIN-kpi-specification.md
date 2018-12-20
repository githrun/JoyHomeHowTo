
### Minimum Data Columns Required

 **Server:** WTISCCNDB2
 **Database:** STEMI_DataDefinition

| Display Name  |  Table Name | Column Name |Column Nullable?|Column Type|Display On Report?|                                Description|
|--------------|-------------|---------------|-----------|------------------|------------|--|
|STEMI case Id (Entry Id)|CardiacWaitListEntry | WaitlistEntryID|Not Null|numeric(18,0)|No||
|PCI Hospital Id (SiteId)|CardiacWaitListEntry|AcceptanceSiteNumber|Null (no null data)|numeric(18,0)|No||
|PCI Hospital Name (SiteName) |Site|SiteName|Not Null|varchar(50)|No |Site Name by AcceptanceSiteNumber |
|PCI LHIN Number|LHIN|LHINNumber<br>(Join via LHINFacilityRel, FacilitySiteRel|Not Null|numeric(18,0)|No| PCI LHIN Number by AcceptanceSiteNumber|
|PCI LHIN Name|LHIN|LHINName<br>(Join via LHINFacilityRel, FacilitySiteRel|Not Null|varchar(50)|**Yes**|PCI LHIN Name by AcceptanceSiteNumber|
|Non-PCI Hospital Id|CardiacStemiActivity|PP_NonPCISiteNumber|Null|numeric(18,0)|No||
|Non-PCI Hospital Name|Site|SiteName|Not Null|varchar(50)|No|Name of Non-PCI Hospital (Join Site by PP_NonPCISiteNumber) |
|Non-PCI LHIN Number|LHIN|LHINNumber<br>(Join via LHINFacilityRel, FacilitySiteRel|Not Null|numeric(18,0)|No| Non-PCI LHIN Number by PP_NonPCISiteNumber|
|Non-PCI LHIN Name|LHIN|LHINName<br>(Join via LHINFacilityRel, FacilitySiteRel|Not Null|varchar(50)|No|Non-PCI LHIN Name by PP_NonPCISiteNumber|
|Removal Date| CardiacWaitListEntry|RemovalDate|Null|datetime|No|Used to calcuate Quarter of the year|
|Ambulance|CardiacStemiActivity|PPAmbulance_IND|Null (_Y/N only_)|char(1)|No|Compute Presentation|
|Direct Field to Cath Lab|CardiacStemiActivity|PPDirectFieldToCath_IND|Null (_Y/N only_)|char(1)|No|indicator for patients who present via paramedic services|
|Field to ED of PCI Hospital|CardiacStemiActivity|PPFieldToEDPCIHospital_IND|Null (_Y/N only_)|char(1)|No|Indicator to identify if ambulance patient presentation was from field to ED of PCI hospital|
|Field to ED of Non-PCI Hospital|CardiacStemiActivity|PPFieldToEDNonPCIHospital_IND|Null (_Y/N only_)|char(1)|No|Indicator to identify if ambulance patient presentation was from field to ED of Non-PCI hospital|
|Self-Transport|CardiacStemiActivity|PPSelfTransport_IND|Null (_Y/N only_)|char(1)|No|Compute Presentation|
|Self-Transport to PCI Hospital|CardiacStemiActivity|PPSelfTransportToPCIHospital_IND|Null (_Y/N only_)|char(1)|No|Indicator to identify if patient that self-present was to PCI hospital|
|Self-Transport to Non-PCI Hospital|CardiacStemiActivity|PPSelfTransportToNonPCIHospital_IND|Null (_Y/N only_)|char(1)|No|Indicator to identify if patient that self-present was to Non-PCI hospital|
|Fibrinolysis Administered|CardiacStemiActivity|FibrinolysisAdministered_CD|Null (Y,N,F,Null)|char(1)|No|Indicator Formula|
|First Contact with Paramedics DateTime|CardiacStemiActivity|FirstContactParamedics_Date<br>FirstContactParamedics_Time<br>If any colum is null value, then merged value is null|Null|date<br>time(7)|No|Indicator Start for patients who present via paramedic services. |
|Ambulance ECG DateTime|CardiacStemiActivity|AmbulanceECG_Date<br>AmbulanceECG_Time<br>If any colum is null value, then merged value is null|Null|date<br>time(7)||
|First Hospital Arrival DateTime|CardiacStemiActivity|FirstHospitalArrival_Date<br>FirstHospitalArrival_Time<br>If any colum is null value, then merged value is null|Null|date<br>time(7)|No|Indicator Start for patients that self-present to ED|
|First Hospital ECG DateTime|CardiacStemiActivity|FirstHospitalECG_Date<br>FirstHospitalECG_Time<br>If any colum is null value, then merged value is null|Null|date<br>time(7)||
|Fibrinolysis Given DateTime|CardiacStemiActivity|InitialTherapy_DateGiven_Date<br>InitialTherapy_DateGiven_Time<br>If any colum is null value, then merged value is null|Null|date<br>time(7)|No||
|Qualifying ECG DateTime|CardiacStemiActivity|QualifyingECG_Date<br>QualifyingECG_Time<br>If any colum is null value,then merged value is null|Null|date<br>time(7)|No||
|First Balloon Inflation/Device DateTime|CardiacStemiActivity|FirstBalloonInflation_Date<br>FirstBalloonInflation_Time<br>If any colum is null value,then merged value is null|Null|date<br>time(7)|No|Indicator end|

