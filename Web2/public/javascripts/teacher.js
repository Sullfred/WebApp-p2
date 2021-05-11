let user=["Egon Olsen"];
function navuser() {
    let list = document.getElementById("user");
    list.innerHTML += "<li><a class='username'>"+user[0]+"</li></a>";
}