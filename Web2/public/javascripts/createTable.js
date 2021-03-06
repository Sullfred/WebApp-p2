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
})

con.connect(function(err){
    if (err) throw err
    console.log("Connected!")
createUsers()
createUserData()
CreateHomework()

})

function createUsers(){
    con.query(`SET FOREIGN_KEY_CHECKS = 0`)
    con.query(`DROP TABLE IF EXISTS Users`)
    con.query(`SET FOREIGN_KEY_CHECKS = 1`)
    let sql = `CREATE TABLE Users (
                UserLoginId INT AUTO_INCREMENT PRIMARY KEY,
                UserType VARCHAR(255),
                UserLogin VARCHAR(255),
                UserPass VARCHAR(255),
                UserSalt VARCHAR(255),
                UserPassAndSaltHashed VARCHAR(255)
            )`
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Users table created!")
    })
    for (let index = 1; index !== 31; index++) {
        let userType = "Student"
        if (10%index===0){
            userType = "Teacher"
        }
        let salt = saltGenerator()
        let userPassAndSaltHashed = sha256(userType+"Password"+index+salt)
        let sql = `INSERT INTO Users (UserType, UserLogin, UserPass, UserSalt, UserPassAndSaltHashed)
                    VALUES ('${userType}', '${userType}Login${index}', '${userType}Password${index}',
                    '${salt}', '${userPassAndSaltHashed}')`
        con.query(sql, function(err, result){
            if (err) throw err
/*
            single= "record"
            if(index > 1){single+="s"}
            console.log(`${index} ${single} have been created`)
*/
        })
    }
    let userHashTest = 1
    if (userHashTest === 1){
        let hash = sha256("StudentPassword3155555")
        let sql = `INSERT INTO Users (UserType, UserLogin, UserPass, UserSalt, UserPassAndSaltHashed)
        VALUES ('Student', 'StudentLogin31', 'StudentPassword31',
        '55555', '${hash}')`
        con.query(sql), function(err, result){
            if (err) throw err
        }
    }
}
function createUserData(){
    con.query(`SET FOREIGN_KEY_CHECKS = 0`)
    con.query("DROP TABLE IF EXISTS UserData")
    con.query(`SET FOREIGN_KEY_CHECKS = 1`)
    let sql = `CREATE TABLE UserData (
                PersonId INT AUTO_INCREMENT PRIMARY KEY,
                UserName VARCHAR(255),
                UserClassroom VARCHAR(255),
                Level INT DEFAULT "0",
                CurrentXp INT DEFAULT "0",
                RequiredXp INT DEFAULT "15",
                Homework BOOL DEFAULT "0",
                AssignedHomework VARCHAR(15000) DEFAULT ",",
                Addition INT DEFAULT "0",
                Subtraction INT DEFAULT "0",
                Multiplication INT DEFAULT "0",
                Division INT DEFAULT "0",
                SquareRoot INT DEFAULT "0",
                Potens INT DEFAULT "0",
                Mixed INT DEFAULT "0",
                FOREIGN KEY (PersonId) REFERENCES Users(UserLoginId)
            )`
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("UserData table created")
    })
    for (let index = 0; index < 31; index++) {
        let name = randName();
        let classroom = randClass()
        let sql = `INSERT INTO UserData (UserName, UserClassRoom)
                    VALUES ('${name}', '${classroom}')`
        con.query(sql, function (err, result){
            if (err) throw err;
        })
    }
}
function randClass(){
    let classroom = Math.floor(Math.random()*2+1)
    let suffixes = ["a", "b"]
    let chosenSufix = suffixes[Math.round(Math.random())]
        return classroom+"."+chosenSufix
}
function randName(){
    let firstNames = ["Nigel", "Clement", "Jamal", "Bert", "Olen", "Noel", "Emerson", "Leo", "Kelvin", "Albert", "Harland", "Jerrod", "Kevin","Brain", "Tim", "Isaiah", "Augustine", "Grover", "Beau", "Tyrone", "Casie", "Kizzie", "Joann", "Charmain", "Kiara", "Beckie", "Ammiez", "Thu", "Vernell", "Lurlene", "Katelyn", "Johna", "Christeen", "Darleen", "Cathrine", "Shavonne", "Yevette", "Myrta", "Collette", "Roxane"]
    let lastNames = ["Petty", "Webster", "Campbell", "Gilbert", "Benjamin", "Turner", "Gates", "Alvarado", "Murphy", "Chung", "Byrd", "Schneider", "Aguilar", "Stanton", "Burns", "Norton", "Macdonald", "Hancock", "Conrad", "Ramos", "Gill", "Savage", "Mccann", "Montes", "French", "Figueroa", "Guerra", "Mayo", "Nichols", "Zamora", "Meyer", "Mathis", "James", "Terrell", "Graham", "Hickman", "Paul", "Mcpherson", "Pineda", "Novak"]
        let randomFirstName = firstNames[Math.floor(Math.random()*40)]
        let randomLastName = lastNames[Math.floor(Math.random()*40)]
    return randomFirstName + " " + randomLastName;
}

function CreateHomework(){
    con.query("DROP TABLE IF EXISTS Homework")
    let sql = `CREATE TABLE Homework (
                AssignmentId INT AUTO_INCREMENT PRIMARY KEY,
                AssignmentIdentifier VARCHAR(255),
                CreatorAssignmentNum INT,
                Creator VARCHAR(255),
                AssignmentType VARCHAR(255),
                Difficulty INT DEFAULT "0",
                XpAmount INT DEFAULT "0",
                Assignment VARCHAR(255) DEFAULT "2+2",
                Answer INT DEFAULT "4",
                FOREIGN KEY (AssignmentId) REFERENCES UserData(PersonId)
            )`
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Homework table created")
    })
}

function saltGenerator(){
    salt = Math.floor(Math.random()*100000)
    if (salt < 10000)
        return saltGenerator()
    else
    return salt
}
/* Fors??g p?? at lave en funktion der tr??kker data ud af databasen*/
function getUsers(enteredUserLogin, enteredUserPassword){

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

function getUserData(userId){
    let user = {
        PersionId: "",
        UserName: "",
        UserClassroom: "",
        Level: 0,
        CurrentXp: 0,
        RequiredXp: 0,
        Homework: 0,
        Addition: 0,
        Subtraction: 0,
        Multiplication: 0,
        Division: 0,
        Mixed: 0
    }
    let userFields = ["PersonId", "UserName", "UserClassroom", "Level", "CurrentXp",
                    "RequiredXp", "Homework", "Addition", "Subtraction", "Multiplication",
                    "Division", "Mixed"]
    let userFieldsValues = new Array(12)
    for (let index = 0; index < userFields.length; index++) {
        con.query(`SELECT ${userFields[index]} FROM UserData WHERE PersonId = "${userId}"`, function (err, result) {
            if (err) throw err;
            if (result.length != 0){
                let rowDataPacketToString = stringify(Object.assign({}, result[0]))
                userFieldsValues[index] = getValue(rowDataPacketToString)
            }
            if(index === 11){
                user.PersionId = userFieldsValues[0]
                user.UserName  = userFieldsValues[1]
                user.UserClassroom = userFieldsValues[2]
                user.Level = userFieldsValues[3]
                user.CurrentXp = userFieldsValues[4]
                user.RequiredXp = userFieldsValues[5]
                user.Homework = userFieldsValues[6]
                user.Addition = userFieldsValues[7]
                user.Subtraction = userFieldsValues[8]
                user.Multiplication = userFieldsValues[9]
                user.Division = userFieldsValues[10]
                user.Mixed = userFieldsValues[11]
                console.log("UserData retrieved")
                console.log(user)
                return user
            }
        })
    }
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