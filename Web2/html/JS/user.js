//const {Name} = require('../json/user.json');

let Name = "Jens Jensen";
let level = "69";
let lektier = 1;

addname(Name);
addlevel(level);
addHomework(lektier);
solvedAssignments("compplus")

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
