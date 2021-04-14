//const {Name} = require('../json/user.json');

let Name = "Jens Jensen";
addname(Name);

function addname(Name) {
    let helloUser = document.querySelector("#side-box h3.character");
    helloUser.innerHTML += ` ${Name}`;
    console.log(helloUser);
}
