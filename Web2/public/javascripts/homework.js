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
    req.send(state);
    function onLoad() {
        var response = this.responseText;
        var parsedResponse = JSON.parse(response);
        console.log(parsedResponse)
        homeWorkBox(parsedResponse[0])

    }
    function onError() {
        // handle error here, print message perhaps
        console.log('error receiving async AJAX call');
    }
}

function loadData(data){
    homeWorkBox(data)
}

function homeWorkBox(data){
    const homeworkSite = document.querySelector('#gotHomework')
    if (data.Homework === 1){
        homeworkSite.style.display = "block";
        getHomeworkRequest(data.AssignedHomework)
    }
    else
        homeworkSite.style.display = "none";
}

function getHomeworkRequest(homework){
    console.log(typeof homework)
    console.log(homework)
    let query = window.location.search
    var req = new XMLHttpRequest();
    var url = '/homework';
    state = "&state=2"

    req.open('get',url+query+state,true); // set this to POST if you would like
    req.addEventListener('load',onLoad);
    req.addEventListener('error',onError);
    req.send(homework);
    function onLoad() {
        var response = this.responseText;
        var parsedResponse = JSON.parse(response);
        console.log(parsedResponse)

    }
    function onError() {
        // handle error here, print message perhaps
        console.log('error receiving async AJAX call');
    }
}
