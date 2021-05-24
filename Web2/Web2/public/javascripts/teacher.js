document.addEventListener('DOMContentLoaded', function(){
    let queryString = window.location.search
    //loadData(queryString)
})

function loadData(queryString){
let navsites = [["teacher","Forside"],["class", "Klasser"],["homeworkcreator", "Opgaver"]]
for (let index = 0; index < navsites.length; index++) {
    document.querySelector(`#${navsites[index][0]}`).innerHTML = `<li><a href='${navsites[index][0]}.html${queryString}'>${navsites[index][1]}</a></li>`
}
document.querySelector("#classpic").innerHTML = `<a id="classpic" href="class.html${queryString}" title="Tilgå klasse & elevoversigt"><img class="class-page" src="images/klasse.jpeg" alt="Klasse"></a>`
document.querySelector("#classtext").innerHTML = `<div id="classtext" class="image-text"><a href="class.html${queryString}">Klasser</a></div>`
document.querySelector("#asspic").innerHTML = `<a id="asspic" href="homeworkcreator.html${queryString}" title="Tilgå lektie & opgavesiden"><img class="homework-page" src="images/Opgaver.jpeg" alt="Opgave"></a>`
document.querySelector("#asstext").innerHTML = `<div id="asstext" class="image-text2"><a href="homeworkcreator.html${queryString}">Opgaver</a></div>`
}