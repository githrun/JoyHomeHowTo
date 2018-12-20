# Business Requirements

## Business and Data Transformation
* The Cardiac Scoredcard shows [Elective CATH cases](cardiac-specification.md#elective-cath-case-definition) data from 20 Cardiac Program Centers. Please see [Cardiac Program Centers](data-transformation.md#cardiac-program-centers-list) below for the whole list.

* The STEMI Scorecard shows [STEMI cases](STEMI-specification.md#stemi-case-definition) from 16 Advance Cardiac Program Centers. Please see [Cardiac Program Centers](data-transformation.md#cardiac-program-centers-list) below with Advance Column value 'Y' or 'Partial' for the whole list.

* The data from facility number `927 - HOTEL-DIEU GRACE HOSPITAL` is transfermed as facility number `933 - WINDSOR REGIONAL HOSPITAL`

* The report shows the trend of previous eight quarters' data so that the report has date range parameters.

## Cardiac Program Centers List
{!report-documents/QPMM-report/cardiac-center-list.md!}