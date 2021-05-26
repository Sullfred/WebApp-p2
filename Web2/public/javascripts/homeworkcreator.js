document.addEventListener('DOMContentLoaded', function(){
  document.querySelector("#homeworkcreate").addEventListener('submit', function(event){
    event.preventDefault()
    postRequest()
  })
})

function postRequest(){
  var req = new XMLHttpRequest();
  var url = 'homeworkcreator';
  let form = document.querySelector("#homeworkcreate")

  req.open('POST',url,true); // set this to POST if you would like
  req.addEventListener('load',onLoad);
  req.addEventListener('error',onError);
  req.send(new FormData(form));

  function onLoad() {
      var response = this.responseText;
      var parsedResponse = JSON.parse(response);
      window.alert(parsedResponse)
      document.querySelector("#homeworkcreate").reset()
  }

  function onError() {
      // handle error here, print message perhaps
      console.log('Error on POST');
  }
}

function reset() {
  document.getElementById("homeworkcreate").reset();
}

function addop(a) {
    document.getElementById("task").value += a;
}