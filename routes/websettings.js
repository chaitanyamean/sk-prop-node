const express = require('express')
const mongoose = require('mongoose')
const shortid = require('shortid')
const router = express.Router()


const checkAuth = require('../middleware/check-auth')

const websettingModel = require('../models/websettings')

const WebSettingsModel = mongoose.model('WebsettingsTable')


router.get('/', (req, res) => {
    res.send('this is web settings routes')
})



router.post('/create',checkAuth ,(req,res) => {

    console.log(req.body)
    let websettings = new WebSettingsModel({
        address : req.body.address,
        email: req.body.email,
        contactNumber: req.body.contactNumber,
        aboutUsContent: req.body.aboutUsContent,
        ourVisionContent: req.body.ourVisionContent,
        ourMissionContent: req.body.ourMissionContent,
        websettingId: shortid.generate()
    })

    websettings.save((err, result) => {
        if(result) {
            
            let sendObj = {
                
                message: 'Web settings saved successfully',
                status: 200,
                error: null,
                result: result
            }
           return res.send(sendObj)

        } else {
            res.send(err)
        }
    })

})


router.get('/getwebsettings', checkAuth,(req,res) => {
    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.currentPage;

    const postQuery = WebSettingsModel.find();
    let resultData;
    if(pageSize && currentPage) {
        postQuery.skip(pageSize * (currentPage-1)).limit(pageSize)
    }
    postQuery.then(result => {
        resultData = result
        return WebSettingsModel.countDocuments()
    }).then(count => {
        if(resultData) {
            let pages = Math.ceil(count / pageSize);
            console.log(pages)
            let resJson = {
                result: resultData,
                status: 200,
                message: 'Success',
                totalCount: count,
                pages: pages,
                currentPage: currentPage
            }
            return res.send(resJson)
        } else {
            return res.send('No Data Found')
        }
    })
})


router.get('/getwebsettingsbyid/:id', checkAuth, (req,res) => {


    WebSettingsModel.findOne({websettingId: req.params.id}).then(result => {

        if(result) {
            res.send(result)
        } else {
            res.send('No data found')
        }
    })
})


router.put('/editwebsettings/:id', checkAuth, (req,res) => {

    let options = req.body;

    WebSettingsModel.update({websettingId: req.params.id}, options).then(result => {
        if(result) {
            res.send(result)
        } else {
            res.send('Unable to update data')

        }
    })

})

router.delete('/deletewebsettingsbyid/:id', checkAuth,(req, res) => {


    WebSettingsModel.deleteOne({websettingId: req.params.id}).then(result => {
        if(result) {
            res.send(result)

        } else {
            res.send('Unable to delete or Id not found')

        }
    })

})





module.exports = router;