export {addName, addLevel, addHomework};

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
