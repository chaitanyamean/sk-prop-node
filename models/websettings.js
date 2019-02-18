// {username: "admin", password: "1234"}\\

const mongoose = require('mongoose')

const Schema = mongoose.Schema


let websettings = new Schema({

    address: {
        type: String
    },
    email: {
        type: String
    },
    contactNumber: {
        type: Number
    },
    aboutUsContent: {
        type: String
    },
    ourVisionContent: {
        type: String
    },
    ourMissionContent: {
        type: String
    },
    websettingId: {
        type: String
    }
})

mongoose.model('WebsettingsTable', websettings)

