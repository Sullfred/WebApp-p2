const mysql = require('mysql');

let con = mysql.createConnection({
    host: 'localhost',
    user: 'dat2c2-4',
    password: 't95oqnsuoqLpR27r',
    database: 'dat2c2_4'
  });

  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM UserData", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });