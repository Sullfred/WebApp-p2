var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  let query = req.query
  res.redirect("../public/Exercises.html" + query);
});

module.exports = router;