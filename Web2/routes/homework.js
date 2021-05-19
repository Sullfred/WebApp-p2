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
router.get('/homework', function(req, res, next) {
  res.send('../public/homework.html');
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
  console.log(req.query.state)
  console.log(typeof req.query.state)
  if(req.query.state === 1){
    sql = `SELECT * FROM UserData WHERE UserName = "${req.query.un}"`
    con.query(sql, function(err, result){
      if (err) throw err
      console.log(result)
      var dataToSendToClient = result
      var JSONdata = JSON.stringify(dataToSendToClient)
      con.end
      res.send(JSONdata)
    })
  }
  else if(req.query.state === 2){
    sql = `SELECT AssignedHomework FROM UserData WHERE UserName = "${req.query.un}"`
    con.query(sql, function(err, result){
      if (err) throw err
      console.log(result)
      var dataToSendToClient = result
      var JSONdata = JSON.stringify(dataToSendToClient)
      con.end
      res.send(JSONdata)
    })
  }
})
/*router.get('/', upload.fields([]), function(req, res){
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
  console.log("anden")
  console.log(req.body)

  var dataToSendToClient = ""
  var JSONdata = JSON.stringify(dataToSendToClient)
  res.send(JSONdata)

})*/

module.exports = router;