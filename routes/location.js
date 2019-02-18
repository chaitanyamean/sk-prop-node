const express = require('express')
const multer = require('multer')
const mongoose = require('mongoose')
const shortid = require('shortid')
const router = express.Router()

const country = require('../models/country')
const CountryModel = mongoose.model('CountryModel')

const banner = require('../models/banners')
const BannerModel = mongoose.model('BannerModel')

const mimetypes = {
    'image/png' : 'png',
    'image/jpeg': 'jpg',
    'image/jpg' : 'jpg'
}

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, "images")
    },

    filename: (req, file, cb) => {

        const name = file.originalname.toLowerCase().split(' ').join('-')
        const ext = 'png'
        cb(null, name+ '-' + Date.now() + '.' + ext)
    }
})

const bannerStorage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, "images")
    },

    filename: (req, file, cb) => {

        console.log('this is filename', file)
        const name = file.originalname.toLowerCase().split(' ').join('-')
        const ext = mimetypes[file.mimetype];
        cb(null, name+ '-' + Date.now() + '.' + ext)
    }
})


const state = require('../models/states')
const StateModel = mongoose.model('StateModel')

const district = require('../models/districts')
const DistrictModel = mongoose.model('DistrictModel')

const checkAuth = require('../middleware/check-auth')



router.get('/get-country-details', checkAuth, (req, res) => {

   let pageSize = +req.query.pageSize;
   let currentPage = +req.query.currentPage;

        let postQuery = CountryModel.find();
            let resultData;
        if(pageSize && currentPage) {
            postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
        }

        postQuery.then(result => {
            resultData = result;
            CountryModel.countDocuments().then(count => {
            // console.log(count)
                    if(count) {

                        let pages = Math.ceil(count/pageSize)
                        let responseObj = {
                            
                            result: resultData,
                            status: 200,
                            message: 'All Country Details',
                            totalCount: count,
                            error: null,
                            currentPage: currentPage,
                            pages: pages
                        }

                        return res.send(responseObj);
                    }
            })
        })
    
})

router.put('/edit-country-details', checkAuth, (req, res) => {
    let options = req.body
    console.log(options)

    CountryModel.findOneAndUpdate({ countryId: req.body.countryId }, options).then(result => {
        if (result) {
            let responseObj = {
                result: null,
                message: 'Updated Successfully',
                status: 200,
                error: null
            }

            return res.send(responseObj)
        } else {
            return res.send('unable to retrive Data')

        }
    })

})

router.delete('/deletecountrybyid/:id', checkAuth, (req, res) => {

    CountryModel.deleteOne({ countryId: req.params.id }).then(result => {
        if (result) {
            let responseObj = {
                result: null,
                message: 'Deleted Successfully',
                status: 200,
                error: null
            }
            res.send(responseObj)

        } else {
            res.send('Unable to delete or Id not found')

        }
    })
})

router.get('/getCountryDetails/:name', checkAuth, (req, res) => {


    CountryModel.find({ countryName: { $regex: req.params.name, $options: 'i' } }).then(result => {

        if (result) {
            res.send(result);
        } else {

        }
    })
})




router.put('/editCountryNameById', checkAuth, (req, res) => {

    let options = req.body;

    CountryModel.findOneAndUpdate({ countryId: req.body.countryId }, options).then(result => {

        if (result) {
            let responseObj = {
                result: null,
                message: 'Updated Successfully',
                status: 200,
                error: null
            }
            return res.send(responseObj);
        } else {
            let responseObj = {
                result: null,
                message: 'Not Found',
                status: 400,
                error: null
            }
            return res.send(responseObj);
        }
    })

})


router.post('/save-country', multer({storage: storage}).single('image') ,checkAuth, (req, res) => {


    const url = req.protocol + "://" + req.get("host");

    let countryName = new CountryModel({
        countryName: req.body.countryName,
        image: url + '/images/' + req.file.filename,
        countryId: shortid.generate()

    })

    countryName.save((err, result) => {

        if (err) {

        } else {
            let responseObj = {
                result: null,
                message: 'Saved Successfully',
                status: 200,
                error: null
            }
            res.send(responseObj)
        }
    })
})



router.delete('/deleteCountryById/:id', checkAuth, (req, res) => {


    CountryModel.deleteOne({ countryId: req.params.id }).then(result => {

        if (result) {
            let responseObj = {
                result: null,
                message: 'Deleted Successfully',
                status: 200,
                error: null
            }
            res.send(responseObj)
        } else {
            let responseObj = {
                result: null,
                message: 'Unable to delete Successfully',
                status: 400,
                error: null
            }
            res.send(responseObj)
        }
    })
})


router.post('/save-state', checkAuth, (req, res) => {


    let stateName = new StateModel({
        countryId: req.body.countryId,
        stateName: req.body.stateName,
        stateId: shortid.generate()
    })

    stateName.save((err, result) => {

        if (err) {

        } else {
            let responseObj = {
                result: null,
                message: 'Saved Successfully',
                status: 200,
                error: null
            }
            res.send(responseObj)
        }
    })
})




router.put('/editStateNameById', checkAuth, (req, res) => {

    let options = req.body;

    console.log('From Server', options)
    StateModel.update({ stateId: req.body.stateId }, options).then(result => {

        if (result) {
            let responseObj = {
                result: null,
                message: 'Updated Successfully',
                status: 200,
                error: null
            }
            return res.send(responseObj);
        } else {
            let responseObj = {
                result: null,
                message: 'Not Found',
                status: 400,
                error: null
            }
            return res.send(responseObj);
        }
    })

})

router.delete('/deleteStateById/:id', checkAuth, (req, res) => {


    StateModel.deleteOne({ stateId: req.params.id }).then(result => {
        if (result) {
            let responseObj = {
                result: null,
                message: 'Deleted Successfully',
                status: 200,
                error: null
            }
            return res.send(responseObj);

        } else {
            let responseObj = {
                result: null,
                message: 'Not Found',
                status: 400,
                error: null
            }
            return res.send(responseObj);
        }
    })

})


router.get('/getAllStates', checkAuth, (req, res) => {

    StateModel.find().then(result => {
        if (result) {
            let resObj = {
                message: 'All States Data',
                status: 200,
                result: result,
            }

            return res.send(resObj);

        } else {
            res.send('Unable to fetch data')
        }
    })
})

router.get('/get-statesbycountryId/:id', checkAuth, (req, res) => {


    StateModel.find({ countryId: req.params.id }).then(result => {
        if (result) {
            res.send(result)
        } else {
            res.send('unable to fetch')
        }
    })
})

router.post('/save-district', checkAuth, (req, res) => {

    console.log(req.body);
    let districtDetails = new DistrictModel({
        countryId: req.body.countryId,
        stateId: req.body.stateId,
        districtName: req.body.districtName,
        districtId: shortid.generate()
    })

    districtDetails.save((err, result) => {

        if (err) {

        } else {

            let resObj = {
                message: 'District Saved',
                status: 200,
                result: null,
                error: null
            }

            return res.send(resObj);
        }
    })
})


router.get('/get-district', checkAuth, (req, res) => {

    DistrictModel.find().then(result => {
        if (result) {
            let resObj = {
                message: 'All District',
                status: 200,
                result: result,
                error: null
            }

            return res.send(resObj);
        } else {

        }
    })
})

router.put('/edit-district-details', checkAuth, (req, res) => {

    let options = req.body;

    DistrictModel.update({ districtId: req.body.districtId }, options).then(result => {
        if (result) {
            let resObj = {
                message: 'District Data updated',
                status: 200,
                result: result,
                error: null
            }

            return res.send(resObj);
        } else {

        }
    })

})

router.delete('/deleteDistrictById/:id', checkAuth, (req, res) => {


    DistrictModel.deleteOne({ districtId: req.params.id }).then(result => {
        if (result) {
            let responseObj = {
                result: null,
                message: 'Deleted Successfully',
                status: 200,
                error: null
            }
            return res.send(responseObj);

        } else {
            let responseObj = {
                result: null,
                message: 'Not Found',
                status: 400,
                error: null
            }
            return res.send(responseObj);
        }
    })

})



router.post('/uploadbanners', 
multer({ storage :  bannerStorage}).array('banners'),
checkAuth, (req, res) => {

    let count = 0;
    if(req.files) {
        for(let item of req.files) {
            console.log('items', item.filename);

            const url = req.protocol + "://" + req.get("host");

            let bannerDetails = new BannerModel({
                image: url + '/images/' + item.filename,
                bannerId: shortid.generate()
    })

    bannerDetails.save((err, result) => {

        if (err) {

            return res.send('unable to save data')

        } else {
            

            count++

            if(count === req.files.length){

                let responseObj = {
                result: null,
                message: 'Saved Successfully',
                status: 200,
                error: null
            }
            res.send(responseObj)
            }
        }
    })
        }
    }

})


router.get('/get-banners', checkAuth, (req,res) => {

    BannerModel.find().then(result =>{
        if(result) {
            let responseObj = {
                result: result,
                message: 'All banner details',
                status: 200,
                error: null
            }
            res.send(responseObj)
        } else {
            res.send('Unable to retrive')
        }
    })
})




router.post('/upload-banner-images', 
multer({storage: bannerStorage}).array('banners'), 
checkAuth, (req, res) => {

console.log('files', req.files)


const url = req.protocol + '://' + req.get('host')

let count =0;
if(req.files) {

    for(let item of req.files) {    
        let bannerDetails = new BannerModel({
            bannerId: shortid.generate(),
            image: url + '/images/' + item.filename
        })
        
        
        bannerDetails.save().then(result => {

                if(result) {

                    count++

                    if(count == req.files.length) {

                        
                        let resObj = {
                            result: null,
                            message: 'Banner Saved Succfully',
                            status: 200,
                            error: null
                        }
                        
                        return res.send(resObj)
                    }
                } else {
                    return res.send('Unable to save banner images')
                }
        }) 
    }
}

})

router.post('/update-banner-images', multer({storage: bannerStorage}).array('banners'), 
checkAuth, (req, res) => {

    // console.log(req);

    let options = req.body;

    BannerModel.update({bannerId:req.body.bannerId}, options).then(result => {
        if(result) {
            res.send(result);
        } else {
            res.send('Unable to find');
        }
    })
})

router.delete('/delete-bannersById/:id', checkAuth, (req, res) => {
    BannerModel.deleteOne({bannerId: req.params.id}).then(result => {
        if(result) {

            let resObj = {
                result: null,
                message: 'Deleted Successfully',
                status: 200,
                error: null
            }
            
            return res.send(resObj)
        }
    })
})


module.exports = router;
