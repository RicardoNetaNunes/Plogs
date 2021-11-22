const router = require("express").Router();
const User = require('../models/User.model')
const bcrypt = require('bcryptjs');

// Handles GET requests to /signup and shows a form
router.get('/signup', (req, res, next) => {
  res.render('auth/signup.hbs')
})

// Handles POST requests to /signup 
router.post('/signup', (req, res, next) => {
  const {username, email, password, confirmPassword} = req.body
  //confirm if the password is the same
  if (!username || !email || !password || !confirmPassword) {
    res.render('auth/signup.hbs', {error: 'Please enter all fields'});
    return;
  }
  
  if (password !== confirmPassword) {
    res.render('auth/signup.hbs', {error: "Passwords didn't match. Try again"})
    return;
}
 //confirm ir the username is already in use
/*  let usernameInUse = req.params.username
 if (username === usernameInUse) {
  res.render('auth/signup.hbs', {error: 'Username already in use.'});
  return;
 } */

    // Encryption
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    User.create({username, email, password: hash})
      .then(() => {
          res.redirect('/places/add')
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
    //validate if the username and the password were entered
    if (!username || !password) {
      res.render('auth/login.hbs', {error: 'Please enter all fields'});
      }
    // Find the user username
    User.find({username})
      .then((usernameResponse) => {
          // if the username exists check the password
          if (usernameResponse.length) {
              //bcrypt decryption 
              let userObj = usernameResponse[0]
              // check if password matches
              let isMatching = bcrypt.compareSync(password, userObj.password);
              if (isMatching) {
                  req.session.myProperty = userObj
                  res.redirect('/places/add')
              }
              else {
                res.render('auth/login.hbs', {error: 'Wrong password. Try again'})
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

router.get('/profile', checkLogIn, (req, res, next) => {
  let myUserInfo = req.session.myProperty  
  if (myUserInfo) {
    res.render('auth/profile.hbs')
  }
  else {
    res.redirect('/login')
  }
})

router.get('/profile/logout', (req, res, next) => {
  // Deletes the session
  // this will also automatically delete the session from the DB
  req.session.destroy()
  res.redirect('/login')
})


//Delete user account
router.post('/profile/delete', (req, res, next) => {
  User.findOneAndRemove({_id: req.session._id})
   .then(() => {
    req.session.destroy()
    res.render('auth/delAcc.hbs')
  })
  .catch((err) => {
    next(err)
  }) 
}) 

module.exports = router;