// {username: "admin", password: "1234"}\\

const mongoose = require('mongoose')

const Schema = mongoose.Schema


let location = new Schema({

    countryName: {
        type: String
    },
    countryCode: {
        type: String
    },
    countryLanguage: {
        type: String
    }
})

mongoose.model('EdeLocationDB', location)

