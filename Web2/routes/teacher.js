var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/teacher', function(req, res, next) {
  res.send('../public/teacher.html');
});

module.exports = router;
