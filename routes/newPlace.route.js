const router = require("express").Router();
const NewPlace = require("../models/NewPlaces.model");
const User = require("../models/User.model");
const Opinions = require("../models/Opinions.model");

router.get("/places/newPlaces",(req, res, next) => {
    res.render('places/newPlaces.hbs')

  })
 

  
  router.post('/', (req, res, next) => {
  
  
    /* let getData = map.addEventListener('change', function(e) {
     let coordinates = e.target.value.split(",");  
    return coordinates 
    });
    getData();
    
    let latitude = coordinates[1];
    let longitude = coordinates[0];
    */
    

    const {latitude, longitude, type ,description } = req.body
  
    console.log(latitude);
    PlacesModel.create({latitude, longitude, type, description})
        .then(() => {
            
            res.redirect('/search')
        })
        .catch(() => {
            next('the dog is unhappy')
        })
  
  });
  


  module.exports = router;