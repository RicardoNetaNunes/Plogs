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
  const {latitude, longitude, type, description} = req.body;

 Places.create({latitude, longitude, type, description})
 .then(() => {
     res.redirect('/')
 })
 .catch((err) => {
   next(err)
 })

});





module.exports = router;
