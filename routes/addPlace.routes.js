const Places = require("../models/Places.model");
const router = require("express").Router();


/* GET page to add places */

router.get('/places/add', (req, res, next) => {
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
