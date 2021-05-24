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

const session = require('express-session');
app.use(session({secret: 'ssshhhhh'}));

/* GET users listing. */
router.get('/homeworkCreator', function(req, res, next) {
  res.send('../public/homeworkCreator.html');
});


router.post('/', upload.fields([]), function(req, res, next){
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

    /*con.connect(function(err) {
      if (err) throw err;
      console.log("Connected to database")
    });*/


  let creator = req.query.un
  let task = req.body.task
  let assignmentType = (deffAssType(task))
  let difficulty =req.body.difficulty
  let xpAmount = deffXpAmm(difficulty)
  let answer = req.body.answer
  let assignmentIdentifier = assIdtf()


  function assIdtf(){
    let sql = `SELECT COUNT(AssignmentIdentifier) FROM Homework WHERE Creator = '${req.query.un}'`
    con.query(sql, function(err, result){
      if (err) throw err
      let assAmm = 0
      for (const key in result[0]) {
        if (Object.hasOwnProperty.call(result[0], key)) {
          assAmm = result[0][key];
        }
      }
      firstLetter = req.query.un.substring(0,1)
      secondLetter = req.query.un.substring(req.query.un.search(" ")+1, req.query.un.search(" ")+2)
      initials = firstLetter + secondLetter
      let assIdtf  = req.query.pid + initials + assAmm
      con.end
    })
  }

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

  function putAssignment(assignmentIdentifier, creator, assignmentType, difficulty, xpAmount, task, answer){
    let fields = ["Creator","AssignmentType","Difficulty"
                  ,"XpAmount", "Assignment","Answer",]
    con.query(`SET FOREIGN_KEY_CHECKS = 0`)
    con.query(`INSERT INTO Homework (assignmentIdentifier, Creator, AssignmentType, Difficulty, XpAmount, Assignment, Answer)
              VALUES (${con.escape(assignmentIdentifier)}, ${con.escape(creator)}, ${con.escape(assignmentType)}, ${con.escape(difficulty)}, ${con.escape(xpAmount)}, ${con.escape(task)}, ${con.escape(answer)})`)
    con.query(`SET FOREIGN_KEY_CHECKS = 1`)
    var dataToSendToClient = ["Opgaven er blevet tilføjet"]
    var JSONdata = JSON.stringify(dataToSendToClient)
    res.send(JSONdata)
  }
  putAssignment(assignmentIdentifier, creator, assignmentType, difficulty, xpAmount, task, answer)
})

module.exports = router;