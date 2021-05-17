var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('../public/homework.html'+'?test=5');
});

module.exports = router;