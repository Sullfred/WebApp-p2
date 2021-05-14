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

let classes = ["1.A", "2.B", "3.C", "4.D", "5.E"];
let students = ["Esben.N", "Rune.F", "Jimmi", "Brian", "Nathan.R"];

function headerclass(a) {
    document.getElementById("classchoice").innerHTML ="Klasse: " + a;
    document.getElementById("studentlist").innerHTML = '';
    document.forms['class'].submit()

    elever();
}

function studentinfo(a) {
    document.getElementById("studentinformation").innerHTML = "Elev: " + a;
}

/*function addclass() {
    classes.forEach(i => {
        let completelist= document.getElementById("classlist");
        completelist.innerHTML += "<li><a onclick=headerclass('" + i + "')>" + i + "</a></li>";
    });
}*/

function addclass(classroom) {
    console.log(classroom)
    let completelist= document.getElementById("classlist");
    completelist.innerHTML = "<li><a onclick=headerclass('" + `${classroom}` + "')>" + classroom + "</a></li>";

}

function elever(){
    students.forEach(i => {
        let completelist= document.getElementById("studentlist");
        completelist.innerHTML += "<li><a onclick=studentinfo('" + i + "')>" + i + "</a></li>";
    });
}
