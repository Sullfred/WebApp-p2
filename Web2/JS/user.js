//const {Name} = require('../json/user.json');

let Name = "Jens Jensen";
addname(Name);

function addname(Name) {
    let helloUser = document.getElementById('helloUser');
    helloUser.innerHTML += ` ${Name}`;
    
}