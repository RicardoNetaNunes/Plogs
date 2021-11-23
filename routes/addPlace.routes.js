const Places = require("../models/Places.model");
const User = require('../models/User.model');
const router = require("express").Router();


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

router.post('/places/add', (req, res, next) => {
  const {latitude, longitude, place, description} = req.body;
  const user =req.session.myProperty._id
  console.log (latitude, longitude)
  if(!latitude || !longitude) {
    res.render('places/add.hbs', {error: 'Please pick the location on the map'});
    return
  }
 /* if(!place) {
    res.render('places/add.hbs', {error: 'Please fill the type field'});
    return
  }*/
 Places.create({latitude, longitude, place, description, authorId : user})
 
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
