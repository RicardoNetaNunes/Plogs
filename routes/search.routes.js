const router = require("express").Router();
const Places = require("../models/Places.model");
const User = require("../models/User.model")
const Opinions = require("../models/Opinions.model")


router.get('/aboutus', (req, res, next) => {
  res.render('about.hbs')
})



router.get('/search', (req, res, next) => {
   Places.find().then((places) => {
    res.render('search/search.hbs' , {places})  
   })
   .catch(() => {
   })
  })

 

    
router.get('/places/details/:placeId',  (req, res, next) => {
  const {placeId} = req.params

  Places.findById(placeId)
  .populate('opinions')
  .then((place) => {
      res.render('search/detail-search.hbs', {place})
  })
  
  .catch(() => {
      next('Not sure what place you wanted')
  })

})

router.get('/places/list',  (req, res, next) => {
  Places.find().then((places) => {
  res.render('search/list-view.hbs', {places})  
})
.catch(() => {
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


router.get('/places/opinions/:placeId',checkLogIn,  (req, res, next) => {
  const {placeId} = req.params;

  Places.findById(placeId)
  .then((place) => {
      res.render('search/opinions.hbs', {place})
  })
  
  .catch(() => {
      next('Not sure what place you wanted')
  })

})



router.post('/places/opinions/:placeId',  (req, res, next) => {
  const {placeId} = req.params;
  const {opinions} = req.body;
  const userId = req.session.myProperty._id
//console.log('uno', userId)
//console.log('duo', opinions)
//console.log('trio', placeId)
  Opinions.create({opinions, userId: userId, placesId: placeId })
 .then((opinions) => {
  Places.findByIdAndUpdate({_id: placeId}, { $push: { opinions:  opinions._id } })
  .then(() => {
    const {placeId} = req.params

    Places.findById(placeId)
    .populate('opinions')
    .then((place) => {
        res.render('search/detail-search.hbs', {place, opinions})
    })
 })
})
.catch((err)=>{
  next(err)
})

});



  

module.exports = router;