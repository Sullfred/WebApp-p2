document.querySelector("#submitbutton").addEventListener('click',function(event){
    event.preventDefault
    postLogin()
})

function postLogin(){
    let req = XMLHttpRequest
    let url = "/login"

    req.open('GET', url, true)
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