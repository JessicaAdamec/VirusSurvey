//This script adds json file "Response1" to the mongodb

var mongo = require('mongodb');

let Response1 = require('/Users/salar/Desktop/Response1.json');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://GeneralUser:1234@cluster0.velcv.mongodb.net/VirusSurveyDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    const collection = client.db("VirusSurveyDatabase").collection("SurveyResults");
    // perform actions on the collection object
    
    collection.insertOne(Response1);

    console.log("Item was added to the database"); 

    client.close();
});