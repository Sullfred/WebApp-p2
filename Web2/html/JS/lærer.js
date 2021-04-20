let klasseliste = ["1.A", "2.B", "3.C", "4.D", "5.E"];
let elevliste = ["Esben.N", "Rune.F", "Jimmi", "Brian", "Nathan.R"];

function klasse(a) {
    document.getElementById("klassevalg").innerHTML ="Klasse: " + a;
    document.getElementById("elevlist").innerHTML = '';
    elever();
}

function elevinfo(a) {
    document.getElementById("elevinformation").innerHTML = "Elev: " + a;
    document.getElementById("elevinformation").innerHTML = "Elev: " + a;
}

function tilfoj() {
    klasseliste.forEach(i => {    
        let completelist= document.getElementById("klasselist");        
        completelist.innerHTML += "<li><a onclick=klasse('" + i + "')>" + i + "</a></li>";
    });
}

function elever(){
    elevliste.forEach(i => {
        let completelist= document.getElementById("elevlist");        
        completelist.innerHTML += "<li><a onclick=elevinfo('" + i + "')>" + i + "</a></li>";
    });
}
