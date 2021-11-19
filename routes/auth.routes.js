const router = require("express").Router();
const UserModel = require('../models/User.model')
const bcrypt = require('bcryptjs');

// Handles GET requests to /signup and shows a form
router.get('/signup', (req, res, next) => {
  res.render('auth/signup.hbs')
})

// Handles POST requests to /signup 
router.post('/signup', (req, res, next) => {
  const {username, password} = req.body

    // Encryption
    let salt = bcrypt.genSaltSync(12);
    let hash = bcrypt.hashSync(password, salt);
    UserModel.create({username, password: hash})
      .then(() => {
          res.redirect('/')
      })
      .catch((err) => {
        next(err)
      })
})

// Handles GET requests to /login and shows a form
router.get('/login', (req, res, next) => {
  res.render('auth/login.hbs')
})
 

// Handles POST requests to /login 
router.post('/login', (req, res, next) => {
    const {username, password} = req.body
    //Validation
    //validate if the username and the password exist
    if (username == '' || password == '') {
      //throw error
      res.render('auth/login.hbs', {error: 'Please enter all fields'});
      }
    // Find the user username
    UserModel.find({username})
      .then((usernameResponse) => {
          // if the username exists check the password
          if (usernameResponse.length) {
              //bcrypt decryption 
              let userObj = usernameResponse[0]
              // check if password matches
              let isMatching = bcrypt.compareSync(password, userObj.password);
              if (isMatching) {
                  req.session.myProperty = userObj
                  res.redirect('/main')
              }
              else {
                res.render('auth/login.hbs', {error: 'Password not matching'})
                return;
              }
          }
          else {
            res.render('auth/login.hbs', {error: 'Username does not exist'})
            return;
          }
      })
      .catch((err) => {
        next(err)
      })
})

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

router.get('/private', checkLogIn, (req, res, next) => {
    let myUserInfo = req.session.myProperty  
    if (myUserInfo) {
      res.render('auth/private.hbs')
    }
    else {
      res.redirect('/login')
    }
})

router.get('/main', checkLogIn, (req, res, next) => {
  let myUserInfo = req.session.myProperty  
  if (myUserInfo) {
    res.render('auth/main.hbs')
  }
  else {
    res.redirect('/login')
  }
})

module.exports = router;