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

  function getId(qString){
    http://localhost:3000/assignmentlibrary.html?%20ld=1&pid=1&un=Bert%20Murphy&uc=2.a&ul=0&ucxp=0&urxp=15&uhmw=0&uadd=0&usubt=0&umult=0&udiv=0&umix=0
    start = qString.search("&pid=")
    end = qString.search("&un=")
    pid = qString.substring(start+5, end)
    return pid
  }

  let creator = uncleanUsername.replace("%20", " ")
  let task = req.body.task
  let assignmentType = (deffAssType(task))
  let difficulty =req.body.difficulty
  let xpAmount = deffXpAmm(difficulty)
  let answer = req.body.answer
  let assignmentIdentifier = assIdtf(uncleanUsername, getId(cleanQueryString) )
  console.log(assignmentIdentifier)

  function assIdtf(name, pId){
    let cleanUsername = name.replace("%20"," ")
    firstLetter = cleanUsername.substring(0,1)
    secondLetter = cleanUsername.substring(cleanUsername.search(" ")+1, cleanUsername.search(" ")+2)
    initials = firstLetter + secondLetter
    let assIdtf  = pId + initials
    console.log(assIdtf)
    return assIdtf

    /*let sql = `SELECT COUNT(AssignmentIdentifier) FROM Homework WHERE Creator = '${cleanUsername}'`
    con.query(sql, function(err, result){
      if (err) throw err
      let teacherAssAmm = 5
      let initials = ""
      let dataPacket = rowDataPacketToString = stringify(Object.assign({}, result[0]))
      teacherAssAmm = dataPacket.substring(dataPacket.search("=")+1, dataPacket.length)
    

    })
    */
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

  function putAssignment(assignmentIdentifier, creator, assignmentType, difficulty, xpAmount, task, answer, cleanQueryString){
    let fields = ["Creator","AssignmentType","Difficulty"
                  ,"XpAmount", "Assignment","Answer",]
    con.query(`SET FOREIGN_KEY_CHECKS = 0`)
    con.query(`INSERT INTO Homework (assignmentIdentifier, Creator, AssignmentType, Difficulty, XpAmount, Assignment, Answer)
               VALUES ('${assignmentIdentifier}','${creator}', '${assignmentType}', ${difficulty}, ${xpAmount}, '${task}', ${answer})`)
    con.query(`SET FOREIGN_KEY_CHECKS = 1`)
    res.redirect('/homeworkcreator.html?'+`${cleanQueryString}`)
  }
  putAssignment(assignmentIdentifier, creator, assignmentType, difficulty, xpAmount, task, answer, cleanQueryString)
})

module.exports = router;