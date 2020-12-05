const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema(
    {
        liveQ: String,
        campusQ: String,
        covidExposureQ: Boolean,
        covidTestingQ: Boolean,
        haveCovidQ: Boolean,
        symp3: Array,
        symp2: Array,
        symp1: Array

    },
    { timestamps: true }
);

module.exports = mongoose.model("Data", DataSchema);