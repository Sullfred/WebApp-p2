document.addEventListener('DOMContentLoaded', function(){
    console.log("test")
    let queryString = window.location.search
    let navButtonsIds = ["teacher", "homeworkcreator"]
    for (let index = 0; index < navButtonsIds.length; index++) {
        document.querySelector(`#${navButtonsIds[index]}`).href += `${queryString}`
    }
})

let buttons = document.querySelectorAll('.assTypeBtt')
for (let index = 0; index < buttons.length; index++) {
    buttons[index].addEventListener('click',function(event){
        getRequest(event.target.name)
    })
}

function getRequest(assType){
    var req = new XMLHttpRequest();
    var url = '/assignmentlibrary';
    let query = window.location.search
    let assTypeQueryfi = "&asstyp="+assType
    req.open('GET',url+query+assTypeQueryfi,true); // set this to POST if you would like
    req.addEventListener('load',onLoad);
    req.addEventListener('error',onError);
    req.send();
    function onLoad() {
        var response = this.responseText;
        var parsedResponse = JSON.parse(response);
        let assList = document.querySelector("#opgaveliste")
        let classList = document.querySelector("#klassebeholder")
        let userClasses = query.substring(query.search("uc=")+3,query.search("&ul="))
        let visibleClasses = userClasses
        userClasses = userClasses.replace(".","")
        classList.innerHTML = ""
        classList.innerHTML += `<li><input name="klasse_${userClasses}" type="checkbox">${visibleClasses}</li>`
        classList.innerHTML += `<input type="text" name="controlbox" style="display: none"/>`
        assList.innerHTML = ""
        for (let index = 0; index < parsedResponse.length; index++) {
            assList.innerHTML += `<li><input name="assignment_${index}" type="checkbox" value="${parsedResponse[index].AssignmentId}">${parsedResponse[index].Assignment}=${parsedResponse[index].Answer}</li>`
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
    req.send(new FormData(form));
    req.addEventListener('load',onLoad);
    req.addEventListener('error',onError);

    function onLoad() {
        var response = this.responseText;
        console.log(response)
        var parsedResponse = JSON.parse(response);
        window.alert(`${parsedResponse}`);
        console.log(parsedResponse)
        //går tilbage til forrige side
        history.go(0)
    }

    function onError() {
        // handle error here, print message perhaps
        console.log('error receiving async AJAX call');
    }
}