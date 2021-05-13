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
router.get('/homeworkCreator', function(req, res, next) {
  res.send('../public/homeworkCreator.html');
});

router.post('/', function(req, res, next){
  let task = req.body.task
  let answer = req.body.answer
  let difficulty =req.body.difficulty
  let queryString = JSON.stringify(req.body.fullquery)
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

  let cleanQueryString =" "
  for (let index = 6; index < queryString.length-2; index++) {
    cleanQueryString += queryString[index]
  }
  cleanQueryString = cleanQueryString.replace("%20", "")

  function putAssignment(difficulty, task, answer, cleanQueryString){
    let fields = ["Creator","AssignmentType","Difficulty"
                  ,"XpAmount", "Assignment","Answer",]
    con.query(`SET FOREIGN_KEY_CHECKS = 0`)
    con.query(`INSERT INTO Homework (Difficulty, Assignment, Answer) VALUES (${difficulty},'${task}', ${answer})`)
    con.query(`SET FOREIGN_KEY_CHECKS = 1`)
    res.redirect('/homeworkcreator.html?'+`${cleanQueryString}`)
  }
  putAssignment(difficulty, task, answer, cleanQueryString)
})

module.exports = router;