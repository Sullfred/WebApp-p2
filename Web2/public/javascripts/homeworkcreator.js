
function reset() {
  document.getElementById("task").reset();
}

function saveopg() {
    const opgave=document.getElementById("task");
    alert(opgave.value);
}

function addop(a) {
    document.getElementById("task").value += a;
}