
const mongoose = require('mongoose')

const Schema = mongoose.Schema


let district = new Schema({

   
    countryId: {
        type: String
    },
    
    stateId: {
        type: String
    },
    districtName: {
        type: String
    },
    districtId: {
        type: String
    },
    stateName: {
        type: String
    },
    countryName: {
        type: String
    },
})

mongoose.model('DistrictModel', district)

