const { Console } = require('console')
let mysql = require('mysql')
const ResultSet = require('mysql/lib/protocol/ResultSet')
const { stringify } = require('querystring')
const { isNull } = require('util')
let con = mysql.createConnection({
/*  host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'P2Users'
*/  host: 'localhost',
    user: 'dat2c2-4',
    password: 't95oqnsuoqLpR27r',
    database: 'dat2c2_4'
})

con.connect(function(err){
    if (err) throw err
    console.log("Connected!")
    //con.query("CREATE DATABASE IF NOT EXISTS P2Users", function (err, result){
    //    if (err) throw err
    //    console.log("Database available")
    //})
    con.query("DROP TABLE IF EXISTS Users")
    let sql = `CREATE TABLE Users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                UserType VARCHAR(255),
                UserLogin VARCHAR(255),
                UserPass VARCHAR(255),
                UserSalt VARCHAR(255),
                UserPassAndSaltHashed VARCHAR(255))`
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created")
    })
    for (let index = 1; index !== 31; index++) {
        let userType = "Elev"
        if (10%index===0){
            userType = "Lærer"
        }
        let salt = saltGenerator()
        let userPassAndSaltHashed = sha256(userType+"Password"+index+salt)
        let sql = `INSERT INTO Users (UserType, UserLogin, UserPass, UserSalt, UserPassAndSaltHashed)
                    VALUES ('${userType}', '${userType}Login${index}', '${userType}Password${index}',
                    '${salt}', '${userPassAndSaltHashed}')`
        con.query(sql, function(err, result){
            if (err) throw err
            single= "record"
            if(index > 1){single+="s"}
            console.log(`${index} ${single} have been created`)
        })
    }
    let userHashTest = 1
    if (userHashTest = 1){
        let hash = sha256("ElevPassword3155555")
        let sql = `INSERT INTO Users (UserType, UserLogin, UserPass, UserSalt, UserPassAndSaltHashed)
        VALUES ('Elev', 'ElevLogin31', 'ElevPassword31',
        '55555', '${hash}')`
        con.query(sql), function(err, result){
            if (err) throw err
        }
    }
    con.query("SELECT * FROM Users", function (err, result, fields){
        if (err) throw err
        console.log(result)
    })
//    con.end()
})

function saltGenerator(){
    salt = Math.floor(Math.random()*100000)
    if (salt < 10000)
        return saltGenerator()
    else
    return salt
}
/* Forsøg på at lave en funktion der trækker data ud af databasen*/

//setTimeout(login, 1500)
document.querySelector("#submitbutton").addEventListener("click", login)
function login(){
    let enteredUserLogin = document.querySelector("#username").value + ""
    let enteredUserPassword = document.querySelector("#password").value + ""
    getUserData(enteredUserLogin, enteredUserPassword)
}

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



/*https://stackoverflow.com/a/65237583*/
function sha256(ascii) {
    function rightRotate(value, amount) {
        return (value >>> amount) | (value << (32 - amount));
    }
    ;

    var mathPow = Math.pow;
    var maxWord = mathPow(2, 32);
    var lengthProperty = 'length';
    var i, j; // Used as a counter across the whole file
    var result = '';

    var words = [];
    var asciiBitLength = ascii[lengthProperty] * 8;

    //* caching results is optional - remove/add slash from front of this line to toggle
    // Initial hash value: first 32 bits of the fractional parts of the square roots of the first 8 primes
    // (we actually calculate the first 64, but extra values are just ignored)
    var hash = sha256.h = sha256.h || [];
    // Round constants: first 32 bits of the fractional parts of the cube roots of the first 64 primes
    var k = sha256.k = sha256.k || [];
    var primeCounter = k[lengthProperty];
    /*/
     var hash = [], k = [];
     var primeCounter = 0;
     //*/

    var isComposite = {};
    for (var candidate = 2; primeCounter < 64; candidate++) {
        if (!isComposite[candidate]) {
            for (i = 0; i < 313; i += candidate) {
                isComposite[i] = candidate;
            }
            hash[primeCounter] = (mathPow(candidate, .5) * maxWord) | 0;
            k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
        }
    }

    ascii += '\x80'; // Append ?' bit (plus zero padding)
    while (ascii[lengthProperty] % 64 - 56)
        ascii += '\x00'; // More zero padding

    for (i = 0; i < ascii[lengthProperty]; i++) {
        j = ascii.charCodeAt(i);
        if (j >> 8)
            return; // ASCII check: only accept characters in range 0-255
        words[i >> 2] |= j << ((3 - i) % 4) * 8;
    }
    words[words[lengthProperty]] = ((asciiBitLength / maxWord) | 0);
    words[words[lengthProperty]] = (asciiBitLength);

    // process each chunk
    for (j = 0; j < words[lengthProperty]; ) {
        var w = words.slice(j, j += 16); // The message is expanded into 64 words as part of the iteration
        var oldHash = hash;
        // This is now the undefinedworking hash", often labelled as variables a...g
        // (we have to truncate as well, otherwise extra entries at the end accumulate
        hash = hash.slice(0, 8);

        for (i = 0; i < 64; i++) {
            var i2 = i + j;
            // Expand the message into 64 words
            // Used below if 
            var w15 = w[i - 15], w2 = w[i - 2];

            // Iterate
            var a = hash[0], e = hash[4];
            var temp1 = hash[7]
                    + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) // S1
                    + ((e & hash[5]) ^ ((~e) & hash[6])) // ch
                    + k[i]
                    // Expand the message schedule if needed
                    + (w[i] = (i < 16) ? w[i] : (
                            w[i - 16]
                            + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3)) // s0
                            + w[i - 7]
                            + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10)) // s1
                            ) | 0
                            );
            // This is only used once, so *could* be moved below, but it only saves 4 bytes and makes things unreadble
            var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) // S0
                    + ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2])); // maj

            hash = [(temp1 + temp2) | 0].concat(hash); // We don't bother trimming off the extra ones, they're harmless as long as we're truncating when we do the slice()
            hash[4] = (hash[4] + temp1) | 0;
        }

        for (i = 0; i < 8; i++) {
            hash[i] = (hash[i] + oldHash[i]) | 0;
        }
    }

    for (i = 0; i < 8; i++) {
        for (j = 3; j + 1; j--) {
            var b = (hash[i] >> (j * 8)) & 255;
            result += ((b < 16) ? 0 : '') + b.toString(16);
        }
    }
    return result;
};
/*https://stackoverflow.com/a/65237583*/