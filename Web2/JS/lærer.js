function klasse(a) {
    document.getElementById("klassevalg").innerHTML = "Klasse: " + a;
    document.getElementById("elevlist").innerHTML = '';
    elever();
}

let klasseliste = ["1.A", "2.B", "3.C", "4.D", "5.E"];
let elevliste = ["DJonny", "Jimmi", "Brian", "Din mor", "Mikkel"];

function tilfoj() {
    klasseliste.forEach(i => {    
        let completelist= document.getElementById("klasselist");        
        completelist.innerHTML += "<li><a onclick=klasse('" + i + "')>" + i + "</a></li>";
    });
}

function elever(){
    elevliste.forEach(i => {
    let completelist= document.getElementById("elevlist");        
    completelist.innerHTML += "<li><a href=" + "https://www.youtube.com/watch?v=dQw4w9WgXcQ>" + i + "</a></li>";
    });
}