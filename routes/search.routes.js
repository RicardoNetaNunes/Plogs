const router = require("express").Router();
const Places = require("../models/Places.model");
const User = require("../models/User.model")
const Opinions = require("../models/Opinions.model")



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


  /*
router.get("/search", (req, res, next) => {
	let loc = [51.505, -0.09]
	res.render("/search/search.hbs", {loc: JSON.stringify(loc)});
});

*/

module.exports = router;