// {username: "admin", password: "1234"}\\

const mongoose = require('mongoose')

const Schema = mongoose.Schema


let banners = new Schema({
    
    bannerId: {
        type: String
    },
    image: {
        type: String
    }
})

mongoose.model('BannerModel', banners)

