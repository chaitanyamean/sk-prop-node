const express = require('express')
const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const router = express.Router()



const model = require('../models/user')
const location = require('../models/location')
const checkAuth = require('../middleware/check-auth')
const UserModel = mongoose.model('User')
const LocationDB = mongoose.model('EdeLocationDB')

// localhost:3000/api/user/
router.get('/', (req,res) => {

    res.send('this is router express')
})



// localhost:3000/api/user/login


// localhost:3000/user/signup
router.post('/signup', (req,res) => {
    console.log('req', req.body);


    UserModel.findOne({userName: req.body.userName}).then(result =>{

        console.log('RESULT', result);

        if(!result) {
        
        bcryptjs.hash(req.body.password, 10).then(hash => {
            
            // console.log('HASH', hash)
            let userDetails = new UserModel({
                userName: req.body.userName,
                password: hash,
                isPasswordChanged: false
            
            })
            console.log('userDetails', userDetails)
            
            userDetails.save((err,result) => {
                if(err) {
                    // res.send(err)
                    res.status(500).json({
                        message: 'Unable to create user',
                        result: null,
                        error: err
                    })
                } else {
                    //res.send(result)
                    res.status(200).json({
                        message: 'User Created Successfully',
                        result: result,
                        error: null
                    })
                }
            })
        }).catch(err => {
            res.status(500).json({
            message: 'Some error occured',
            result: null,
            err:err
            })
        })
    } else {
        // res.send('User already exist')
        res.status(500).json({
            message: 'User Already exist',
            result: null,
            err:null
        })
    }
    }).catch(err => {
        res.status(500).json({
            message: 'Some error occured',
            result: null,
            err:err
            })
    })


})


// Email exist
// password correct entered
// generating auth token
// Creating Login router

router.post('/login', (req,res) => {
    let userDetails
    UserModel.findOne({userName: req.body.userName}).then(user => {
        userDetails = user
        if(!user) {
        

            let resObj = {
                message: 'No User Found',
                   status: 404,
                     error: null,
                     token: null,
                     result: null
            }

         return  res.send(resObj)
        }

        bcryptjs.compare(req.body.password, user.password).then(isMatch => {
            if(!isMatch) {
                

                let resObj = {
                    message: 'Password incorrect',
                       status: 404,
                         error: null,
                         token: null,
                         result: null
                }

                return res.send(resObj)
            }


          let token = jwt.sign({userName: userDetails.userName, userId:userDetails._id},
                        'thisissecretkeyanditisverylong')

                        if(token) {
                           
                            let resObj = {
                                    message: 'Login Successful',
                                    status: 200,
                                     error: null,
                                     token: token,
                                     result: userDetails
                            }
                            return res.send(resObj)
                        } else {
                           
                            let resObj = {
                                message: 'Unable to generate token',
                                status: 404,
                                 error: null,
                                 token: null,
                                 result:null
                        }

                        return res.send(resObj)
                        }
        })
    }).catch(err => {
        console.log(err)

    })
})



router.post('/save-countries',checkAuth, (req, res) => {

let locDetails = new LocationDB({
    countryName: req.body.countryName,
    countryCode: req.body.countryCode,
    countryLanguage: req.body.countryLanguage
})
    

locDetails.save((err, result) => {
    if(err) {
res.send(err)
    } else {
        res.send(result)

    }
})
})



// Checkauth
// username
// password compare
// new password hasing
// update the new password

// userName
// oldPassword
// newPassword
// confirmPassword

router.post('/change-password', checkAuth, (req,res) => {


UserModel.findOne({userName: req.body.userName}).then(user => {

    if(!user) {

        let resObj = {
            message: 'No User Found',
            status: 404,
            error: null,
            token: null,
            result: null
        }
        
        return  res.send(resObj)
    }


    bcryptjs.compare(req.body.oldPassword, user.password).then(isMatch => {


        if(!isMatch) {
            let resObj = {
                message: 'Old password is not matching',
                status: 404,
                error: null,
                token: null,
                result: null
            }
            
            return  res.send(resObj)

        }

    bcryptjs.hash(req.body.newPassword, 10).then(hash => {

        options = {
            userName: req.body.userName,
            password: hash,
            isPasswordChanged: true
        }

        UserModel.update({userName: req.body.userName}, options).then(result => {

            if(result) {
                return res.send(result)
            } else {
                return res.send('unable to save new password')

            }
        })

    })
    })
})


})


module.exports = router;