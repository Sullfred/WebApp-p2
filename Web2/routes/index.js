var express = require('express');
var router = express.Router();

const path = require('path');


/* GET users listing. */
router.get('/index', function(req, res, next) {
  let sess = req.session
  if (sess.userLogin){
    sess.destroy()
    console.log("index test",sess)
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  }
  else
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = router;
