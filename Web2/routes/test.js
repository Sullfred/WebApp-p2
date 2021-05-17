var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var app = express();
app.use( bodyParser.json() );       // to support JSON-encoded bodies

app.use(express.urlencoded({
    extended: true
}))

/* GET users listing. */
router.get('/test', function(req, res, next) {
    res.send('../public/test.html');
});

module.exports = router