var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var app = express();
app.use( bodyParser.json() );       // to support JSON-encoded bodies

app.use(bodyParser.urlencoded({extended: true}));

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
router.get('/class', function(req, res, next) {
    res.send('../public/class');
});

router.get('/', function(req,res) {
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

    let classroom = req.query.uc

    let sql = `SELECT * FROM UserData WHERE UserClassroom = "${classroom}"`
    con.query(sql, function(err, result){
        if (err) throw err

        let name = req.query.un
        let teacherIndex = 0

        for (let index = 0; index < result.length; index++) {
            if(result[index].UserName === name){
                teacherIndex = index
                break
            }
        }
        let editedResult = []

        for (let index = 0; index < result.length; index++) {
            editedResult[index] = result[index]
        }
        editedResult.splice(teacherIndex,1)
        console.log(result[teacherIndex].Homework)

        for (let index = 0; index < editedResult.length; index++) {
            homework = editedResult[index].AssignedHomework
            if(homework !== ""){
                if(result[teacherIndex].AssignedHomework.includes(homework) === false){
                    result[teacherIndex].AssignedHomework += (homework + ",")
                }
            }
            if(result[teacherIndex].AssignedHomework === "" ){
                result[teacherIndex].Homework = 0
            }
            else if(result[teacherIndex].AssignedHomework.includes(",")){
                result[teacherIndex].Homework = 1
            }
        }
        var dataToSendToClient = result
        // convert whatever we want to send (preferably should be an object) to JSON
        var JSONdata = JSON.stringify(dataToSendToClient)
        con.end
        res.send(JSONdata)
    })
})


module.exports = router;