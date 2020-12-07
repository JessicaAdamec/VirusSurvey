const express = require('express')
const mongoose = require('mongoose')
var cors = require('cors')
const bodyParser = require('body-parser')
const Data = require('./data')

const PORT = 3005
const app = express()
app.use(cors())
const router = express.Router()


const dbRoute = 'mongodb+srv://GeneralUser:1234@cluster0.velcv.mongodb.net/VirusSurveyDatabase?retryWrites=true&w=majority'
mongoose.connect(dbRoute, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})

mongoose.connection.on('connected', () => {
    console.log("connected to mongo yeahh")
})

mongoose.connection.on('error', (err) => {
    console.log("this is error", err)
})


//only made for logging asnd body parser, parses the request body readable json fornat
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



//this is our create method and this adds newdata in our database
router.post("/", (req, res) => {
    let data = new Data();

    const { liveQ, campusQ, covidExposureQ, covidTestingQ, haveCovidQ, symp3, symp2, symp1 } = req.body;

    // if ((!id && id !== 0) || !message) {
    //     return res.json({
    //         success: false,
    //         error: "INVALID INPUTS"
    //     });
    // }
    data.liveQ = liveQ
    data.campusQ = campusQ
    data.covidExposureQ = covidExposureQ
    data.covidTestingQ = covidTestingQ
    data.haveCovidQ = haveCovidQ
    data.symp3 = symp3
    data.symp2 = symp2
    data.symp1 = symp1

    data.save(err => {
        if (err) return res.json({ success: false, error: err })
        return res.json({ success: true })
    })
})
// app.use(express.json());
// app.get('/', (req, res) => {
//     res.send("Hello I ma here")
// })

app.use('/api', router)
app.listen(PORT, () => console.log('Server is running'))
