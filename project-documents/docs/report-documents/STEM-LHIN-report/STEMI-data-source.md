# Business Requirements

## Generation Cycle

* Quaterly

## Data Source


| Server | Database Name |Description|
|--------|--------|--|
|WTISCCNDB2|STEMI_DataDefinition|The database contains data cut script and data cut tables cut used for the report |
|WTISCCNDB2|WCPRDDB1| this database which contains data replicated from WaitTime Production, STEMI data cut script copy bunch of tables from this database to STEMI_DataDefinition for the report|
|WTISCCNDB2|CCN_Reference|Reference data used by the report|
