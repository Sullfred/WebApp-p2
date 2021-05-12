import {sha256, rightRotate} from './sha256.js';

const mysql = require('mysql');

let con = mysql.createConnection({
    host: 'localhost',
    user: 'dat2c2-4',
    password: 't95oqnsuoqLpR27r',
    database: 'dat2c2_4'
  });

let enteredUserLogin = "x";
let enteredUserPassword = "y";


function getUserData(enteredUserLogin, enteredUserPassword){
    con.query(`SELECT UserPassAndSaltHashed FROM Users WHERE UserLogin = "${enteredUserLogin}"`, function (err, result) {
        if (err) throw err;
        if (result.length != 0){
            console.log(`The username "${enteredUserLogin}" was found in the database`)
            let rowDataPacketToString = stringify(Object.assign({}, result[0]))
            let hashedUserPassword = getValue(rowDataPacketToString)
            con.query(`SELECT UserSalt FROM Users WHERE UserLogin = "${enteredUserLogin}"`, function(err, result) {
                if (err) throw err
                let rowDataPacketToString = stringify(Object.assign({}, result[0]))
                let salt = getValue(rowDataPacketToString)
                checkPassMatch(enteredUserPassword, hashedUserPassword, salt)
            })
        }
        else
        console.log("Bruger ikke fundet")
    })
}

function getValue(result){
Value = result.substring(result.indexOf("=")+1,result.length)
return Value
}

function checkPassMatch (enteredUserPassword, hashedUserPassword, salt){
unhashedPassAndSalt = enteredUserPassword + salt
let hashedEnteredPassAndSalt = sha256(unhashedPassAndSalt)
if (hashedEnteredPassAndSalt === hashedUserPassword)
console.log(`The hashed value of the entered user password concatinated with the salt matches the hash
found in the database\nLogin Succesful`)
else
console.log("Login unsuccesful")
}