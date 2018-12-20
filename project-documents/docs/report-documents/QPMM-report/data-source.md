# Business Requirements

## Generation Cycle

* Quaterly

## Data Source


| Server     | Database Name      | Description    						 |
|------------|--------------------|--------------------------------------|
| WTISCCNDB2 | WCPRDDB1           | The CRS queries run against this database which contains data replicated from WaitTime Production|
| WTISCCNDB2 | CCN_Reference      | The CRS query export staging data to Excel uses view(s) of CCN_Reference database, these views uses WCPRDDB1|
| Y drive    | Staging Excel File | The CRS query results are copied to Excel file from Data Extract Template. Excel File contains Formula calculating intermediate data to generate the QPMM report |
| WTISCCNDB2 | Quarterly_Reports  | The calculated data in the Excel file is imported to the report database, Cyrstal Report query report database data to generate QPMM report for the quarter      |

