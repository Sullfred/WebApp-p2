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
router.get('/student', function(req, res, next) {
  res.send('../public/student.html');
});

app.get('/student/?userLoginId', function(req, res){
  const UserLoginId = req.params['userLoginId']+req.params[0]
  console.log(`${UserLoginId}`)
})

module.exports = router;
