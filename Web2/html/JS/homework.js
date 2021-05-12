
let user = {
    Name: "Jens Jensen",
    currentLevel: 0,
    lektier: 1,
    currentXp: 0,
    requiredXp: 15,
};

const homeworkSite = document.querySelector('#gotHomework')

if (user.lektier)
    homeworkSite.style.display = "block";
else
    homeworkSite.style.display = "none";
