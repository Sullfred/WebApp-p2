//const {Name} = require('../json/user.json');

let user = {
    Name: "Jens Jensen",
    currentLevel: 0,
    lektier: 1,
    currentXp: 0,
    requiredXp: 15,
};

addName(user.Name);
addLevel(user.currentLevel);
addHomework(lektier);
solvedAssignments("compPlus")
//leveling(user.currentXp, user.currentLevel, 197, user.requiredXp)
xpView(user.currentXp, user.requiredXp)


/* ----------------------- */

function addName(Name) {
    let helloUser = document.getElementById('helloUser')
    helloUser.innerHTML += ` ${Name}`;
}


function addLevel(level){
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

function xpView(currentXp, requiredXp){
    xpObject = document.querySelector('#xp')
    xpObject.innerHTML = `${currentXp}/${requiredXp}`
}