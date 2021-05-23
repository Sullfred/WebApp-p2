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
router.get('/progress', function(req, res, next) {
  res.send('../public/progress.html');
});

router.get('/', function(req, res){
  const { Console } = require('console')
  let mysql = require('mysql')
  const ResultSet = require('mysql/lib/protocol/ResultSet')
  const { stringify } = require('querystring')
  const { isNull } = require('util')
  let con = mysql.createConnection({
      host: 'localhost',
      user: 'dat2c2-4',
      password: 't95oqnsuoqLpR27r',
      database: 'dat2c2_4'
  });

  con.connect(function(err) {
      if (err) throw err;
      console.log("Connected to database")
  });


  sql = `SELECT * FROM UserData WHERE UserName = ${con.escape(req.query.un)}`

  con.query(sql, function(err, result){
    if (err) throw err
  var dataToSendToClient = result
  var JSONdata = JSON.stringify(dataToSendToClient)
  res.send(JSONdata)
  })
})

module.exports = router;