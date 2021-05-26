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

const path = require('path');

router.get('/', function(req, res){
  let sess = req.session
  if (sess.userType === "Student"){
    if(req.query.state === undefined)
    res.sendFile(path.join(__dirname, '..', 'public', 'exercises.html'));
    else if(req.query.state === "1"){
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

      sql = `SELECT * FROM UserData WHERE UserName = ${con.escape(sess.userName)} AND PersonId = ${con.escape(sess.personId)}`
      con.query(sql, function(err, result){
        if (err) throw err
        var dataToSendToClient = result
        var JSONdata = JSON.stringify(dataToSendToClient)
        con.end
        res.send(JSONdata)
      })
    }
  }
  else{
    res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
  }
})

router.post('/', upload.fields([]), function(req, res){
  let sess = req.session

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
  sql = `SELECT * FROM UserData WHERE UserName = ${con.escape(sess.userName)} AND PersonId =${con.escape(sess.personId)}`
  con.query(sql, function(err, result){
    if (err) throw err

    function levelingUp(currentXp, currentLevel, earnedXp, requiredXp){
      let newXp = currentXp + earnedXp
      if (newXp >= requiredXp){
          currentLevel++;
          currentXp = newXp-requiredXp;
          requiredXp = Math.floor(requiredXp*1.2);
          if(currentXp >= requiredXp){
              //console.log(`CurrentXp:${currentXp}, Currentlvl:${currentLevel}, NewXp:${newXp}, RequiredXp:${requiredXp}`);
              levelingUp(currentXp, currentLevel, 0, requiredXp);
          }
          else{
              //console.log(`CurrentXp:${currentXp}, Currentlvl:${currentLevel}, NewXp:${newXp}, RequiredXp:${requiredXp}`);
              return [currentLevel, currentXp, requiredXp];
          }
      }
      else{
          //console.log(`CurrentXp:${currentXp}, Currentlvl:${currentLevel}, NewXp:${newXp}, RequiredXp:${requiredXp}`)
          currentXp = newXp;
          return [currentLevel, currentXp, requiredXp];
      }
  }
    [currentLevel, currentXp, requiredXp] = levelingUp(result[0].CurrentXp, result[0].Level, Number(req.body.earnedXp), result[0].RequiredXp)

    con.query(`UPDATE UserData SET CurrentXp = ${con.escape(currentXp)} WHERE UserName =${con.escape(sess.userName)} AND PersonId =${con.escape(sess.personId)}`)
    con.query(`UPDATE UserData SET Level = ${con.escape(currentLevel)} WHERE UserName =${con.escape(sess.userName)} AND PersonId =${con.escape(sess.personId)}`)
    con.query(`UPDATE UserData SET RequiredXp = ${con.escape(requiredXp)} WHERE UserName =${con.escape(sess.userName)} AND PersonId =${con.escape(sess.personId)}`)

    let assTypesInDB = ["Addition","Subtraction","Multiplication","Division","SquareRoot","Potens","Mixed"]
    con.query(`UPDATE UserData SET ${assTypesInDB[req.body.assType]} = ${assTypesInDB[req.body.assType]}+1 WHERE UserName =${con.escape(sess.userName)} AND PersonId =${con.escape(sess.personId)}`)

    sql = `SELECT * FROM UserData WHERE UserName = ${con.escape(sess.userName)}`
    con.query(sql, function(err, result){
      if(result[0].AssignedHomework === ","){
        con.query(`UPDATE UserData SET Homework = 0 WHERE UserName =${con.escape(sess.userName)}`)

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

module.exports = router;