
const mongoose = require('mongoose')

const Schema = mongoose.Schema


let state = new Schema({

    
    countryId: {
        type: String
    },
    stateName: {
        type: String
    },
    stateId: {
        type: String
    }
})

mongoose.model('StateModel', state)

