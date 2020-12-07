import React, { Component } from "react";
import * as Survey from "survey-react";
import * as SurveyPDF from "survey-pdf";
import "survey-react/survey.css";
//import "./index.css";

var mongo = require('mongodb'); 
const http = require('http');
var fs = require('fs');

class SurveyPdfComponent extends Component {
    
    constructor() {
        super();

    }
    render() {

        const json = {
  
            title: "COVID Survey Tool  ",
            logoPosition: "top",
            pages: [
             {
              name: "locationTracingPage",
              elements: [
               {
                type: "radiogroup",
                name: "liveQ",
                minWidth: "",
                maxWidth: "150px",
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
                ],
                colCount: 2
               },
               {
                type: "text",
                name: "cityQ",
                visibleIf: "{liveQ} = 'OFFCamp'",
                width: "150px  ",
                minWidth: "150px  ",
                maxWidth: "150px  ",
                title: "What city?",
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
                name: "hallQ",
                visibleIf: "{liveQ} = 'ONCamp'",
                width: "150px   ",
                minWidth: "150px   ",
                maxWidth: "150px   ",
                title: "What Hall?",
                isRequired: true,
                choices: [
                 {
                  value: "SBH",
                  text: "Sherburne Hall "
                 },
                 {
                  value: "CH",
                  text: "Case Hall"
                 },
                 {
                  value: "HH",
                  text: "Hill Hall "
                 },
                 {
                  value: "SH ",
                  text: "Shoemaker Hall "
                 }
                ]
               }
              ],
              title: "Location Tracing Question "
             },
             {
              name: "covidExposurePage",
              elements: [
               {
                type: "boolean",
                name: "covidExposureQ",
                title: "To the best of your knowledge, during the past 14 days, have you been within 6 feet of a person with a pending or lab confirmed case of COVID-19 for at least 15 minutes, had direct contact with that person's mucus or saliva, or been contacted by public health and told you were in close contact with someone known to have COVID-19?  ",
                isRequired: true
               },
               {
                type: "radiogroup",
                name: "ResourcesQ",
                visibleIf: "{covidExposureQ} = true",
                title: "🚫ATTENTION 🚫 You are UNABLE  to enter St. Cloud State University Campus. Would you like to be shown resources available to those affected by COVID-19?",
                choices: [
                 {
                  value: "Y",
                  text: "Yes  - to be on informed about available resources. "
                 },
                 {
                  value: "N",
                  text: "No - to continue to COVID 19 Diagnosis Questions "
                 }
                ],
                choicesOrder: "desc"
               },
               {
                type: "checkbox",
                name: "question1",
                visibleIf: "{ResourcesQ} = 'Y'",
                title: "Here are available resources. These options are NOT SELECTABLE ",
                readOnly: true,
                choices: [
                 {
                  value: "CDC",
                  text: "CDC: https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/prevention.html"
                 },
                 {
                  value: "medClinic",
                  text: "SCSU Medical Clinic: https://www.stcloudstate.edu/medicalclinic/"
                 },
                 {
                  value: "CAPS",
                  text: "SCSU CAPS: https://www.stcloudstate.edu/counseling/"
                 },
                 {
                 value: "US_Benefits",
                 text: "US Healthcare and Resources FAQs: https://www.benefits.gov/help/faq/Coronavirus-resources"
                },                 
                ],
                hideIfChoicesEmpty: true
               }
              ],
              title: "COVID 19  Exposure Questions "
             },
             {
              name: "covidDiagnosisPage",
              elements: [
               {
                type: "boolean",
                name: "covidTestingQ",
                title: "Are you under evaluation for COVID-19 such as waiting for the results of a viral test to confirm infection?",
                isRequired: true
               },
               {
                type: "text",
                name: "testDateQ",
                visibleIf: "{covidTestingQ} = true",
                title: "Enter date tested: ",
                isRequired: true,
                inputType: "date"
               },
               {
                type: "boolean",
                name: "haveCovidQ",
                visibleIf: "{covidTestingQ} = false",
                title: "Have you been diagnosed with COVID-19 and not yet  been cleared to discontinue isolation?",
                isRequired: true
               },
               {
                type: "checkbox",
                name: "diagnosedResouces",
                visibleIf: "{haveCovidQ} = true",
                title: "Here are available resources. These options are NOT SELECTABLE ",
                readOnly: true,
                choices: [
                 {
                  value: "DR_CDC",
                  text: "CDC: https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/prevention.html"
                 },
                 {
                  value: "DR_MedClinic",
                  text: "SCSU Medical Clinic: https://www.stcloudstate.edu/medicalclinic/"
                 },
                 {
                  value: "DR_CAPS",
                  text: "SCSU CAPS: https://www.stcloudstate.edu/counseling/"
                 },
                 {
                  value: "DR_US_Benefits",
                  text: "US Healthcare and Resources FAQs: https://www.benefits.gov/help/faq/Coronavirus-resources"
                 },
                ]
               }
              ],
              title: "COVID 19 Diagnosis"
             },
             {
              name: "symptomsPage",
              elements: [
               {
                type: "checkbox",
                name: "symp1",
                title: "Do you have a fever or have been vomiting? ",
                isRequired: true,
                choices: [
                 {
                  value: "fever",
                  text: "Fever 🤒 "
                 },
                 {
                  value: "vomiting ",
                  text: "Vomiting 🤮 "
                 }
                ],
                otherText: "None 🙂",
                hasNone: true,
                noneText: "None 🥳"
               },
               {
                type: "checkbox",
                name: "symp2",
                title: "Have you had any of the following symptoms? ",
                choices: [
                 {
                  value: "cough",
                  text: "Cough 😷"
                 },
                 {
                  value: "shortBreath ",
                  text: "Shortness of breath 🫁💨"
                 },
                 {
                  value: "soreThroat ",
                  text: "Sore Throat 😩"
                 }
                ],
                otherText: "None",
                hasNone: true,
                noneText: "None 🥳"
               },
               {
                type: "checkbox",
                name: "symp3",
                title: "Have you had any aches recently?",
                choices: [
                 {
                  value: "muscleAches",
                  text: "Muscle aches 💪"
                 },
                 {
                  value: "headache",
                  text: "Headache🤕"
                 },
                 {
                  value: "lossSmell",
                  text: "Loss of smell/taste 👃🚫"
                 }
                ],
                otherText: "None",
                hasNone: true,
                noneText: "None 🥳"
               }
              ],
              title: "COVID 19 Related Symptoms ",
              description: "NOTE: These symptoms should NOT be contributed to any other condition! ",
              questionsOrder: "random"
             }
            ],
            showNavigationButtons: "top",
            showCompletedPage: false,
            showProgressBar: "bottom",
            mode: "edit",
            showPreviewBeforeComplete: "showAllQuestions"
           };
        
        
        
        
        const survey = new Survey.Model(json);

        //This is causing an error
        //const PDFDocument = require('pdfkit');

        // var dataString = "Data Retrieved:";

        // const MongoClient = require('mongodb').MongoClient;
        // const uri = "mongodb+srv://GeneralUser:1234@cluster0.velcv.mongodb.net/VirusSurveyDatabase?retryWrites=true&w=majority";

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

        // function GenerateReportPdf() {
        //     RetrieveFromDatabase(function(dataString){
        //         const report = new PDFDocument;
        //         report.pipe(fs.createWriteStream('C:/Users/salar/Desktop/VirusSurveyReport.pdf')); // write to PDF
        //         report.text('Virus Survey Report', {
        //             width: 410,
        //             align: 'center'
        //         });
        //         report.moveDown();
        //         report.text(dataString, {
        //             width: 410,
        //             align: 'left'
        //         });
        //         console.log(dataString);
        //         report.moveDown();
        //         report.text('End of Report', {
        //             width: 410,
        //             align: 'center'
        //         });
        //         report.end();//Closes pdf
        //     });
        // }
        // document.getElementById("genReportPDFbtn").onclick = function () {
        //     GenerateReportPdf();
        // };

        // function RetrieveFromDatabase(callBack)
        // {
        //     const client = new MongoClient(uri, { useNewUrlParser: true });
        //     //This is causing an error
        //     /*
        //     client.connect(err => {
        //         const cursor = client.db("VirusSurveyDatabase").collection("SurveyResults").find();
        //             cursor.each(function(err, doc) {
        //                 if(doc != null)
        //                 {
        //                     dataString = dataString + "\n" + JSON.stringify(doc);
        //                 }
        //                 else
        //                     return callBack(dataString);
        //             });
        //         client.close();//Closes Database Connection
        //     });
        //     */
        // }

        function sendDataToServer(survey) {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "mongodb+srv://GeneralUser:1234@cluster0.velcv.mongodb.net/VirusSurveyDatabase?retryWrites=true&w=majority");
            xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            xhr.send(JSON.stringify(survey.data));
        };

        // survey
        //     .onComplete
        //     .add(function (result) {
        //         document
        //             .querySelector('#surveyElement')
        //             .textContent = "Result JSON:\n" + JSON.stringify(result.data, null, 3);
        //         let Response = result.data;
        //         const MongoClient = require('mongodb').MongoClient;
        //         const uri = "mongodb+srv://GeneralUser:1234@cluster0.velcv.mongodb.net/VirusSurveyDatabase?retryWrites=true&w=majority";
        //         const client = new MongoClient(uri, { useNewUrlParser: true });
                //This is causing an error
                /*
                client.connect(err => {
                    const collection = client.db("VirusSurveyDatabase").collection("SurveyResults");
                    // perform actions on the collection object
                        
                    collection.insertOne(Response);
                        
                    console.log("Item was added to the database"); 
                        
                    client.close();
                });
                */
            // });
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
            />
        );
    }
}

export default SurveyPdfComponent;

