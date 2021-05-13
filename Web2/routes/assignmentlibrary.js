var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var app = express();
app.use( bodyParser.json() );       // to support JSON-encoded bodies


var multer = require('multer');
var upload = multer();

// for parsing application/json
app.use(express.json());

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));

/* GET users listing. */
router.get('/assignmentlibrary', function(req, res, next) {
  res.send('../public/assignmentlibrary.html');
});
