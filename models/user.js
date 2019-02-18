// {username: "admin", password: "1234"}\\

const mongoose = require('mongoose')

const Schema = mongoose.Schema


let user = new Schema({

    userName: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    isPasswordChanged: {
        type: Boolean
    }
})

mongoose.model('User', user)

