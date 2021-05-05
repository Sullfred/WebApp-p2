var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var app = express();
app.use( bodyParser.json() );       // to support JSON-encoded bodies

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('../public/login.html');
});

module.exports = router;
