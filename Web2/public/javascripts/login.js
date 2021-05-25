
    document.querySelector("#loginform").addEventListener('submit', function(event){
<<<<<<< Updated upstream
        event.preventDefault();
        console.log("login submitted");
=======
        event.preventDefault()
>>>>>>> Stashed changes
        postLogin()
    })


function postLogin(){
    var req = new XMLHttpRequest();
    var url = '/login';
    let form = document.querySelector("#loginform")
  
<<<<<<< Updated upstream
    console.log("test before requests")
=======
>>>>>>> Stashed changes
    req.open('POST',url,true); // set this to POST if you would like
    req.addEventListener('load',onLoad);
    req.addEventListener('error',onError);
    req.send(new FormData(form));
  
    function onLoad() {
        var response = this.responseText;
        var parsedResponse = JSON.parse(response);
        console.log(parsedResponse)
        console.log(window.location.href)
        if(parsedResponse[0] === "Lærer"){
            window.location.replace(window.location.href.replace("login", "teacher"))
        }
    }
  
    function onError() {
        // handle error here, print message perhaps
        console.log('error receiving async AJAX call');
    }
  }