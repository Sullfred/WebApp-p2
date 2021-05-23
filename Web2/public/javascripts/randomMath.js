function postRequest(){
    let query = window.location.search
    var req = new XMLHttpRequest();
    var url = '/exercises';

    req.open('post',url+query,true); // set this to POST if you would like
    req.addEventListener('load',onLoad);
    req.addEventListener('error',onError);
    req.send(new FormData(answerForm))

    function onLoad() {
        var response = this.responseText;
        var parsedResponse = JSON.parse(response);


    }
    function onError() {
        // handle error here, print message perhaps
        console.log('error receiving async AJAX call');
    }
}

/* Math problem creator */
function randomDifficulty () {
    let amountdifficulty = Math.floor(Math.random()*3+1);
    return amountdifficulty;
}

function numberDifficulty () {
    let numberDifficulty = Math.floor(Math.random()+10)+Math.floor(Math.random()*90);
    return numberDifficulty;
}

function CalculateXp (amountDifficulty, answerDifficulty) {
    let difficultyLevel = amountDifficulty*answerDifficulty/5;
    let earnableXp = 5;

    switch(true){
        case (difficultyLevel < 30):
            //console.log("difficultyLevel = low");
            return earnableXp;
        case (difficultyLevel >= 30 && difficultyLevel < 50):
            //console.log("difficultyLevel = medium");
            return earnableXp+3;
        case (difficultyLevel >= 50):
            //console.log("difficultyLevel = high");
            return earnableXp+6;
        default:
            return earnableXp;
    }
}

function randomAdditionProblem () {
    let type = 1;
    let amountDifficulty = randomDifficulty();
    let numbers = [];

    for (i=0; i <= amountDifficulty; i++){
        numbers[i] = Math.round(Math.random()*numberDifficulty());
    }

    let answer = numbers.reduce(function(num1,num2){
        return num1+num2;
    }, 0);

    for(let i=0; i <= amountDifficulty-1; i++){
        numbers[i] = numbers[i]+"+";
    }

    let problem = numbers.join('');
    let earnableXp = CalculateXp(amountDifficulty, answer);

    return [problem, answer, earnableXp, type]

}

function randomSubtractionProblem () {
    let type = 2;
    let amountDifficulty = randomDifficulty();
    let numbers = [];

    for (i=0; i <= amountDifficulty; i++){
        numbers[i] = Math.round(Math.random()*numberDifficulty());
    }

    numbers.sort((a, b) => {
        if (a > b)
            return -1;
        if (a < b)
            return 1;
        return 0;
    });

    let answer = numbers[0];
    for(i=1; i < numbers.length; i++){
        answer = answer - numbers[i]
    }

    let difference = numbers[0] - Math.abs(answer);

    for(let i=0; i <= amountDifficulty-1; i++){
        numbers[i] = numbers[i]+"-";
    }

    let problem = numbers.join('');

    let earnableXp = CalculateXp(amountDifficulty*3, difference*2)

    return [problem, answer, earnableXp, type]
}


function randomMultiplicationProblem () {
    let type = 3;
    let amountDifficulty = 2;
    let numbers = [];

    for (i=0; i < amountDifficulty; i++){
        numbers[i] = Math.ceil(Math.random()*10);
    }

    let answer = numbers[0];
    for(i=1; i < numbers.length; i++){
        answer = answer * numbers[i]
    }

    for(let i=0; i < amountDifficulty-1; i++){
        numbers[i] = numbers[i]+"*";
    }

    let problem = numbers.join('');

    let earnableXp = CalculateXp(amountDifficulty*2, answer);

    return [problem, answer, earnableXp, type]

}

function randomDivisionProblem () {
    let type = 4;
    let amountDifficulty = 2;
    let numbers = [];
    n = 10

    for (i=0; i < amountDifficulty; i++){
        numbers[i] = Math.ceil(Math.random()*n*10);
        n = 1
    }

    numbers.sort((a, b) => {
        if (a > b)
            return -1;
        if (a < b)
            return 1;
        return 0;
    });

    if (numbers[0]%numbers[1]){
        randomDivisionProblem();
    }
    else {
        let answer = numbers[0] / numbers[1];

        let difference = numbers[0] - numbers[1];

        for(let i=0; i < amountDifficulty-1; i++){
            numbers[i] = numbers[i]+"/";
        }

        let problem = numbers.join('');

        let earnableXp = CalculateXp(amountDifficulty*2, difference*2);

        return [problem, answer, earnableXp, type]
    }

}


function createExercise(n){

    let problem, answer, earnableXp, type;

    switch(n){
        case 1:
            [problem, answer, earnableXp, type] = randomAdditionProblem();
            break;
        case 2:
            [problem, answer, earnableXp, type] = randomSubtractionProblem();
            break;
        case 3:
            [problem, answer, earnableXp, type] = randomMultiplicationProblem();
            break;
        case 4:
            [problem, answer, earnableXp, type] = randomDivisionProblem();
            break;
        default:
            console.log("Der skete en fejl")
    }
    //console.log(problem+"="+answer);
    //console.log(`Earnable xp = ${earnableXp}`);

    insertText(problem, earnableXp, type);
    console.log(answer)
    return [answer, earnableXp, type]
}

function insertText(text, earnableXp, type) {
    document.querySelector("#mathProblem").value = text;
    document.querySelector("#earnedXp").value = earnableXp;
    document.querySelector("#assType").value = type;
}

function listen () {
    let answer, earnableXp;
    let type = 0;
    let tries = 0;

    document.querySelector("#plus").addEventListener('click', (event) => {
        [answer, earnableXp, type] = createExercise(1);
    });

    document.querySelector("#minus").addEventListener('click', (event) => {
        [answer, earnableXp, type] = createExercise(2);
    });

    document.querySelector("#gange").addEventListener('click', (event) => {
        [answer, earnableXp, type] = createExercise(3);
    });

    document.querySelector("#dividere").addEventListener('click', (event) => {
        [answer, earnableXp, type] = createExercise(4);
    });

    document.querySelector("#answer").addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            let userAnswer = document.querySelector("#answer").value;
            if(userAnswer == answer) {
                //console.log(userAnswer + " " + answer)
                console.log("correct");
                document.querySelector(".notCorrect").innerHTML = "";
                postRequest()
                /*switch(type){
                    case 1:
                        document.querySelector("#solvedPlus").innerHTML++;
                        break;
                    case 2:
                        document.querySelector("#solvedMinus").innerHTML++;
                        break;
                    case 3:
                        document.querySelector("#solvedGange").innerHTML++;
                        break;
                    case 4:
                        document.querySelector("#solvedDividere").innerHTML++;
                        break;
                    default:
                        console.log("SHALOM SHALOM. Something went wrong");
                        break;
                }*/
                [answer, earnableXp, type] = createExercise(Math.ceil(Math.random()*3));
                console.log(answer)


                document.querySelector("#answer").value = "";
            }
            else{
                document.querySelector(".notCorrect").innerHTML = "Desværre ikke korrekt";
                tries++;
                console.log("forsøg: "+tries);
                console.log(userAnswer + " " + answer);
                document.querySelector("#answer").value = "";
            }
            if (tries > 2){
                document.querySelector(".notCorrect").innerHTML = "Du har desværre brugt alle dine forsøg. Prøv igen";
                tries = 0;
                [answer, earnableXp, type] = createExercise(type);
                document.querySelector("#answer").value = "";
            }
        }
    });
}

listen();