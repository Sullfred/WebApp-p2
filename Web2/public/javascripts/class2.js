var req = new XMLHttpRequest();
var url = '/class';

let param = window.location.search

req.open('GET',url + `${param}`,true); // set this to POST if you would like
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
    addClass(user.UserClassroom)
}

function onError() {
    // handle error here, print message perhaps
    console.log('error receiving async AJAX call');
}

function addClass(classroom) {
    let completeList = document.getElementById("classlist");
    completeList.innerHTML = `<li><a class="classroom" id="class${classroom}">${classroom}</a></li>`;
}

$('body').on('click', 'a.classroom', function(event) {
    let classroom = event.target.id.replace("class","")
    headerClass(classroom)
})

function headerClass(classroom) {
    var req = new XMLHttpRequest();
    var url = '/class';

    req.open('GET',url + `${param}`,true); // set this to POST if you would like
    req.addEventListener('load',onLoad);
    req.addEventListener('error',onError);
    req.send();

    function onLoad() {
        var response = this.responseText;
        var parsedResponse = JSON.parse(response);
        let teacherIndex = 0
        optionsArray = ["Nej", "Ja"]
        document.getElementById("classchoice").innerHTML ="Klasse: " + classroom;
        document.getElementById("studentlist").innerHTML = '';
        document.querySelector("#gotHomework").innerHTML = `<p>Igangværende lektier: ${optionsArray[parsedResponse[teacherIndex].Homework]} </p>`
        if(parsedResponse[teacherIndex].Homework === 1){
        document.querySelector("#ongoingHomework").innerHTML = `<p>Resterende opgaver: ${parsedResponse[teacherIndex].AssignedHomework}</p>`
        }

        parsedResponse = spliceTeacher(parsedResponse)

        addStudents(parsedResponse)
    }

    function onError() {
        // handle error here, print message perhaps
        console.log('error receiving async AJAX call');
    }
}

function spliceTeacher(parsedResponse) {
    let qString = window.location.search
    let location1 = qString.search("un=")
    let location2 = qString.search("&uc=")
    let name = qString.substring(location1, location2)
    name = name.replace("un=","")
    name = name.replace("%20", " ")
    for (let index = 0; index < parsedResponse.length; index++) {
        if(parsedResponse[index].UserName === name){
            parsedResponse.splice(index,1)
            teacherIndex = index
        }
    }
    return parsedResponse
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

function addStudentInfo(studentIndex){
    var req = new XMLHttpRequest();
    var url = '/class';
    req.open('GET',url + `${param}`,true); // set this to POST if you would like
    req.addEventListener('load',onLoad);
    req.addEventListener('error',onError);
    req.send();

    function onLoad() {
        idArray = ["PersonId","UserName", "UserClassroom", "Level", "CurrentXp", "RequiredXp", "Homework", "AssignedHomework", "Addition", "Subtraction", "Multiplication", "Division", "Root", "Potens", "Mixed"]
        var response = this.responseText;
        var parsedResponse = JSON.parse(response);
        parsedResponse = spliceTeacher(parsedResponse)
        document.querySelector("#studentinformation").innerHTML = 'Elev: ' + `${parsedResponse[studentIndex].UserName}`
        //for (let index = 1; index < parsedResponse.length; index++) {
            let index = 0
            for (const key in parsedResponse[studentIndex]) {
                if (Object.hasOwnProperty.call(parsedResponse[studentIndex], key)) {
                    const element = parsedResponse[studentIndex][key];
                    if(index > 2 ){
                    console.log(element)
                    document.querySelector("#studentinformation").innerHTML += `<p id=${idArray[index]}>${idArray[index]}: ${element}</p>`
                    }
                }
                index++
            }
        //}
    }

    function onError() {
        // handle error here, print message perhaps
        console.log('error receiving async AJAX call');
    }
}