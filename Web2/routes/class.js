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

router.get('/', function(req,res) {
    // make some calls to database, fetch some data, information, check state, etc...

    let test= req.body.test
    console.log(test)
    test2 = req.query.un
    console.log(test2)
    console.log(typeof test, typeof test2)

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

    /////////////////////
    let classroom = "2.b"
    /////////////////////
    let sql = `SELECT * FROM UserData WHERE UserClassroom = "${classroom}"`
    con.query(sql, function(err, result){
        if (err) throw err

    var dataToSendToClient = result
    // convert whatever we want to send (preferably should be an object) to JSON
    var JSONdata = JSON.stringify(dataToSendToClient)
    con.end
    res.send(JSONdata)
    })
})


module.exports = router;