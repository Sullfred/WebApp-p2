var req = new XMLHttpRequest();
var url = '/class';

req.open('GET',url,true); // set this to POST if you would like
req.addEventListener('load',onLoad);
req.addEventListener('error',onError);
req.send();

function onLoad() {
    var response = this.responseText;
    var parsedResponse = JSON.parse(response);

    const userDataQueryString = window.location.search
    let firstCleanUDQS = userDataQueryString.split("&")

    let secondCleanUDQS=[]

    for (let index = 0; index < firstCleanUDQS.length; index++) {
        secondCleanUDQS[index] = firstCleanUDQS[index].split("=")
    }

    let finalCleanUDQS=[]
    let innerIndex = 1
    for (let index = 0; index < secondCleanUDQS.length; index++) {
        if (index === 2){
            secondCleanUDQS[index][innerIndex] = secondCleanUDQS[index][innerIndex].replace("%20", " ")
        }
        finalCleanUDQS[index] = secondCleanUDQS[index][innerIndex]
    }

    let user = {
        UserLoaded: finalCleanUDQS[0],
        PersionId: finalCleanUDQS[1],
        UserName: finalCleanUDQS[2],
        UserClassroom: finalCleanUDQS[3],
        Level: finalCleanUDQS[4],
        CurrentXp: finalCleanUDQS[5],
        RequiredXp: finalCleanUDQS[6],
        Homework: finalCleanUDQS[7],
        Addition: finalCleanUDQS[8],
        Subtraction: finalCleanUDQS[9],
        Multiplication: finalCleanUDQS[10],
        Division: finalCleanUDQS[11],
        Mixed: finalCleanUDQS[12]
    }
    addClass(user.UserClassroom, parsedResponse)
}

function onError() {
    // handle error here, print message perhaps
    console.log('error receiving async AJAX call');
}

function addClass(classroom) {
    let completeList = document.getElementById("classlist");
    completeList.innerHTML = `<li><a onclick=headerClass("${classroom}")>${classroom}</a></li>`;
}

$('body').on('click', 'a.classroom', function(event) {
    let classroom = event.target.id.replace("class","")
    headerClass(classroom)
})

function headerClass(classroom) {
    var req = new XMLHttpRequest();
    var url = '/class';

    req.open('GET',url,true); // set this to POST if you would like
    req.addEventListener('load',onLoad);
    req.addEventListener('error',onError);
    req.send();

    function onLoad() {
        var response = this.responseText;
        var parsedResponse = JSON.parse(response);
        document.getElementById("classchoice").innerHTML ="Klasse: " + classroom;
        document.getElementById("studentlist").innerHTML = '';
        addStudents(parsedResponse)
    }

    function onError() {
        // handle error here, print message perhaps
        console.log('error receiving async AJAX call');
    }


}

function addStudents(parsedResponse){
    for (let index = 0; index < parsedResponse.length; index++) {
        let name = parsedResponse[index].UserName
        completeList = document.querySelector("#studentlist")
        completeList.innerHTML += `<li><a id="student${index}" class="student" >${name}</a></li>`
    }
}


//der benyttes jquery
$('body').on('click', 'a.student', function(event) {
    student = event.target.id.replace("student","")
    addStudentInfo(student)
})

function addStudentInfo(index){
    var req = new XMLHttpRequest();
    var url = '/class';
    req.open('GET',url,true); // set this to POST if you would like
    req.addEventListener('load',onLoad);
    req.addEventListener('error',onError);
    req.send();

    function onLoad() {
        var response = this.responseText;
        var parsedResponse = JSON.parse(response);
        document.querySelector("#studentinformation").innerHTML = 'Elev ' + `${parsedResponse[index].UserName}`
    }

    function onError() {
        // handle error here, print message perhaps
        console.log('error receiving async AJAX call');
    }
}