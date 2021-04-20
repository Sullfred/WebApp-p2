let klasseliste = ["1.A", "2.B", "3.C", "4.D", "5.E"];
let elevliste = ["DJonny", "Jimmi", "Brian", "Din.mor", "Mikkel", "Nathan.Kiks"];

function klasse(a) {
    document.getElementById("klassevalg").innerHTML ="Klasse: " + a;
    document.getElementById("elevlist").innerHTML = '';
    elever();
}

function elevinfo(a) {
    let string = a;
    document.getElementById("elevinformation").innerHTML = "Elev: " + a;
    console.log(string);
    string.replace(/\./g, "-");
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
