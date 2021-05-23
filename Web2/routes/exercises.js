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
router.get('/exercises', function(req, res, next) {
  res.redirect("../public/Exercises.html");
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

  sql = `SELECT * FROM UserData WHERE UserName = "${con.escape(req.query.un)}"`
  con.query(sql, function(err, result){
    if (err) throw err
    var dataToSendToClient = result
    var JSONdata = JSON.stringify(dataToSendToClient)
    con.end
    res.send(JSONdata)
  })
})

router.post('/', upload.fields([]), function(req, res){
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

  console.log(req.body)
  var dataToSendToClient = 1
  var JSONdata = JSON.stringify(dataToSendToClient)
  con.end
  res.send(JSONdata)
  /*sql = `SELECT XpAmount FROM Homework WHERE Answer = ${req.body.answer} AND AssignmentId = ${req.body.assId}`
  con.query(sql, function(err, result){
    if (err) throw err
    con.query(`UPDATE UserData SET CurrentXp = CurrentXp+${result[0].XpAmount} WHERE UserName = '${req.query.un}'`)
    sql = `SELECT * FROM UserData WHERE UserName = '${req.query.un}'`
    con.query(sql, function(err, result){
      if (err) throw err
      let homework = result[0].AssignedHomework.split(",")
      doneAssIndex = homework.indexOf(req.body.assId)
      let newHomework =""
      for (let index = 0; index < homework.length-1; index++) {
        if(index !== doneAssIndex){
          newHomework += homework[index]
          newHomework += ","
        }
      }
      let level = result[0].Level 
      let currentXp = result[0].CurrentXp
      let reqXp = result[0].RequiredXp
      if(currentXp >= reqXp){
        level++
        reqXp = Math.floor(reqXp * 1.2)
        leftOver = currentXp%reqXp
        currenXp = leftOver
      }
      con.query(`UPDATE UserData SET CurrentXp = ${currentXp} WHERE UserName ='${req.query.un}'`)
      con.query(`UPDATE UserData SET Level = ${level} WHERE UserName ='${req.query.un}'`)
      con.query(`UPDATE UserData SET RequiredXp = ${reqXp} WHERE UserName ='${req.query.un}'`)
      con.query(`UPDATE UserData SET AssignedHomework = '${newHomework}' WHERE UserName ='${req.query.un}'`)

      sql = `SELECT AssignmentType FROM Homework WHERE AssignmentId = ${req.body.assId}`
      con.query(sql, function(err, result){

        let assTypes = ["Plus","Minus","Gange","Dividere","Rødder","Potens", "Mixed"]
        let assTypesInDB = ["Addition","Subtraction","Multiplication","Division","SquareRoot","Potens","Mixed"]
        for (let index = 0; index < assTypes.length; index++) {
          console.log(result[0].AssignmentType, assTypes[index])
          if(result[0].AssignmentType === assTypes[index]){
            console.log("test")
            con.query(`UPDATE UserData SET ${assTypesInDB[index]} = ${assTypesInDB[index]}+1 WHERE UserName ='${req.query.un}'`)
          }
        }

        sql = `SELECT * FROM UserData WHERE UserName = '${req.query.un}'`
        con.query(sql, function(err, result){
          if(result[0].AssignedHomework === ","){
            con.query(`UPDATE UserData SET Homework = 0 WHERE UserName ='${req.query.un}'`)
            var dataToSendToClient = 0
            var JSONdata = JSON.stringify(dataToSendToClient)
            con.end
            res.send(JSONdata)
            }
          else{
            var dataToSendToClient = 1
            var JSONdata = JSON.stringify(dataToSendToClient)
            con.end
            res.send(JSONdata)
          }
        })
      })
    })
  })*/
})

module.exports = router;