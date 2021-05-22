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

/*router.post('/', function(req, res, next){
  let userId = req.body.id
  let test = req.body.test
  let cleanUserId = userId.replace(`?id=`,"" )
  console.log(cleanUserId + " " + test)
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

    function getUserData(userId){
      let user = {
          PersionId: "",
          UserName: "",
          UserClassroom: "",
          Level: 0,
          CurrentXp: 0,
          RequiredXp: 0,
          Homework: 0,
          Addition: 0,
          Subtraction: 0,
          Multiplication: 0,
          Division: 0,
          Mixed: 0
      }
      let userFields = ["PersonId", "UserName", "UserClassroom", "Level", "CurrentXp",
                      "RequiredXp", "Homework", "Addition", "Subtraction", "Multiplication",
                      "Division", "Mixed"]
      let userFieldsValues = new Array(12)
      for (let index = 0; index < userFields.length; index++) {
          con.query(`SELECT ${userFields[index]} FROM UserData WHERE PersonId = "${userId}"`, function (err, result) {
              if (err) throw err;
              if (result.length != 0){
                  let rowDataPacketToString = stringify(Object.assign({}, result[0]))
                  userFieldsValues[index] = getValue(rowDataPacketToString)
              }
              if(index === 11){
                  user.PersionId = userFieldsValues[0]
                  user.UserName  = userFieldsValues[1]
                  user.UserClassroom = userFieldsValues[2]
                  user.Level = userFieldsValues[3]
                  user.CurrentXp = userFieldsValues[4]
                  user.RequiredXp = userFieldsValues[5]
                  user.Homework = userFieldsValues[6]
                  user.Addition = userFieldsValues[7]
                  user.Subtraction = userFieldsValues[8]
                  user.Multiplication = userFieldsValues[9]
                  user.Division = userFieldsValues[10]
                  user.Mixed = userFieldsValues[11]
                  console.log("UserData retrieved")
                  console.log(user)
                  return res.redirect('/student.html?' +`ld=1`+ `&pid=${user.PersionId}`+`&un=${user.UserName}`
                  +`&uc=${user.UserClassroom}`+`&ul=${user.Level}`+`&ucxp=${user.CurrentXp}`+`&urxp=${user.RequiredXp}`
                  +`&uhmw=${user.Homework}`+`&uadd=${user.Addition}`+`&usubt=${user.Subtraction}`+`&umult=${user.Multiplication}`
                  +`&udiv=${user.Division}`+`&umix=${user.Mixed}`)
              }
          })
      }
  }
  function getValue(result){
    let Value = result.substring(result.indexOf(`=`)+1,result.length)
    return Value
    }
  user = getUserData(cleanUserId)
})*/

/* GET users listing. */
router.get('/student', function(req, res, next) {
  res.send('../public/student.html');

});

router.get('/', function(req, res){
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

    console.log(req.query)

    con.query(`SELECT * FROM UserData WHERE PersonId = '${req.query.pid}' AND UserName = '${req.query.un}' AND UserClassroom = '${req.query.uc}'`
    ,function (err, result) {
      if (err) throw err;

      var dataToSendToClient = result
      var JSONdata = JSON.stringify(dataToSendToClient)
      res.send(JSONdata)
    })
})



module.exports = router;
