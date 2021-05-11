var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('../public/student.html');

  const id = req.query.id
  console.log(id);
});

module.exports = router;
