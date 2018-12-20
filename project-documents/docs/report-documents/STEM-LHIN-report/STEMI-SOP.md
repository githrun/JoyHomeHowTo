### A. Overview

### B.	Summary Flowchart

### C.	Detailed Work Instructions

**Process Trigger:** Each fiscal quarter (Walter give us cutoff day)<br>
**Responsible:** Dev Team

#### C.1 Make LHIN STEMI Performance Database Cut		(1H)

|Step|Process Step Description|General Notes|
|--|--|--|
|Create Database Snapshot|Open SQL Management Console and connect to WTISCCNDB2 server. Start a new query by clicking the New Query button and paste the following:<br>**USE STEMI_DataDefinitions**<br>**EXEC  STEMI_DataDefinitions.dbo.usp_create_cut**<br><br>Execute query by pressing F5 on your keyboard.|Must have db.owner access to STEMI_DataDefinitions|
|Populate Tables|Within the same database start a new query and paste the following:<br>**USE STEMI_DataDefinitions**<br>**EXEC dbo.usp_CCN_Insert_Main_STEMI_Cases** <br><br>Execute query by pressing F5 on your keyboard.||

#### C.2 Generate LHIN STEMI Performance Reports		(1H)

|Step|Process Step Description|General Notes|
|--|--|--|
|Get latest code|Navigate to SOP server folder “**C:\SOPExecution\LHINSTEMIPerformance**”, get latest version by right clicking on folder “**LHINSTEMIPerformance**” and click on SVN Update.||
|Generate reports|Open Command Prompt as Administrator.<br><br>Copy and paste the following:<br>**cd C:\SOPExecution\LHINSTEMIPerformance**<br><br>Press enter on keyboard.<br><br>Copy and paste the following:<br>**”C:\Program Files (x86)\IronPython 2.7\ipy.exe” lhin_stemi_performance_export.py** <br><br>Press enter on keyboard.|This step takes about 0.5-1 hour.<br>Script finished once the following line appears: C:\SOPExecution\LHINSTEMIPerformance|
|Check reports generated|Check for the reports in the output to ensure that all reports (14) generated:C:\SOPExecution\LHINSTEMIPerformance \YY-YY\Q||
|Copy reports to Y drive|Copy reports From:C:\SOPExecution\LHINSTEMIPerformance\YY-YY\Q<br>To:Y:\BI\Data Management\Reports\STEMI Quarterly Performance Reports|**Make sure you copy to right place by date, change the folder names to match the year and quarter style. This naming convention is used by email notification scripts to attach generated reports**<br><br>For example:\2018-19\Q1 Apr-Jun|

#### C.3 Review LHIN STEMI Performance Reports By Business Team		(1H)



#### C.4 Distribute LHIN STEMI Performance Reports		(1H)

**External Depedency Files:**

* Y:\CLINICAL\1Staff(clinical)\Sabina\Quarterly STEMI LHIN PMM Report  Distribution\\**new_master.xlsx** and **new_ems_master.xlsx**


|Step|Process Step Description|General Notes|
|--|--|--|
|Generate Test Emails|Open Command Prompt but **CAN NOT as an Administrator**. <br><br>Copy and paste the following:<br>**cd C:\SOPExecution\LHINSTEMIPerformance**<br>Press enter on keyboard.<br><br>Copy and paste the following:<br>**python email_ems.py sit**<br>Press enter on keyboard.<br><br>Copy and paste the following:<br>**python email_lhin.py sit**<br>Press enter on keyboard.|Testding email recipients are defined in setting "EmailToInternalForSITTesting" in config file|
|Verify emails|From new emails in outlook inbox, each should have 14 new emails||
|Deliever Emails|Open Command Prompt but **CAN NOT as an Administrator**. <br><br>Copy and paste the following:<br>**cd C:\SOPExecution\LHINSTEMIPerformance**<br>Press enter on keyboard.<br><br>Copy and paste the following:<br>**python email_ems.py prod**<br>Press enter on keyboard.<br><br>Copy and paste the following:<br>**python email_lhin.py prod**<br>Press enter on keyboard.|The email scripts read two excel files that contain the recipients of these reports.<br><br>Location of two email lists:<br>Y:\CLINICAL\1Staff(clinical)\Sabina\Quarterly STEMI LHIN PMM Report  Distribution\\**new_master.xlsx** and **new_ems_master.xlsx**|




