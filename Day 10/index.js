var fs = require('fs');

function readFile() {
    var data = fs.readFileSync(__dirname+'/data.txt', 'utf8');
    parseData(data);
}

function parseData(data) {

    var cycles = data.split('\n')
        .map(cmd => {
            if (cmd === 'noop') return cmd;
            else {
                var split_cycle = cmd.split(' ');
                return [split_cycle[0], parseInt(split_cycle[1])];
            }
        })
        .flat();

    ChallengePart1(cycles);
    ChallengePart2(cycles);

}

function ChallengePart1(cycles) {

    var signalStrength = 1;

    var interestingCycles = [20, 60, 100, 140, 180, 220];

    var solutionCycles = [];

    for (let i=0; i<cycles.length; i++) {

        if (interestingCycles.indexOf(i+1) > -1) {
            solutionCycles.push(signalStrength * (i+1));
        }

        if (cycles[i] !== 'addx' && cycles[i] !== 'noop') {
            signalStrength += cycles[i];
        }

    }

    var solution = 0;

    solutionCycles.forEach(signal => solution += signal);

    console.log('Solution is :'+solution);

}

function ChallengePart2(cycles) {

    var spritepos = 1;

    var display = [[]];

    var screenwidth = 40;
    var cycleCount = 0;

    for (let i=0; i<cycles.length/screenwidth; i++) {

        for (let j=0; j<screenwidth; j++) {

            if (j === spritepos || j === (spritepos-1) || j===(spritepos+1)) display[i].push('#');
            else display[i].push('.')

            if (cycles[cycleCount] !== 'addx' && cycles[cycleCount] !== 'noop') {
                spritepos += cycles[cycleCount];
            }

            cycleCount++;

        }

        display.push([]);

    }

    for (let line of display) {
        console.log(line.join(''))
    }


}

readFile();