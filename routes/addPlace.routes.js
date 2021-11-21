const PlacesModel = require("../models/Places.model");
const router = require("express").Router();


/* GET page to add places */

router.get('/places/add', (req, res, next) => {
  res.render('places/add.hbs')


  
})



router.post('/places/add', (req, res, next) => {
  const { longitude, latitude, name, description } = req.body;
 
  const newPlace = new PlacesModel({
    name,
    description,
    location: {
      type: 'Point',
      coordinates: [longitude, latitude]
    }
  });
 
  newPlace
    .save()
    .then(place => {
      res.redirect('/');
    })
    .catch(error => {
      next(error);
    });
});




/*
router.post('/places/add', (req, res, next) => {
  

  let getData = map.addEventListener('change', function(e) {
   let coordinates = e.target.value.split(",");  
  return coordinates 
  });
  getData();
  
  let latitude = coordinates[1];
  let longitude = coordinates[0];


  const {place, description } = req.body

PlacesModel.create({place, description })
  .then(() => {
      
      res.redirect('/search')
  })
  .catch(() => {
      next('the dog is unhappy')
  })


      
  

});

*/

module.exports = router;
