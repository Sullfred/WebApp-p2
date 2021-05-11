var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/homeworkCreator', function(req, res, next) {
  res.send('../public/homeworkCreator.html');
});

module.exports = router;