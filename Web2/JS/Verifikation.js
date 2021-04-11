/* Indsætte forbindelse til database */


let enteredLogin //indtastet brugerid
let enteredPassword  // indtastet password

function getData(enteredLogin, enteredPassword){
    let userTableId = 0
    userTableId = getUserId(enteredLogin);
    if(userTableId !== 0){
        let hashedUserPassword = getUserPassword(userTableId);
    }
    return hashedUserPassword
}

function getUserId(enteredLogin){
    let foundTableId = 0, id = 0
    //tilgå database
    //søgealgoritme der finder det indtastede logins ID
    foundTableId = 1
    if(foundTableId !== 0)
        return id
    else 0
}

function getUserPassword(userTableId){
    // tilgå kolone basseret på parameterinput (tableID)
    let HashedPassword = //hashedpassword
    return hashedPassword
}

function verifyPassword(){
    let hashedUserPassword = getData(enteredLogin, enteredPassword)
    let hashedEnteredPassword// hash enteredPassword
    if (hashedUserPassword === hashedEnteredPassword)
        return 1
    else
        return 0
}