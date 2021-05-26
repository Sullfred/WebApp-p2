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
            res.sendFile(path.join(__dirname, '..', 'public', 'info.html'));
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

            con.query(`SELECT * FROM UserData WHERE PersonId = ${con.escape(sess.personId)} AND UserName = ${con.escape(sess.userName)} AND UserClassroom = ${con.escape(sess.userClassroom)}`
            ,function (err, result) {
                if (err) throw err;
                var dataToSendToClient = result
                var JSONdata = JSON.stringify(dataToSendToClient)
                con.end
                console.log("Disconnected from database")
                res.send(JSONdata)
            })
        }
    }
    else
        res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
})

module.exports = router