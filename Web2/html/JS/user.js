//const {Name} = require('../json/user.json');

let user = {
    Name: "Jens Jensen",
    currentLevel: 0,
    lektier: 1,
    currentXp: 0,
    requiredXp: 15,
};

addname(user.Name);
addlevel(user.currentLevel);
addHomework(lektier);
solvedAssignments("compplus")
leveling(user.currentXp, user.currentLevel, 127, user.requiredXp)

function addname(Name) {
    let helloUser = document.getElementById('helloUser');
    helloUser.innerHTML += ` ${Name}`;
}


function addlevel(level){
    let userlevel = document.getElementById('level');
    userlevel.innerHTML += ` ${level}`;
}

function addHomework(lektier) {
    let homework = document.getElementById('lektier');

    if (lektier)
        homework.innerHTML = "Du har lektier for";
    else
    homework.innerHTML = "Du har ikke lektier for";
}

function solvedAssignments(assignmentType){
    let solved = document.querySelector(`#${assignmentType}`)
    console.log(solved)
    solved.innerHTML++
}

function leveling(currentXp, currentLevel, earnedXp, requiredXp){
    let newXp = currentXp + earnedXp
    if (newXp >= requiredXp){
        currentLevel++
        currentXp = newXp%requiredXp
        requiredXp = Math.floor(requiredXp*1.25)
        console.log(`CurrentXp:${currentXp}, Currentlvl:${currentLevel}, NewXp:${newXp}, RequiredXp:${requiredXp}`)
        return currentLevel, currentXp, requiredXp
    }
    else{
        console.log(`CurrentXp:${currentXp}, Currentlvl:${currentLevel}, NewXp:${newXp}, RequiredXp:${requiredXp}`)
        return newXp
    }

}