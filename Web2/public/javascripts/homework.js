
document.addEventListener('DOMContentLoaded', function(){
    /*let queryString = window.location.search

    let navButtonsIds = ["student", "homework", "exercises", "progress"]
    for (let index = 0; index < navButtonsIds.length; index++) {
        document.querySelector(`#${navButtonsIds[index]}`).href += `${queryString}`
    }*/
    getRequest()
})

function getRequest(){
    var req = new XMLHttpRequest();
    var url = 'homework';
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
        console.log('Error on GET, State=1');
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
    if(data.Homework === 1)
        document.querySelector("#lektier").innerHTML = `Du har lektier for`
    else
        document.querySelector("#lektier").innerHTML = `Du har ikke lektier for`

    check = homeWorkBox(data)
    if(check === 1){
        getHomeworkRequest(data.AssignedHomework)
    }

}

function homeWorkBox(data){
    const gotHomework = document.querySelector(".homeworkQuestionmark");
    const homeworkSite = document.querySelector('#gotHomework');
    if (data.Homework === 1) {
        homeworkSite.style.display = "block";
        gotHomework.innerHTML = "Du har lektier for"
        return 1
    }
    else {
        homeworkSite.style.display = "none";
        gotHomework.innerHTML = "Du har ikke lektier for"
        return 0
    }
}

function getHomeworkRequest(homework){
    var req = new XMLHttpRequest();
    var url = 'homework';
    let state = "?state=2"
    let homeworkAss = "&hmwrkass="+homework

    req.open('get',url+state+homeworkAss,true); // set this to POST if you would like
    req.addEventListener('load',onLoad);
    req.addEventListener('error',onError);
    req.send();
    function onLoad() {
        var response = this.responseText;
        var parsedResponse = JSON.parse(response);
        assIndex = 0
        document.querySelector("#mathProblem").value = `${parsedResponse[assIndex].Assignment}`
        document.querySelector("#assId").value = `${parsedResponse[assIndex].AssignmentId}`
        document.querySelector("#nextBtt").addEventListener('click', function(){
            if(assIndex === parsedResponse.length-1){
                assIndex = 0
                document.querySelector("#mathProblem").value = `${parsedResponse[assIndex].Assignment}`
                document.querySelector("#assId").value = `${parsedResponse[assIndex].AssignmentId}`

            }
            else{
                assIndex++
                document.querySelector("#mathProblem").value = `${parsedResponse[assIndex].Assignment}`
                document.querySelector("#assId").value = `${parsedResponse[assIndex].AssignmentId}`

            }
        })
        document.querySelector("#prevBtt").addEventListener('click', function(){
            if(assIndex === 0){
                assIndex = parsedResponse.length-1
                document.querySelector("#mathProblem").value = `${parsedResponse[assIndex].Assignment}`
                document.querySelector("#assId").value = `${parsedResponse[assIndex].AssignmentId}`

            }
            else{
                assIndex--
                document.querySelector("#mathProblem").value = `${parsedResponse[assIndex].Assignment}`
                document.querySelector("#assId").value = `${parsedResponse[assIndex].AssignmentId}`

            }
        })
        document.querySelector("#answer").addEventListener('keydown', function(event){
            if (event.keyCode === 13){
                if(Number(document.querySelector("#answer").value) === parsedResponse[assIndex].Answer){
                    
                    document.querySelector("#answerForm").addEventListener('submit', function(event){
                        event.preventDefault()
                        postRequest()
                    })
                }
                else
                window.alert("Svaret var fokert")
            }
        })
    }

    function onError() {
        // handle error here, print message perhaps
        console.log('Error on GET, State=2');
    }
}

function postRequest(){
    let query = window.location.search
    var req = new XMLHttpRequest();
    var url = 'homework';

    req.open('post',url+query,true); // set this to POST if you would like
    req.addEventListener('load',onLoad);
    req.addEventListener('error',onError);
    req.send(new FormData(answerForm))

    function onLoad() {
        var response = this.responseText;
        var parsedResponse = JSON.parse(response);
        history.go(0)


    }
    function onError() {
        // handle error here, print message perhaps
        console.log('Error on POST');
    }
}