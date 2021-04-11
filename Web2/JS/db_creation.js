// download -> https://dev.mysql.com/downloads/mysql/
// kør  -> npm install mysql <- i terminalen før brug

let mysql = require('mysql')
const { isNull } = require('util')
let con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'P2Users'
})

con.connect(function(err){
    if (err) throw err
    console.log("Connected!")
    con.query("CREATE DATABASE IF NOT EXISTS P2Users", function (err, result){
        if (err) throw err
        console.log("Database available")
    })
    con.query("DROP TABLE IF EXISTS Users")
    let sql = `CREATE TABLE Users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                UserType VARCHAR(255),
                UserLogin VARCHAR(255),
                UserPass VARCHAR(255),
                UserSalt VARCHAR(255))`
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created")
    })
    for (let index = 1; index !== 31; index++) {
        let userType = "Elev"
        if (10%index===0){
            userType = "Lærer"
        }
        let saltGenerator = 5
        let sql = `INSERT INTO Users (UserType, UserLogin, UserPass, UserSalt)
                VALUES ('${userType}', '${userType}Login${index}', '${userType}Password${index}', '${saltGenerator}' )`
        con.query(sql, function(err, result){
            if (err) throw err
            single= "record"
            if(index > 1){single+="s"}
            console.log(`${index} ${single} have been created`)
        })
    }
    con.query("SELECT * FROM Users", function (err, result, fields){
        if (err) throw err
        console.log(result)
    })
//    con.end()
})


/* Forsøg på at lave en funktion der trækker data ud af databasen*/

setTimeout(login, 3000)
function login(){
let enteredUserLogin = 'ElevLogin30'
let enteredUserPassword = "ElevPassword30"
getUserData(enteredUserLogin, enteredUserPassword)
}

function getUserData(enteredUserLogin, enteredUserPassword){
        con.query(`SELECT UserPass FROM Users WHERE UserLogin = "${enteredUserLogin}"`, function (err, result) {
          if (err) throw err;
          let bool = isNull(result)
          if (bool === false)
          console.log(result)
          else if (bool === true)
          console.log("Bruger ikke fundet")
        })
}
