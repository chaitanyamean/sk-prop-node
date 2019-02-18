const express = require('express')
const mongoose = require('mongoose')
const shortid = require('shortid')
const router = express.Router()

const typesmodel = require('../models/types')
const TypeModel = mongoose.model('Types')

const status = require('../models/statues')
const StatusModel = mongoose.model('Statues')


router.get('/', (req, res) => {
    res.send('this is web settings routes')
})



router.post('/data', (req, res) => {

    // Types----

    // property Name
    // type -- types

    // propertyStatus
    // type -- status

    if(req.body.type === 'types') {


        let types = new TypeModel({
            propertyName: req.body.propertyName
        })

        types.save((err, result) => {

            if(err) {

            } else {
                res.send(result)
            }
        })

    } else if (req.body.type === 'statues') {

        let statues = new StatusModel({
            propertyStatues: req.body.propertyStatues
        })

        statues.save((err, result) => {
            if(err) {
                res.send(err)
            } else {
                res.send(result)
            }
        })

    }


    
})

// Create types


// property Name


// read types

// edit types

// delete types

module.exports = router;
