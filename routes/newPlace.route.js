const router = require("express").Router();
const NewPlace = require("../models/newPlaces.model");
const User = require("../models/User.model");
const Opinions = require("../models/Opinions.model");

router.get("/places/newPlaces",(req, res, next) => {
    res.render('places/newPlaces.hbs')

  })
 

  
  router.post('/places/newPlaces', (req, res, next) => {
  
  
    /* let getData = map.addEventListener('change', function(e) {
     let coordinates = e.target.value.split(",");  
    return coordinates 
    });
    getData();
    
    let latitude = coordinates[1];
    let longitude = coordinates[0];
    */
    

    const {latitude, longitude, place ,description } = req.body
  
    console.log(latitude);
    NewPlace.create({latitude, longitude, place, description})
        .then(() => {
            
            res.redirect('/search')
        })
        .catch(() => {
            next('the dog is unhappy')
        })
  
  });
  


  module.exports = router;