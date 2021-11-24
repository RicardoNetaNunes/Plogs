const Places = require("../models/Places.model");
const User = require('../models/User.model');
const uploader = require('../config/cloudinary.config.js');
const router = require("express").Router();


//USER CAN EDIT OR DELETE PLACES ADDED BEFORE

//EDIT
router.get('/myPlaces/:placesAddedId/edit', (req, res, next) => {
    const {placesAddedId} = req.params;
     
    //console.log('aaaaaaaaaaaaaiiiiiiiiiiiiiii' + placesAddedId)  
    res.render('places/edit.hbs', {placesAddedId})
  });

router.post('/myPlaces/:placesAddedId/edit',uploader.single("image"), (req, res, next) => {


    const {placesAddedId} = req.params
    console.log('hiiiiiiii' + placesAddedId)
    const {latitude, longitude, place, description} = req.body;
    //console.log(latitude);
    let image
    if (!req.file){
        image = '/images/default.jpg'
    }
    else {
        image = req.file.path
    }

    Places.findByIdAndUpdate(placesAddedId, {latitude, longitude, place, description, image})
    .then(() => {
        res.redirect('/profile')
        console.log('helppppppppppppppp')
    })
    .catch(() => {
        next('Place not edited') 
    })
  });
  
//DELETE
router.post('/myPlaces/:placesAddedId/delete', (req, res, next) => {
    const {placesAddedId} = req.params
    console.log(placesAddedId)
    Places.findByIdAndDelete(placesAddedId)
    .then(() => {
        res.redirect('/profile')
    })
    .catch(() => {
        next('Place not deleted')
    })
  });


  module.exports = router;
  