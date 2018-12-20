<!--# Cardiac Program Centers in Ontario-->

|Cardiac Center Name  | Abbreviation        |Facility Id|Site Id(s)|Advance?|STEMI Site|
|---------------------|-------------------------|-------|---------|:---:|--|
|Kingston General Hospital						|KGH    |693      |4105|Y|Same|
|St. Mary's General Hospital					|SMGH   |699      |4180|Y|Same|
|Southlake Regional Health Centre				|SRHC   |736      |4001|Y|Same|
|Peterborough Regional Health  Centre			|PRHC   |771      |4073|Y|Same|
|St. Michael's Hospital							|SMH    |852      |3985|Y|Same|
|Michael Garron Hospital						|MGH    |858      |4209|**N**|**NA**|
|Windsor Regional Hospital						|WRH    |927 & 933|4142 & 4774|Y|Same|
|Thunder Bay Regional Health Sciences Centre	|TBRHSC |935      |4315|Y|Same|
|London Health Sciences Centre					|LHSC   |936      |4247 & 4310|**Partial**|**4310**|
|Hamilton Health Sciences						|HHS    |942      |4231|Y|Same|
|University Health Network						|UHN    |947      |4265 & 4266|**Partial**|**4265**|
|Trillium Health Partners						|THP    |949      |4090|Y|Same|
|William Osler Health System					|WOHS   |951      |4685|Y|Same|
|Sunnybrook Health Sciences Centre				|SHSC   |953      |4205|Y|Same|
|Rouge Valley Health System						|RVHS   |954      |4139|Y|Same|
|Health Sciences North							|HSN    |959      |4063|Y|Same|
|University of Ottawa Heart Institute			|UOHI   |961      |4303|Y|Same|
|Niagara Health System							|NHS    |962      |4045|**N**|**NA**|
|Sault Area Hospital							|SAH    |965      |3972|**N**|**NA**|
|ROYAL VICTORIA REGIONAL HEALTH CENTRE			|RVH    |606	  |3987|**N**|**NA**|

???+ danger "Document - Missing Contents in Specification Excel"
	* No Cardiac Centers and Sites List for STEMI Scorecard
	* Doesn't mention the specially handling to Facility Number 927

???+ note "Discovery - Current Process Issues"
	* Current code for CATH case only filters data by include/exclude criteria without checking against above Cardiac Centers list
	* Current code for STEMI case has hard code filter for 16 facilities (see the Advance column with value 'Y' or 'Partial' in above list)
	* Since CRS doesn't support filter by SiteNumber, Service Desk needs to manually delete data from 6 sites which don't have STEMI practice for STEMI scorecard if there is any such data. For details, please see Step 2.3 in **Y:\SERVICE DESK\Policies & Procedures\Standard Operating Procedures\Reporting\CS08 - Quarterly Performance Measuremant and Management Data Extract.docx**. Step 2.3 also misses to include "Niagara Health System" in delete list
	* The facility name and abbreviation are not read from database but hardcoded in Excel data extract file.

???+ important "Suggestion For ETL enhancement"
	* The facility name and abbrevation should read from database table
	* The facility Id 927 is transformed as facility Id 933, which only have clinic data before 2016 August. ETL should keep this  data transformation.
	* THe valid STMMI Sites list should also driven by database table so that to avoid manually delete the raw data used by report.
