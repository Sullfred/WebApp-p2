
function randomDifficulty () {
    let amountdifficulty = Math.floor(Math.random()*3+1);
    return amountdifficulty;
}

function numberDifficulty () {
    let numberDifficulty = Math.floor(Math.random()+10)+Math.floor(Math.random()*90);
    return numberDifficulty;
}

function CalculateXpAddMult (amountDifficulty, answerDifficulty) {
    let difficultyLevel = amountDifficulty*answerDifficulty/5;
    let earnableXp = 5;

    switch(true){
        case (difficultyLevel < 30):
            console.log("difficultyLevel = low");
            return earnableXp;
        case (difficultyLevel >= 30 && difficultyLevel < 50):
            console.log("difficultyLevel = medium");
            return earnableXp+3;
        case (difficultyLevel >= 50):
            console.log("difficultyLevel = high");
            return earnableXp+6;
    }
}

function randomAdditionProblem () {
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

    console.log(problem+"="+answer);
    let earnableXp = CalculateXpAddMult(amountDifficulty, answer);
    console.log(`Earnable xp = ${earnableXp}`);

}

function randomSubtractionProblem () {
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

    for(let i=0; i <= amountDifficulty-1; i++){
        numbers[i] = numbers[i]+"-";
    }

    let problem = numbers.join('');

    console.log(problem+"="+answer);
    let earnableXp = "boop"
    console.log(`Earnable xp = ${earnableXp}`);
}


function randomMultiplicationProblem () {
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

    console.log(problem+"="+answer);
    
}

randomAdditionProblem();
randomSubtractionProblem();
randomMultiplicationProblem();
