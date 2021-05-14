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
router.get('/', function(req, res, next) {
  res.send('../public/exercises.html');
});

router.post('/', function(req, res){
  const { Console } = require('console');
  let mysql = require('mysql');
  let con = mysql.createConnection({
    host: 'localhost',
    user: 'dat2c2-4',
    password: 't95oqnsuoqLpR27r',
    database: 'dat2c2_4'
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to database");
  });

  let solved_plus = req.body.solvedPlus, solved_minus = req.body.solvedMinus, solved_gange = req.body.solvedGange, solved_dividere = req.body.solvedDividere;
  
  function updateDatabase(solved_plus, solved_minus, solved_gange, solved_dividere){
    let sql = "UPDATE UserData SET Addition=?, Subtraction =?, Multiplication =?, Divison =? WHERE personId =?";
    let updateData = con.query(sql, [], function(err, result){
      console.log("Database updated")
    })
  }

});

module.exports = router;