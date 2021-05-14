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
router.get('/class', function(req, res, next) {
    res.send('../public/class.html');
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
    let classroom = req.body.classid


    function getStudents(classroom){


    let sql = `SELECT * FROM UserData WHERE UserClassroom = "${classroom}"`
    con.query(sql, function(err, result){
        if (err) throw err
        console.log(typeof result[0].UserName)
        let test = result
        console.log(test)
        let studentArray = []
        let inner =[]
        for (let index2 = 0; index2 <= 5; index2++) {
            studentArray[index2] = inner
                inner[0]=result[0].PersonId
                inner[1]=result[1].UserName
                inner[2]=result[2].UserClassroom
                inner[3]=result[3].Level
                inner[4]=result[4].CurrentXp
                inner[5]=result[5].RequiredXp
                inner[6]=result[6].Homework
                inner[7]=result[7].Addition
                inner[9]=result[8].Subtraction
                inner[10]=result[9].Multiplication
                inner[11]=result[10].Division
                inner[12]=result[11].SquareRoot
                inner[13]=result[12].Potens
                inner[14]=result[13].Mixed
        }
        console.log(inner)
        res.redirect("class.html" + "http://localhost:3000/class.html?ld=1&pid=1&un=Emerson%20Guerra&uc=2.b&ul=0&ucxp=0&urxp=15&uhmw=1&uadd=0&usubt=0&umult=0&udiv=0&umix=0")
    })
    }
    getStudents(classroom)
})

module.exports = router;