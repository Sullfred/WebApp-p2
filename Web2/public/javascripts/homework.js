let assArr = []

document.addEventListener('DOMContentLoaded', function(){
    let queryString = window.location.search
    /*let navButtonsIds = ["teacher", "homeworkcreator", "classes"]
    for (let index = 0; index < navButtonsIds.length; index++) {
        document.querySelector(`#${navButtonsIds[index]}`).href += `${queryString}`
    }*/

    getRequest(queryString)
})

function getRequest(query){
    var req = new XMLHttpRequest();
    var url = '/homework';
    state = "&state=1"

    req.open('GET',url+query+state,true); // set this to POST if you would like
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
    check = homeWorkBox(data)
    if(check === 1){
        getHomeworkRequest(data.AssignedHomework)
    }
}

function homeWorkBox(data){
    const homeworkSite = document.querySelector('#gotHomework')
    if (data.Homework === 1){
        homeworkSite.style.display = "block";
        return 1
    }
    else{
        homeworkSite.style.display = "none";
        return 0
    }
}

function getHomeworkRequest(homework){
    let query = window.location.search
    var req = new XMLHttpRequest();
    var url = '/homework';
    let state = "&state=2"
    let homeworkAss = "&hmwrkass="+homework

    req.open('get',url+query+state+homeworkAss,true); // set this to POST if you would like
    req.addEventListener('load',onLoad);
    req.addEventListener('error',onError);
    req.send();
    function onLoad() {
        var response = this.responseText;
        var parsedResponse = JSON.parse(response);
        parsedResponse.forEach(element => {
            assArr.push(element)
        });
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
        console.log('error receiving async AJAX call');
    }
}

function postRequest(){
    query = window.location.search
    var req = new XMLHttpRequest();
    var url = '/homework';

    req.open('post',url+query,true); // set this to POST if you would like
    req.addEventListener('load',onLoad);
    req.addEventListener('error',onError);
    req.send(new FormData(answerForm))

    function onLoad() {
        var response = this.responseText;
        var parsedResponse = JSON.parse(response);
        console.log(parsedResponse)
        
        history.go(0)
        history.go(1)


    }
    function onError() {
        // handle error here, print message perhaps
        console.log('error receiving async AJAX call');
    }
}