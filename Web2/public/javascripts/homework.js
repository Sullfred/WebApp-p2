

const gotHomework = document.querySelector(".homeworkQuestionmark");
const lektier = document.querySelector("#lektier")
const homeworkSite = document.querySelector('#gotHomework');

if (lektier) {
    homeworkSite.style.display = "block";
    gotHomework.innerHTML = "Du har lektier for"
}
else {
    homeworkSite.style.display = "none";
    gotHomework.innerHTML = "Du har ikke lektier for"
}
