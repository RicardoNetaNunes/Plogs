const router = require("express").Router();

/* GET page to add places */

router.get('/places/add', (req, res, next) => {
  res.render('places/add.hbs')
})
module.exports = router;
