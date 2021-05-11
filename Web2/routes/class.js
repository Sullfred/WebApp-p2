var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/class', function(req, res, next) {
    res.send('../public/class.html');
});

module.exports = router;