import React, { Component } from "react";


import * as Survey from "survey-react";
import * as SurveyPDF from "survey-pdf";



import "survey-react/survey.css";
import "./index.css";


class SurveyPdfComponent extends Component {
    constructor() {
        super();

    }
    render() {


        Survey.StylesManager.applyTheme("bootstrap");

        const json = {
            "pages": [
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
                            type: "boolean",
                            name: "covidExposureQ",
                            title:
                                "To the best of your knowledge, during the past 14 days, have you been within 6 feet of a person with a pending or lab confirmed case of COVID-19 for at least 15 minutes, had direct contact with that person's mucus or saliva, or been contacted by public health and told you were in close contact with someone known to have COVID-19?  ",
                            isRequired: true
                        }
                    ],
                    title: "COVID Exposure "
                },
                {
                    name: "covidDiagnosisPage",
                    elements: [
                        {
                            type: "boolean",
                            name: "covidTestingQ",
                            title:
                                "Are you under evaluation for COVID-19 (e.g., waiting for the results of a viral test to confirm infection)?",
                            isRequired: true
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
        const survey = new Survey.Model(json);



        function saveSurveyToPdf(filename, surveyModel, pdfWidth, pdfHeight) {
            var options = {
                fontSize: 14,
                margins: {
                    left: 10,
                    right: 10,
                    top: 10,
                    bot: 10
                },
                format: [pdfWidth, pdfHeight]
            };
            var surveyPDF = new SurveyPDF.SurveyPDF(json, options);
            surveyPDF.data = surveyModel.data;
            surveyPDF.save(filename);
        }
        document.getElementById("saveToPDFbtn").onclick = function () {
            var pdfWidth = survey.pdfWidth || 210;
            var pdfHeight = survey.pdfHeight || 297;
            saveSurveyToPdf("surveyResult.pdf", survey, pdfWidth, pdfHeight);
        };



        function sendDataToServer(survey) {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "mongodb+srv://GeneralUser:1234@cluster0.velcv.mongodb.net/VirusSurveyDatabase?retryWrites=true&w=majority");
            xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            xhr.send(JSON.stringify(survey.data));
        };

        survey
            .onComplete
            .add(function (result) {
                document
                    .querySelector('#surveyElement')
                    .textContent = "Result JSON:\n" + JSON.stringify(result.data, null, 3);
            });
        survey.data = {

        };

        // survey.onComplete.add(function (survey, options) {
        //     var xhr = new XMLHttpRequest();
        //     xhr.open("POST", "mongodb+srv://GeneralUser:1234@cluster0.velcv.mongodb.net/VirusSurveyDatabase?retryWrites=true&w=majority");
        //     xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        //     xhr.send(JSON.stringify(survey.data));
        // });

        return (
            <Survey.Survey
                model={survey}
                onComplete={sendDataToServer}
            // onComplete={data => console.log(data.valuesHash)}
            />
        );
    }
}

export default SurveyPdfComponent;

