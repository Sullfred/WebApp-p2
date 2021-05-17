//const {Name} = require('../json/user.json');

const userDataQueryString = window.location.search
let firstCleanUDQS = userDataQueryString.split("&")

let secondCleanUDQS=[]

for (let index = 0; index < firstCleanUDQS.length; index++) {
    secondCleanUDQS[index] = firstCleanUDQS[index].split("=")
}

let finalCleanUDQS=[]
let innerIndex = 1
for (let index = 0; index < secondCleanUDQS.length; index++) {
    if (index === 2){
        secondCleanUDQS[index][innerIndex] = secondCleanUDQS[index][innerIndex].replace("%20", " ")
    }
    finalCleanUDQS[index] = secondCleanUDQS[index][innerIndex]
}

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
leveling(user.CurrentXp, user.CurrentLevel, 1197, user.RequiredXp)
xpView(user.CurrentXp, user.RequiredXp)
xpBar(user.CurrentXp, user.RequiredXp)


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

function leveling(currentXp, currentLevel, earnedXp, requiredXp){
    let newXp = currentXp + earnedXp
    if (newXp >= requiredXp){
        currentLevel++;
        currentXp = newXp-requiredXp;
        requiredXp = Math.floor(requiredXp*1.2);
        if(currentXp >= requiredXp){
//            console.log(`CurrentXp:${currentXp}, Currentlvl:${currentLevel}, NewXp:${newXp}, RequiredXp:${requiredXp}`);
            leveling(currentXp, currentLevel, 0, requiredXp);
        }
        else{
//            console.log(`CurrentXp:${currentXp}, Currentlvl:${currentLevel}, NewXp:${newXp}, RequiredXp:${requiredXp}`);
            return currentLevel, currentXp, requiredXp;
        }
    }
    else{
//        console.log(`CurrentXp:${currentXp}, Currentlvl:${currentLevel}, NewXp:${newXp}, RequiredXp:${requiredXp}`)
        return newXp;
    }

}

function xpBar(currentXp, requiredXp){
    let xpPercent = Math.round((currentXp/requiredXp)*100)
    document.querySelector("div.xp").style.width=`${xpPercent}%`
    document.querySelector("div.xp").innerHTML=`${xpPercent}%`
}