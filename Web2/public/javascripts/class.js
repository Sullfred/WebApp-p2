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

//
var req = new XMLHttpRequest();
var url = '/class';

req.open('GET',url,true); // set this to POST if you would like
req.addEventListener('load',onLoad);
req.addEventListener('error',onError);
req.send();

function onLoad() {
    var response = this.responseText;
    var parsedResponse = JSON.parse(response);
    console.log(parsedResponse)
    // access your data newly received data here and update your DOM with appendChild(), findElementById(), etc...

    // append child (with text value of messageToDisplay for instance) here or do some more stuff
}

function onError() {
    // handle error here, print message perhaps
    console.log('error receiving async AJAX call');
}
//

let classes = ["1.A", "2.B", "3.C", "4.D", "5.E"];
let students = ["Esben.N", "Rune.F", "Jimmi", "Brian", "Nathan.R"];

addClass(user.userClassroom, parsedResponse)


function addClass(classroom, parsedResponse) {
    console.log(classroom)
    let completelist= document.getElementById("classlist");
    completelist.innerHTML = "<li><a onclick=headerClass('" + `${classroom, parsedResponse}` + "')>" + classroom + "</a></li>";
}

function headerClass(classroom, parsedResponse) {
    document.getElementById("classchoice").innerHTML ="Klasse: " + classroom;
    document.getElementById("studentlist").innerHTML = '';
//    document.querySelector("#classid").value = a
//    document.forms['class'].submit()
    addStudents(parsedResponse);
}

function addStudents(parsedResponse){
    students.forEach(i => {
        let completelist= document.getElementById("studentlist");
        completelist.innerHTML += "<li><a onclick=studentinfo('" + i + "')>" + i + "</a></li>";
    });
    for (let index = 0; index < parsedResponse.length; index++) {
        let completelist= document.getElementById("studentlist");
        let name = parsedResponse[index].UserName
        completelist.innerHTML += "<li><a onclick=studentinfo('" + name + "')>" + name + "</a></li>";
    }
}


function addStudentInfo(a) {
    document.getElementById("studentinformation").innerHTML = "Elev: " + a;
}

/*function addclass() {
    classes.forEach(i => {
        let completelist= document.getElementById("classlist");
        completelist.innerHTML += "<li><a onclick=headerclass('" + i + "')>" + i + "</a></li>";
    });
}*/




