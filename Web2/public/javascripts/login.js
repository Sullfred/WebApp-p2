
document.querySelector("#loginform").addEventListener('submit', function(event){
    event.preventDefault()
    postLogin()
})


function postLogin(){
    var req = new XMLHttpRequest();
    var url = 'login';
    let form = document.querySelector("#loginform")

    req.open('POST',url,true); // set this to POST if you would like
    req.addEventListener('load',onLoad);
    req.addEventListener('error',onError);
    req.send(new FormData(form));

    function onLoad() {
        var response = this.responseText;
        var parsedResponse = JSON.parse(response);
        if(parsedResponse[0] === "Elev")
            window.location.replace(window.location.href.replace("login", "student"))
        else if(parsedResponse[0] === "Lærer")
            window.location.replace(window.location.href.replace("login", "teacher"))
        else if(parsedResponse[0] === "Error on login")
            document.querySelector("#wrongPass").style.display = "inline"
    }

    function onError() {
        // handle error here, print message perhaps
        console.log('error receiving async AJAX call');
    }
}