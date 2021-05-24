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
app.use(express.urlencoded({ extended: false }));

// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));

const path = require('path');

/* GET users listing. */
router.get('/', function(req, res, next) {
  let sess = req.session
  if (sess.userLogin){
    if(req.query.state === undefined){
    res.sendFile(path.join(__dirname, '..', 'public', 'assignmentlibrary.html'));
    }
    else if(req.query.state === "1"){
      var dataToSendToClient = sess.userClassroom
      var JSONdata = JSON.stringify(dataToSendToClient)
      res.send(JSONdata)
    }

    else if (req.query.state === "2"){
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

      let sql = `SELECT * FROM Homework WHERE AssignmentType = ${con.escape(req.query.asstyp)}`
      con.query(sql, function(err, result){
          if (err) throw err
        con.end
        var dataToSendToClient = result
        var JSONdata = JSON.stringify(dataToSendToClient)
        res.send(JSONdata)
      })
    }
  }
  else
    res.send("please login")
});




// upload.fields er en del af multers måde at håndtere upload af formdata
router.post('/', upload.fields([]),function(req, res){
  // make some calls to database, fetch some data, information, check state, etc...
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

  let chosenClassesArr = []
  let choClaIndex = 0
  let chosenAssignmentsArr = []
  let choAssIndex = 0
  for (const key in req.body) {
    if (Object.hasOwnProperty.call(req.body, key)) {
      const element = req.body[key];
      if(key.includes("klasse")){
        chosenClassesArr[choClaIndex] = key.substring(key.search("_")+1, key.length)
        chosenClassesArr[choClaIndex] = chosenClassesArr[choClaIndex].substr(0,1)+"."+chosenClassesArr[choClaIndex].substr(1,2)
        choClaIndex++
      }
      else if(key.includes("assignment")){
        chosenAssignmentsArr[choAssIndex] = key.substring(key.search("_")+1, key.length)+","
        choAssIndex++
      }
      else
        console.log(element)
    }
  }

  if(chosenClassesArr.length === 0 && chosenAssignmentsArr.length === 0 ){
    var dataToSendToClient = ["Venligst vælg én eller flere opgaver og klasser"]
    var JSONdata = JSON.stringify(dataToSendToClient)
    res.send(JSONdata)
  }

  else if (chosenClassesArr.length === 0){
    var dataToSendToClient = ["For at tildele opgaver skal der vælges én eller flere klasser."]
    var JSONdata = JSON.stringify(dataToSendToClient)
    res.send(JSONdata)
  }

  else if (chosenAssignmentsArr.length === 0){
    var dataToSendToClient = ["Venligst vælg den eller de opgaver der skal tilføjes til klassen lektier."]
    var JSONdata = JSON.stringify(dataToSendToClient)
    res.send(JSONdata)
  }

  else{
    for (let classIndex = 0; classIndex < chosenClassesArr.length; classIndex++) {
      for (let assIndex = 0; assIndex < chosenAssignmentsArr.length; assIndex++) {
        con.query(`SET FOREIGN_KEY_CHECKS = 0`)

        con.query(`UPDATE UserData SET AssignedHomework = CONCAT(AssignedHomework, ${con.escape(chosenAssignmentsArr[assIndex])}) WHERE UserClassroom = ${con.escape(chosenClassesArr[classIndex])}`)
        con.query(`UPDATE UserData SET Homework = 1 WHERE UserClassroom = ${con.escape(chosenClassesArr[classIndex])}`)

        con.query(`SET FOREIGN_KEY_CHECKS = 1`)
      }
    }
    con.end
    var dataToSendToClient = ["Opgaverne er blevet tilføjet til de valgte klassers lektier"]
    var JSONdata = JSON.stringify(dataToSendToClient)
    res.send(JSONdata)
  }
})

module.exports = router