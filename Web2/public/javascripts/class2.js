document.addEventListener('DOMContentLoaded', function(){
    let queryString = window.location.search
    getRequest(queryString)
    loadNav(queryString)
})

function loadNav(queryString){
    document.querySelector("#teacher").innerHTML = `<button id="teacher" class="home"><a href="teacher.html${queryString}">Forside</a></button>`
    document.querySelector("#homeworkcreator").innerHTML = `<li><a id="homeworkcreator" href="homeworkcreator.html${queryString}">Opret opgave</a></li>`
    document.querySelector("#assignmentlibrary").innerHTML = `<li><a id="assignmentlibrary" href="assignmentlibrary.html${queryString}">Tildel Lektier</a></li>`

}

function getRequest(query){
    var req = new XMLHttpRequest();
    var url = '/class';
    let state = "&state=1"

    req.open('GET',url + query+state,true); // set this to POST if you would like
    req.addEventListener('load',onLoad);
    req.addEventListener('error',onError);
    req.send();

    function onLoad() {
        var response = this.responseText;
        var parsedResponse = JSON.parse(response);
        addClass(parsedResponse[0].UserClassroom)
    }

    function onError() {
        // handle error here, print message perhaps
        console.log('error receiving async AJAX call');
    }
}

function addClass(classroom) {
    let completeList = document.getElementById("classlist");
    completeList.innerHTML = `<li><a class="classroom" id="class${classroom}">${classroom}</a></li>`;
    document.querySelector(`.classroom`).addEventListener('click', function(event){
        let classroom = event.target.id.replace("class","")
        headerClass(classroom)
    })
}


function headerClass(classroom) {
    var req = new XMLHttpRequest();
    var url = '/class';
    let query = window.location.search

    req.open('GET',url + query ,true); // set this to POST if you would like
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
    for (let index = 0; index < parsedResponse.length; index++) {
        document.querySelector(`#student${index}`).addEventListener('click', function(event){
            let student = event.target.id.replace("student","")
            addStudentInfo(student)
        })
    }
}

function addStudentInfo(studentIndex){
    var req = new XMLHttpRequest();
    var url = '/class';
    let query = window.location.search

    req.open('GET',url + query,true); // set this to POST if you would like
    req.addEventListener('load',onLoad);
    req.addEventListener('error',onError);
    req.send();

    function onLoad() {
        idArray = ["PersonId","UserName", "UserClassroom", "Level", "CurrentXp", "RequiredXp", "Lektier", "Opgaver", "Addition", "Subtraktion", "Multiplikation", "Division", "Rødder", "Potens", "Blandet"]
        var response = this.responseText;
        var parsedResponse = JSON.parse(response);
        parsedResponse = spliceTeacher(parsedResponse)
        document.querySelector("#studentinformation").innerHTML = `${parsedResponse[studentIndex].UserName}`
        document.querySelector("#putStudentInfo").innerHTML = ''
        let index = 0
            for (const key in parsedResponse[studentIndex]) {
                if (Object.hasOwnProperty.call(parsedResponse[studentIndex], key)) {
                    const element = parsedResponse[studentIndex][key];
                    if(index > 2 ){
                    document.querySelector("#putStudentInfo").innerHTML += `<p id=${idArray[index]}>${idArray[index]}: ${element}</p>`
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