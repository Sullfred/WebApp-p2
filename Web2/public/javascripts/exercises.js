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
    var url = '/exercises';
    //let query = window.location.search

    req.open('GET',url+query,true); // set this to POST if you would like
    req.addEventListener('load',onLoad);
    req.addEventListener('error',onError);
    req.send();
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