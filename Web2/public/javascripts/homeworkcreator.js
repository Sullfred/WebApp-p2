document.addEventListener('DOMContentLoaded', function(){
  queryString = window.location.search
  let navsites = [["teacher","Forside"],["class", "Klasser"],["homeworkcreator", "opgaver"]]
  for (let index = 0; index < navsites.length; index++) {
      document.querySelector(`#${navsites[index][0]}`).innerHTML = `<li><a href='${navsites[index][0]}.html${queryString}'>${navsites[index][1]}</a></li>`
  }
  document.querySelector("#homeworkcreate").addEventListener('submit', function(event){
    event.preventDefault()
    postRequest(queryString)
  })
})

function postRequest(query){
  var req = new XMLHttpRequest();
  var url = '/homeworkcreator';
  let form = document.querySelector("#homeworkcreate")

  req.open('POST',url+query,true); // set this to POST if you would like
  req.addEventListener('load',onLoad);
  req.addEventListener('error',onError);
  req.send(new FormData(form));

  function onLoad() {
      var response = this.responseText;
      var parsedResponse = JSON.parse(response);
      window.alert(parsedResponse)
      //går tilbage til n forrige side
      history.go(0)
  }

  function onError() {
      // handle error here, print message perhaps
      console.log('error receiving async AJAX call');
  }
}

function reset() {
  document.getElementById("homeworkcreate").reset();
}

function addop(a) {
    document.getElementById("task").value += a;
}