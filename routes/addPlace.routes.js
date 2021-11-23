const Places = require("../models/Places.model");
const User = require('../models/User.model');
const router = require("express").Router();
const uploader = require('../config/cloudinary.config.js');


/* GET page to add places */

//Our custom middleware that checks if the user is loggedin
const checkLogIn = (req, res, next) => {
  if (req.session.myProperty) {
      //invokes the next available function
      next()
  }
  else {
      res.redirect('/login')
  }
}

router.get('/places/add', checkLogIn, (req, res, next) => {
  res.render('places/add.hbs')
})

router.post('/places/add', uploader.single("image"), (req, res, next) => {
  const {latitude, longitude, place, description} = req.body;
  const user =req.session.myProperty._id
 
  if(!latitude || !longitude) {
    res.render('places/add.hbs', {error: 'Please pick the location on the map'});
    return
  }
  if(place == "Choose...") {
    res.render('places/add.hbs', {error: 'Please select the type of place'});
    return
  }

  let image = req.file.path
  if (!req.file){
      image = '/images/default.jpg'
  }
  else {
      image = req.file.path
  }
  
 Places.create({latitude, longitude, place, description, authorId: user, image})
 .then((place) => {
  console.log(place)
  User.findByIdAndUpdate({_id: user}, { $push: { placesAdded: place._id, placesVisited: place._id } })
  .then(() => {
    res.redirect('/profile')
 })
})
.catch((err)=>{
  next(err)
})

});



module.exports = router;
