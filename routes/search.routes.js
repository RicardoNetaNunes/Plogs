const router = require("express").Router();
const Places = require("../models/Places.model")
const User = require("../models/User.model")
const Opinions = require("../models/Opinions.model")



router.get('/search', (req, res, next) => {
    res.render('search/search.hbs')

  })

 

    
router.get('/places',  (req, res, next) => {
  res.render('search/detail-search.hbs')

})

router.get('/places/list',  (req, res, next) => {
  res.render('search/list-view.hbs')

})


  /*
router.get("/search", (req, res, next) => {
	let loc = [51.505, -0.09]
	res.render("/search/search.hbs", {loc: JSON.stringify(loc)});
});

*/

module.exports = router;