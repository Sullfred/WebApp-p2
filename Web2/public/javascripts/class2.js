document.addEventListener('DOMContentLoaded', function(){
    getRequest()
})

function getRequest(query){
    var req = new XMLHttpRequest();
    var url = 'class';
    let state = "?state=1"

    req.open('GET',url + state,true); // set this to POST if you would like
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
    var url = 'class';
    let state = '?state=2'

    req.open('GET',url + state ,true); // set this to POST if you would like
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
        //document.querySelector("#ongoingHomework").innerHTML = `<p>Resterende opgaver: ${parsedResponse[teacherIndex].AssignedHomework}</p>`
        }

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
    for (let index = 0; index < parsedResponse.length; index++) {
        document.querySelector(`#student${index}`).addEventListener('click', function(event){
            let student = event.target.id.replace("student","")
            addStudentInfo(student)
        })
    }
}

function addStudentInfo(studentIndex){
    var req = new XMLHttpRequest();
    var url = 'class';
    let state = '?state=2'

    req.open('GET',url + state,true); // set this to POST if you would like
    req.addEventListener('load',onLoad);
    req.addEventListener('error',onError);
    req.send();

    function onLoad() {
        idArray = ["PersonId","UserName", "UserClassroom", "Level", "CurrentXp", "RequiredXp", "Lektier", "Opgaver", "Addition", "Subtraktion", "Multiplikation", "Division", "Rødder", "Potens", "Blandet"]
        var response = this.responseText;
        var parsedResponse = JSON.parse(response);
        parsedResponse[studentIndex].AssignedHomework = Math.floor((parsedResponse[studentIndex].AssignedHomework.length/2)-2)
        document.querySelector("#studentinformation").innerHTML = `${parsedResponse[studentIndex].UserName}`
        document.querySelector("#putStudentInfo").innerHTML = ''
        let index = 0
            for (const key in parsedResponse[studentIndex]) {
                if (Object.hasOwnProperty.call(parsedResponse[studentIndex], key)) {
                    let element = parsedResponse[studentIndex][key];
                    if(index > 2){
                    document.querySelector("#putStudentInfo").innerHTML += `<p id=${idArray[index]}>${idArray[index]}: ${element}</p>`
                        if(index === 5){
                            document.querySelector("#CurrentXp").style.display = "none"
                        }
                        else if(index === 6){
                            document.querySelector("#RequiredXp").style.display = "none"
                        }
                        else if(index === 7){
                            document.querySelector("#Lektier").style.display = "none"
                        }
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

//current, required, opgaver, lektier        parsedResponse[8].AssignedHomework = Math.floor((parsedResponse[8].AssignedHomework.length/2)-2)
