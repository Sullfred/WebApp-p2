document.addEventListener('DOMContentLoaded', function(){
    let queryString = window.location.search
    getRequest(queryString)
})

function getRequest(query){
    var req = new XMLHttpRequest();
    var url = '/student';

    req.open('GET',url+query,true); // set this to POST if you would like
    req.addEventListener('load',onLoad);
    req.addEventListener('error',onError);
    req.send();

    function onLoad() {
        var response = this.responseText;
        var parsedResponse = JSON.parse(response);
        loadUserData(parsedResponse[0])
        setHrefs(parsedResponse[0])
    }

    function onError() {
        // handle error here, print message perhaps
        console.log('error receiving async AJAX call');
    }
}

function loadUserData(data){
    document.querySelector("#helloUser").innerHTML = `Hej ${data.UserName}`
    document.querySelector("#level").innerHTML = `${data.Level}`
    document.querySelector("#xp").innerHTML = `${data.CurrentXp}/${data.RequiredXp}`
    document.querySelector("#compPlus").innerHTML = `${data.Addition}`
    document.querySelector("#compMinus").innerHTML = `${data.Subtraction}`
    document.querySelector("#compGange").innerHTML = `${data.Multiplication}`
    document.querySelector("#compDiv").innerHTML = `${data.Division}`
    document.querySelector("#compRoot").innerHTML = `${data.SquareRoot}`
    document.querySelector("#compPotens").innerHTML = `${data.Potens}`
    document.querySelector("#compBlandet").innerHTML = `${data.Mixed}`
    if(data.Homework === 1)
    document.querySelector("#lektier").innerHTML = `Du har lektier for`
    else
    document.querySelector("#lektier").innerHTML = `Du har ikke lektier for`
}

function setHrefs(data){
    let queryString = window.location.search
    let sites = [["student","Hjem"],["homework", "Lektier"],["exercises", "Flere opgaver"],["progress", "Fremskridt"]]
    for (let index = 0; index < sites.length; index++) {
        document.querySelector(`#${sites[index][0]}`).innerHTML = `<li><a href='${sites[index][0]}.html${queryString}'>${sites[index][1]}</a></li>`
    }
    document.querySelector("#main-section").innerHTML = `
    <div>
        <a href="Homework.html${queryString}"><img class="homework-img" src="images/Resized-photos/hoework-edit.jpg" alt="Lektier"></a>
        <div class="img-text-1"><a href="Homework.html${queryString}">Lektier</a></div>
    </div>
    <div>
        <a href="Exercises.html${queryString}"><img class="exercise-img" src="images/Resized-photos/fler-opg.jpg" alt="Flere opgaver"></a>
        <div class="img-text-2"><a href="Exercises.html${queryString}">Flere opgaver</a></div>
    </div>
    <div>
        <a href="Progress.html${queryString}"><img class="progress-img" src="images/Resized-photos/fremskridt-placeholder.jpg" alt="Fremskridt"></a>
        <div class="img-text-3"><a href="Progress.html${queryString}">Fremskridt</a></div>
    </div>
    <div>
        <a href="#"><img class="diverse-img" src="images/Resized-photos/photo-1524578271613-d550eacf6090.jpg" alt="Diverse"></a>
        <div class="img-text-4"><a href="#">Info om hjemmesiden</a></div>
    </div>`

}