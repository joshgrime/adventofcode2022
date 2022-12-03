var fs = require('fs');

function readFile(){
    var data = fs.readFileSync(__dirname+'/data.txt', 'utf8');
    parseData(data);
}

function parseData(data) {

    var data = data.split('\n');
    data = data.map(x => {
        x = x.substring(0, 3);
        x = x.split(' ');
        return x ;
    });
        
    ChallengePart1(data);
}

function ChallengePart1(data){
    var totalScore = 0;

    for (let game of data) {
        
        var opponentMove = convertLetter(game[0]);
        var myMove = convertLetter(game[1]);
        var result = calculateWin(opponentMove, myMove);
        var score = calculateScore(result, myMove);
        totalScore += score;
    }

    console.log('Part 1: Final Score is '+totalScore);

    ChallengePart2(data);

}

function ChallengePart2(data){

    var totalScore = 0;

    for (let game of data) {


        var opponentMove = convertLetter(game[0]);
        var result = convertLetter2(game[1]);
        var myMove = calculateMyMove(opponentMove, result);
        var score = calculateScore(result, myMove)
        totalScore += score;

    }

    console.log('Part 2: Final Score is '+totalScore);

}

function convertLetter(a){
    if (a === 'A' || a === 'X') return 'rock';
    else if (a === 'B' || a === 'Y') return 'paper';
    return 'scissors';
}

function convertLetter2(a){
    if (a === 'X') return 'lose';
    else if (a === 'Y') return 'draw';
    return 'win';
}

function calculateWin(a, b){
    //a = oppenent, b = me
    if (a === b) return 'draw';
    else if (a === 'rock' && b === 'scissors') return 'lose';
    else if (a === 'scissors' && b === 'paper') return 'lose';
    else if (a === 'paper' && b === 'rock') return 'lose';
    else return 'win';
}

function calculateMyMove(opponentMove, desiredResult) {
    if (desiredResult === 'draw') return opponentMove;
    if (calculateWin(opponentMove, 'rock') === desiredResult) return 'rock';
    if (calculateWin(opponentMove, 'scissors') === desiredResult) return 'scissors';
    if (calculateWin(opponentMove, 'paper') === desiredResult) return 'paper';
    
}

function calculateScore(result, myMove) {
    var score = 0;
    if (result === 'draw') {
        score += 3;
    }
    else if (result === 'win') {
        score += 6;
    }
    //additional points for playing: 1 for rock, 2 for paper, 3 for scissors
    var ap = myMove === 'rock' ? 1 : myMove === 'paper' ? 2 : 3;
    score += ap;
    return score;
}

readFile();