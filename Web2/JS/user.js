//const {Name} = require('../json/user.json');

let Name = "Jens Jensen";
let level = "69";
addname(Name);
addlevel(level);

function addname(Name) {
    let helloUser = document.getElementById('helloUser');
    helloUser.innerHTML += ` ${Name}`;
    
}


function addlevel(level){
    let userlevel = document.getElementById('level');
    userlevel.innerHTML += ` ${level}`;
}