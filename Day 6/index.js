var fs = require('fs');

function readFile() {
    var data = fs.readFileSync(__dirname+'/data.txt', 'utf8');
    parseData(data);
}

function parseData(data) {
    ChallengePart1(data);
}

function ChallengePart1(signal) {
    
    var solution;
    var buffer = [signal[2], signal[1], signal[0]];

    for (let i=3; i<signal.length; i++) {

        buffer.unshift(signal[i]);
        buffer.length = 4;

        var duplicate = checkBuffer(buffer);

        if (!duplicate) {
            solution = i + 1;
            break;
        }

    }

    console.log('Part 1: The index is: '+solution);
    console.log(buffer);

    ChallengePart2(signal);

}

function ChallengePart2(signal) {
    
    var solution;
    var buffer = [];

    for (let j=0; j<12; j++) {
        buffer.unshift(signal[j]);
    }

    for (let i=13; i<signal.length; i++) {

        buffer.unshift(signal[i]);
        buffer.length = 14;

        var duplicate = checkBuffer(buffer);

        if (!duplicate) {
            solution = i + 1;
            break;
        }

    }

    console.log('Part 2: The index is: '+solution);
    console.log(buffer);

}

function checkBuffer(buffer){

    var duplicate = false;

    buffer.forEach(char => {
        var check = buffer.filter(char2 => {
            return char === char2;
        });
        if (check.length > 1) {
            duplicate = true;
        }
    });

    return duplicate;

}

readFile();