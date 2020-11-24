//This Script retrieves files from the database and generates a pdf report

var mongo = require('mongodb'); 
const http = require('http');
var fs = require('fs');
const PDFDocument = require('pdfkit');

const report = new PDFDocument;

report.pipe(fs.createWriteStream('C:/Users/salar/Desktop/VirusSurveyReport.pdf')); // write to PDF

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://GeneralUser:1234@cluster0.velcv.mongodb.net/VirusSurveyDatabase?retryWrites=true&w=majority";

report.text('Virus Survey Report', {
    width: 410,
    align: 'left'
});

const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    const cursor = client.db("VirusSurveyDatabase").collection("SurveyResults").find();

    cursor.forEach(function(err, doc){
        report.moveDown();
        report.text('ReportData Goes Here', {
            width: 410,
            align: 'center'
        }
        );

        console.log(doc);
    });

    client.close();//Closes Database Connection
    
});
report.text('End of Report', {
    width: 410,
    align: 'left'
});
report.end();//Closes pdf
