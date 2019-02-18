// {username: "admin", password: "1234"}\\

const mongoose = require('mongoose')

const Schema = mongoose.Schema


let types = new Schema({

    propertyName: {
        type: String
    }
})

mongoose.model('Types', types)

