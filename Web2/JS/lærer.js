function klasse(a) {
    let h1 = document.createElement("H1");
    let tekst = document.createTextNode(a);
    h1.appendChild(tekst);
    document.getElementById("skovl").appendChild(h1);
}

let tester = ["A.1", "B.2", "C.3", "D.4"];

/*
function tilfoj() {
    let html =
        tester.map(function (tester) {
                return '<li>' +'<a onclick=\"klasse(tester)\">' + tester + '</a>' + '</li>';
            }).join('');
    document.getElementById('list').innerHTML = html;
}
*/

function tilfoj() {
    tester.forEach(i => {    
        let completelist= document.getElementById("list");        
        completelist.innerHTML += "<li><a >" + i + "</a></li>";
    });
}

// prov med id/navn masske bitch;