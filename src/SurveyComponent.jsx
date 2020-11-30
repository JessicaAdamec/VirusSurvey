import React, { Component } from "react";
import * as Survey from "survey-react";
// import 'bootstrap/dist/css/bootstrap.css';
//import "survey-react/survey.css";
import "./index.css";

//Survey.StylesManager.applyTheme("bootstrap");

class SurveyComponent extends Component {
  // constructor() {
  //   super();
  // }
  render() {
    const json = {
      pages: [
        {
          name: "locationTracingPage",
          elements: [
            {
              type: "radiogroup",
              name: "liveQ",
              title: "Where do you live?",
              isRequired: true,
              choices: [
                {
                  value: "OFFCamp",
                  text: "Off Campus "
                },
                {
                  value: "ONCamp",
                  text: "On Campus "
                }
              ]
            },
            {
              type: "text",
              name: "cityQ",
              visibleIf: "{liveQ} = 'OFFCamp'",
              title: "Which city do you live in?",
              valueName: "cityLive",
              isRequired: true,
              requiredErrorText: "Please enter a valid US City name!",
              validators: [
                {
                  type: "text",
                  minLength: 0,
                  maxLength: 0,
                  allowDigits: true
                }
              ],
              textUpdateMode: "onTyping",
              placeHolder: "St. Cloud "
            },
            {
              type: "dropdown",
              name: "campusQ",
              visibleIf: "{liveQ} = 'ONCamp'",
              title: "Where on campus on do you live? ",
              isRequired: true,
              choices: [
                {
                  value: "SBH",
                  text: "Sherburne "
                },
                {
                  value: "CH",
                  text: "Case Hall"
                },
                {
                  value: "HH",
                  text: "Hill Hall "
                }
              ]
            }
          ],
          title: "Location Tracing "
        },
        {
          name: "covidExposurePage",
          elements: [
            {
              type: "radiogroup",
              name: "covidExposureQ",
              title:
                "To the best of your knowledge, during the past 14 days, have you been within 6 feet of a person with a pending or lab confirmed case of COVID-19 for at least 15 minutes, had direct contact with that person's mucus or saliva, or been contacted by public health and told you were in close contact with someone known to have COVID-19?  ",
              isRequired: true, 
              choices: [
                {
                  value: "Yes",
                  text: "I have been in contact. "
                },

                {
                  value: "No",
                  text: "I have NOT been in contact."
                }


              ]
            }
          ],
          title: "COVID Exposure "
        },
        {
          name: "covidDiagnosisPage",
          elements: [
            {
              type: "radiogroup",
              name: "covidTestingQ",
              title:
                "Are you under evaluation for COVID-19 (e.g., waiting for the results of a viral test to confirm infection)?",
              isRequired: true,

              choices: [

                {
                   value: "Yes",
                   text: "Yes, I am"
                },

                {
                  value: "No",
                  text: "No, I am NOT"
                }
              ]
            },
            {
              type: "text",
              name: "testDateQ",
              visibleIf: "{covidTestingQ} = true",
              title: "When were you  tested? ",
              isRequired: true,
              inputType: "date"
            },
            {
              type: "boolean",
              name: "haveCovidQ",
              visibleIf: "{covidTestingQ} = false",
              title:
                "Have you been diagnosed with COVID-19 and not yet cleared to discontinue isolation?",
              isRequired: true
            }
          ],
          title: "COVID Diagnosis"
        },
        {
          name: "symtomsPage",
          elements: [
            {
              type: "checkbox",
              name: "symp1",
              title: "Have you have the following symptoms? ",
              isRequired: false,
              choices: [
                {
                  value: "fever",
                  text: "A Fever 🤒 "
  
                },
                {
                  value: "vomiting ",
                  text: "Vomiting 🤮 "
                },

                {
                   value: "none",
                   text: "none 😄 "
                }
              ]
            },
            {
              type: "checkbox",
              name: "symp2",
              title:
                "Have you have the following symptoms, that are NOT contributed any other condition ? ",
              choices: [
                {
                  value: "item1",
                  text: "Cough "
                },
                {
                  value: "item2",
                  text: "Shortness of breath "
                },
                {
                  value: "item3",
                  text: "Score Throat "
                },

                {
                  value: "none",
                  text: "none 😄 "
               }
              ]
            },
            {
              type: "checkbox",
              name: "symp3",
              title:
                "Have you have the following symptoms, that are NOT contributed any other condition ? ",
              choices: [
                {
                  value: "item1",
                  text: "Muscle aches "
                },
                {
                  value: "item2",
                  text: "Headache"
                },
                {
                  value: "item3",
                  text: "Loss of smell/taste "
                }, 

                {
                  value: "none",
                  text: "none 😄 "
               }
              ]
            }
          ],
          title: "Symtoms ",
          description:
            "NOTE: These symptoms should NOT be contributed to any other condition! ",
          questionsOrder: "random"
        }
      ]
    };

   // const survey = new Survey.Model(json);

    const survey = new Survey.Model(json);

        survey.onUpdateQuestionCssClasses.add(function(survey, options) {
    var classes = options.cssClasses
        classes.mainRoot += " sv_qstn";
    classes.root = "sq-root";
        classes.title += " sq-title"
        classes.item += " sq-item";
        classes.label += " sq-label";
        
    if (options.question.isRequired) {
        classes.title += " sq-title-required";
        classes.root += " sq-root-required";
    }
    if (options.question.getType() === "checkbox") {
        classes.root += " sq-root-cb";
    }
});

        

        return (
            <Survey.Survey
                model={survey}
            />
        );
    }
}

    //return <Survey.Survey model={survey} />;
  //}
//}
export default SurveyComponent;
