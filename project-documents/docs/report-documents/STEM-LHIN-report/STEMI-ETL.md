## Flow Chart

## Dev Team

1. Run **usp_create_cut** stored procedure on **WTISCCNDB2** server **STEMI_DataDefinition** database, this script runs following tasks:
	* Get lastest record from DataAudit table which contains the time stamp of previous data cut, the time stamp is in the format of "yyyyMMdd_hh_mm_ss"
	* Rename current tables with postfix read from DataAudit in above steps
	* Copy following 11 tables/views data from **WTISCCNDB2** database **WCPPRDDB1** and **CCN_Reference** to **STEMI_DataDefinition**

    |Database|Table Name|Notes|
    |--|--|--|
    |WCPPRDDB1|Site||
    |WCPPRDDB1|LHIN||
    |WCPPRDDB1|Facility||
    |WCPPRDDB1|CardiacWaitListEntry||
    |WCPPRDDB1|CardiacOfflistingDetails||
    |WCPPRDDB1|CardiacReferral||
    |CCN_Reference|vw_CCN_FacilitySiteRel|view to WCPPRDDB1.CCN_FacilitySiteRel that transform Facility Number 927 to 933|
    |CCN_Reference|CCN_ListOfPCISites|The list match STEMI sites in [Cardiac Program Centers List](../QPMM-report/data-transformation.md#cardiac-program-centers-list) except for the site from Facility 927|
	|CCN_Reference|CCN_LHIN_Abbreviations||
	|CCN_Reference|CCN_ListOfExcludedSites|Exclude all special sites (site number > 9999) and site number 4631,4406|
	|CCN_Reference|CCN_LHIN_Hospital_Relations||

	* Calculate current data cut time stamp by the date of today in the format of "yyyyMMdd_hh_mm_ss" and insert it to DataAudit table

2. Run **usp_CCN_Insert_Main_STEMI_Case** stored procedure on WTISCCNDB2 server STEMI_DataDefinition database, this script runs following tasks:
	* Delete all records in reports data tables

    |Table Name|
    |--|
    |CCN_STEMI_Cases|
    |CCN_STEMI_ECG_Cases|
    |CCN_STEMI_Lytic_Cases|
    |CCN_STEMI_PPCI_90_to_PCI_Cases|
    |CCN_STEMI_PPCI_120_to_NonPCI_Cases|

	* run following stored procedures to popluate above report data tables:

	|Stored Procedure| Description|
    |--|--|
    |usp_CCN_Insert_STEMI_Cases| Insert data to CCN_STEMI_Cases table by [STEMI Case Definition](STEMI-LHIN-tech-specification.md#stemi-case-definition)|
    |usp_CCN_Insert_STEMI_ECG_Cases|Insert data to CCN_STEMI_ECG_Cases from CCN_STEMI_Cases|
    |usp_CCN_Insert_STEMI_Lytic_Cases|Insert data to CCN_STEMI_Lytic_Cases from CCN_STEMI_Cases|
    |usp_CCN_Insert_STEMI_PPCI_90_to_PCI_Cases|Insert data to CCN_STEMI_PPCI_90_to_PCI_Cases from CCN_STEMI_Cases|
    |usp_CCN_Insert_STEMI_PPCI_120_to_NonPCI_Cases|Insert data to CCN_STEMI_PPCI_120_to_NonPCI_Cases from CCN_STEMI_Cases|


## Business Team