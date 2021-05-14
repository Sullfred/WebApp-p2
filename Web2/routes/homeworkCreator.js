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

  let queryString = JSON.stringify(req.body.fullquery)
  let cleanQueryString =" "
  for (let index = 6; index < queryString.length-2; index++) {
    cleanQueryString += queryString[index]
  }
  uncleanUsername = getUserName(cleanQueryString)
  cleanQueryString = cleanQueryString.replace("%20", "")
  cleanUsername = uncleanUsername.replace("%20","")
  cleanQueryString = cleanQueryString.replace(cleanUsername,uncleanUsername)

  function getUserName(string){
    start = string.search("&un=")
    end = string.search("&uc=")
    substring = string.substring(start+4, end)
    return substring
  }

  let creator = uncleanUsername.replace("%20", " ")
  let task = req.body.task
  let assignmentType = (deffAssType(task))
  let difficulty =req.body.difficulty
  let xpAmount = deffXpAmm(difficulty)
  let answer = req.body.answer



  function deffAssType(task){
    let counter = 0
    let diffOperators = [["+", "Plus"], ["-", "Minus"], ["×", "Gange"], ["÷", "Dividere"],
                        ["√", "Rødder"], ["^", "Potens"]]
    for (let index = 0; index < 6; index++) {
      if(task.includes(diffOperators[index][0]) === true){
        counter++
      }
    }
    if (counter === 1){
      for (let index = 0; index < 6; index++) {
      if(task.includes(diffOperators[index][0]) === true)
        return diffOperators[index][1]
      }
    }
    else
      return "Mixed"
  }

  function deffXpAmm(difficulty){
    let xp = 0
    switch(difficulty){
      case "1":
        xp = 5;
        break;
      case "2":
        xp = 8;
        break;
      case "3":
        xp = 11;
        break;
      default:
        xp = 5
    }
    return xp
  }

  function putAssignment(creator, assignmentType, difficulty, xpAmount, task, answer, cleanQueryString){
    let fields = ["Creator","AssignmentType","Difficulty"
                  ,"XpAmount", "Assignment","Answer",]
    con.query(`SET FOREIGN_KEY_CHECKS = 0`)
    con.query(`INSERT INTO Homework (Creator, AssignmentType, Difficulty, XpAmount, Assignment, Answer) VALUES ('${creator}', '${assignmentType}', ${difficulty}, ${xpAmount}, '${task}', ${answer})`)
    con.query(`SET FOREIGN_KEY_CHECKS = 1`)
    res.redirect('/homeworkcreator.html?'+`${cleanQueryString}`)
  }
  putAssignment(creator, assignmentType, difficulty, xpAmount, task, answer, cleanQueryString)
})

module.exports = router;