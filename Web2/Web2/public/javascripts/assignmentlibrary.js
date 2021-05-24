

let buttons = document.querySelectorAll('.assTypeBtt')
for (let index = 0; index < buttons.length; index++) {
    buttons[index].addEventListener('click',function(event){
        classRequest(event.target.name)
        assRequest(event.target.name)
    })
}

function classRequest(assType){
    var req = new XMLHttpRequest();
    var url = '/assignmentlibrary';
    let state = "?state=1"

    req.open('GET',url+state,true); // set this to POST if you would like
    req.addEventListener('load',onLoad);
    req.addEventListener('error',onError);
    req.send();
    function onLoad() {
        var response = this.responseText;
        var parsedResponse = JSON.parse(response);

        let userClasses = parsedResponse
        let classList = document.querySelector("#klassebeholder")
        let visibleClasses = userClasses
        userClasses = userClasses.replace(".","")
        classList.innerHTML = ""
        classList.innerHTML += `<li><input name="klasse_${userClasses}" type="checkbox">${visibleClasses}</li>`
        classList.innerHTML += `<input type="text" name="controlbox" style="display: none"/>`
    }

    function onError() {
        // handle error here, print message perhaps
        console.log('error receiving async AJAX call');
    }
}

function assRequest(assType){
    var req = new XMLHttpRequest();
    var url = '/assignmentlibrary';
    let assTypeQueryfi = "?asstyp="+assType
    let state = "&state=2"


    req.open('GET',url+assTypeQueryfi+state,true); // set this to POST if you would like
    req.addEventListener('load',onLoad);
    req.addEventListener('error',onError);
    req.send();
    function onLoad() {
        var response = this.responseText;
        var parsedResponse = JSON.parse(response);

        let assList = document.querySelector("#opgaveliste")
        assList.innerHTML = ""
        for (let index = 0; index < parsedResponse.length; index++) {
            assList.innerHTML += `<li><input name="assignment_${parsedResponse[index].AssignmentId}" type="checkbox" value="${parsedResponse[index].AssignmentId}">${parsedResponse[index].Assignment}=${parsedResponse[index].Answer}</li>`
        }
    }

    function onError() {
        // handle error here, print message perhaps
        console.log('error receiving async AJAX call');
    }
}

//let formElement = document.querySelector("#form")
document.querySelector("#form").addEventListener('submit', function(event){
    event.preventDefault()
    postRequest()
})

function postRequest(){
    var req = new XMLHttpRequest();
    var url = '/assignmentlibrary';
    let query = window.location.search
    let form = document.querySelector("#form")

    req.open('POST',url+query,true); // set this to POST if you would like
    req.addEventListener('load',onLoad);
    req.addEventListener('error',onError);
    req.send(new FormData(form));

    function onLoad() {
        var response = this.responseText;
        console.log(response)
        var parsedResponse = JSON.parse(response);
        window.alert(`${parsedResponse}`);
        console.log(parsedResponse)
        //går tilbage til n forrige side
        history.go(0)
    }

    function onError() {
        // handle error here, print message perhaps
        console.log('error receiving async AJAX call');
    }
}