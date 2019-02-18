console.log('Hello World!')


const fs = require('fs') // Internal Module
const os = require('os')
const path = require("path");

const appConfig = require('./config/appConfig')
// const location = require('./models/location')

// Routes Import
const userRoutes = require('./routes/users')
const websettingRoutes = require('./routes/websettings')
const typesRoutes = require('./routes/types')
const locationRoutes = require('./routes/location')


// libs
const passwordLib = require('./libs/passwordlibs')
// const userroutes = require('./routes/user')

// External Module
const mongoose = require('mongoose')
const express = require('express') 
const bodyparser = require('body-parser')

const app = express();


// body parser for post methods
 app.use(bodyparser.json())
 app.use(bodyparser.urlencoded({extended: false}))
 app.use("/images", express.static(path.join("images")));
//  app.use(express.static(path.join(__dirname, 'images')));


 // Models

//  let webSettings = require('./models/websettings')
 
 let modelsPath = './models'
 
 fs.readdirSync(modelsPath).forEach(function (file) {
     console.log(modelsPath + '/' + file)
     if(~file.indexOf('.js')) require(modelsPath + '/' + file)
    })
    

    app.use((req,res,next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET,DELETE")

        next();
    })
    
   
                        
app.use('/user', userRoutes)
app.use('/web-settings', websettingRoutes)
app.use('/masters', typesRoutes)
app.use('/locations', locationRoutes)




app.listen(appConfig.port, () => {
 
    let db = mongoose.connect(appConfig.db.url, ({ useNewUrlParser: true }))
    console.log('Port is running in ' + appConfig.port)
})


mongoose.connection.on('error', function(err) {
    if(err) {
        console.log(err)
    }
})

mongoose.connection.on('open', function(err) {
    if(err) {
        console.log(err)

    } else {
        console.log('connection successful')
    }
})






























