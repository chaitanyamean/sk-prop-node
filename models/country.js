// {username: "admin", password: "1234"}\\

const mongoose = require('mongoose')

const Schema = mongoose.Schema


let country = new Schema({

    countryName: {
        type: String
    },
    countryId: {
        type: String
    },
    image: {
        type: String
    }
})

mongoose.model('CountryModel', country)

