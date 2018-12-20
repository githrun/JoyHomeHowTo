#### Questionaire Type

| Type Value | Type meaning       | Latest Version Id |
|------------|--------------------|-------------------|
| 1          | Site Assessemnt    | 10                |
| 2          | Process Assessment | 11                |
| 3          | Case Evaluation    | 13                |

#### Modality

| Type Value | Type meaning       |
|------------|--------------------|
| 1          | TTE    |
| 2          | TEE |
| 4          | STress    |

#### Expedited
| Type Value | Type meaning       |
|------------|--------------------|
| Null         | Full Assessment    |
| 0          | Inadequate Study    |
| 1          | Adequate Study |
| 2          | Demographics Only    |


### UI Render

For Site Review and Process Review, the UI render sections, within each section, render sub sections, within each subsections render each question ,display questionTitleText, within each question recorder observations and recommendations

For Case Review, for all questions whose modality match Case Review's modality,  the UI render by question's Expectation group, and within each Expectation, render by QuestionTitleText, and then add QuestionText below the QuestionTitleText.
checkbox is rendered from observation

If QuestionTitleText is empty (for example, when Modality is 4), then QuestionText would show within each Expectation