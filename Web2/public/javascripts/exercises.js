document.addEventListener('DOMContentLoaded', function(){
    getRequest()
})



function getRequest(query){
    var req = new XMLHttpRequest();
    var url = '/exercises';
    state = "?state=1"

    req.open('GET',url+state,true); // set this to POST if you would like
    req.addEventListener('load',onLoad);
    req.addEventListener('error',onError);

    req.send()

    function onLoad() {
        var response = this.responseText;
        var parsedResponse = JSON.parse(response);
        loadData(parsedResponse[0])


    }
    function onError() {
        // handle error here, print message perhaps
        console.log('error receiving async AJAX call');
    }

}

function loadData(data){
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

}