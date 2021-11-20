const PlacesModel = require("../models/Places.model");

const router = require("express").Router();


/* GET page to add places */

router.get('/places/add', (req, res, next) => {
  res.render('places/add.hbs')


  
})



router.post('/places/add', (req, res, next) => {
  



  
  console.log(  req.body )
  const {latitude, longitude, location,description } = req.body

  console.log({latitude});
  PlacesModel.create({latitude, longitude, location,description})
      .then(() => {
          
          res.redirect('/search')
      })
      .catch(() => {
          next('the dog is unhappy')
      })

});


module.exports = router;
