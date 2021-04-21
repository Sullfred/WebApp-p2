let classes = ["1.A", "2.B", "3.C", "4.D", "5.E"];
let students = ["Esben.N", "Rune.F", "Jimmi", "Brian", "Nathan.R"];

function headerclass(a) {
    document.getElementById("classchoice").innerHTML ="Klasse: " + a;
    document.getElementById("studentlist").innerHTML = '';
    elever();
}

function studentinfo(a) {
    document.getElementById("studentinformation").innerHTML = "Elev: " + a;
}

function addclass() {
    classes.forEach(i => {    
        let completelist= document.getElementById("classlist");        
        completelist.innerHTML += "<li><a onclick=headerclass('" + i + "')>" + i + "</a></li>";
    });
}

function elever(){
    students.forEach(i => {
        let completelist= document.getElementById("studentlist");        
        completelist.innerHTML += "<li><a onclick=studentinfo('" + i + "')>" + i + "</a></li>";
    });
}
