// {username: "admin", password: "1234"}\\

const mongoose = require('mongoose')

const Schema = mongoose.Schema


let statues = new Schema({

    propertyStatues: {
        type: String
    }
})

mongoose.model('Statues', statues)

