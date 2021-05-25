document.addEventListener('DOMContentLoaded', function(){
    getRequest()
})



function getRequest(){
    var req = new XMLHttpRequest();
    var url = '/progress';
    let state = "?state=1"

    req.open('GET',url+state,true); // set this to POST if you would like
    req.addEventListener('load',onLoad);
    req.addEventListener('error',onError);
    req.send();
    function onLoad() {
        var response = this.responseText;
        var parsedResponse = JSON.parse(response);
        loadUserData(parsedResponse)
    }
    function onError() {
        // handle error here, print message perhaps
        console.log('error receiving async AJAX call');
    }
}

function loadUserData(data){
    document.querySelector("#helloUser").innerHTML = `Velkommen til din fremskridts side: ${data[0].UserName}`
    document.querySelector("#level").innerHTML = `Du er i level: ${data[0].Level}`
    document.querySelector("#nuværendeXp").innerHTML = `Nuværende XP: ${data[0].CurrentXp}`
    document.querySelector("#requiredXp").innerHTML = `Manglende xp for at level up: ${data[0].RequiredXp-data[0].CurrentXp}`
    document.querySelector("#combAss").innerHTML = `${data[0].Addition+data[0].Subtraction+data[0].Multiplication+data[0].Division+data[0].SquareRoot+data[0].Potens+data[0].Mixed}`
    document.querySelector("#compPlus").innerHTML = `${data[0].Addition}`
    document.querySelector("#compMinus").innerHTML = `${data[0].Subtraction}`
    document.querySelector("#compGange").innerHTML = `${data[0].Multiplication}`
    document.querySelector("#compDiv").innerHTML = `${data[0].Division}`
    document.querySelector("#compRoot").innerHTML = `${data[0].SquareRoot}`
    document.querySelector("#compPotens").innerHTML = `${data[0].Potens}`
    document.querySelector("#compBlandet").innerHTML = `${data[0].Mixed}`
    xpBar(data[0].CurrentXp, data[0].RequiredXp)
}

function xpBar(currentXp, requiredXp){
    let xpPercent = Math.round((currentXp/requiredXp)*100)
    document.querySelector("div.xp").style.width=`${xpPercent}%`
    document.querySelector("div.xp").innerHTML=`${xpPercent}%`
}