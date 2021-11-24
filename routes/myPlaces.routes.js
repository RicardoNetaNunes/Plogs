const Places = require("../models/Places.model");
const User = require('../models/User.model');
const uploader = require('../config/cloudinary.config.js');
const router = require("express").Router();


//USER CAN EDIT OR DELETE PLACES ADDED BEFORE

//EDIT
router.get('/myPlaces/edit', (req, res, next) => {
        res.render('places/edit.hbs')
  });

router.post('/myPlaces/:placesAddedId/edit', (req, res, next) => {
    const {placesAddedId} = req.params
    console.log(placesAddedId)
    Places.findByIdAndUpdate({placesAddedId}, req.body)
    .then(() => {
        res.redirect('/profile')
    })
    .catch(() => {
        next('Place not edited')
    })
  });
  
//DELETE
router.post('/myPlaces/:placesAddedId/delete', (req, res, next) => {
    const {placesAddedId} = req.params
    Places.findByIdAndDelete(placesAddedId)
    .then(() => {
        res.redirect('/profile')
    })
    .catch(() => {
        next('Place not deleted')
    })
  });


  module.exports = router;
  