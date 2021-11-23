const Places = require("../models/Places.model");
const User = require('../models/User.model');
const uploader = require('../config/cloudinary.config.js');
const router = require("express").Router();


//USER CAN EDIT OR DELETE PLACES ADDED BEFORE

//EDIT

  
//DELETE
router.post('/myPlaces/:placesAddedId/delete', (req, res, next) => {
    const {placesAddedId} = req.params
    Places.findByIdAndRemove(placesAddedId)
    .then(() => {
        res.redirect('/profile')
    })
    .catch(() => {
        next('Place not deleted')
    })
  });


  module.exports = router;