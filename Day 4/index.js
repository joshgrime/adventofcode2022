var fs = require('fs');

function readFile() {
    var data = fs.readFileSync(__dirname+'/data.txt', 'utf8');
    parseData(data);
}

function parseData(data) {

    var assignments = [];
    data = data.split('\n');

    for (let x of data) {
        var elves = x.split(',');
        var elf1 = elves[0].split('-');
        var elf2 = elves[1].split('-');
        var assignment = {
            elf1: {
                from: parseInt(elf1[0]),
                to: parseInt(elf1[1])
            },
            elf2: {
                from: parseInt(elf2[0]),
                to: parseInt(elf2[1])
            }
        }
        assignments.push(assignment);
    }

    ChallengePart1(assignments);

}

function ChallengePart1(assignments) {

    var overlaps = 0;

    for (let x of assignments) {
        if (calculateOverlap(x)) overlaps++;
    }

    console.log('Part 1: There are ' + overlaps + ' completely overlapping elf assignments.');

    ChallengePart2(assignments);

}



function ChallengePart2(assignments){

    var overlaps = 0;

    for (let x of assignments) {
        if (calculateAnyOverlap(x)) overlaps++;
    }

    console.log('Part 2: There are ' + overlaps + ' somewhat overlapping elf assignments.');

}

function calculateOverlap(assignment){

    if (assignment.elf1.from <= assignment.elf2.from 
        &&  assignment.elf1.to >= assignment.elf2.to) {
        return true;
    }
    if (assignment.elf2.from <= assignment.elf1.from 
        &&  assignment.elf2.to >= assignment.elf1.to) {
            return true;
        }

    return false;

}

function calculateAnyOverlap(assignment){

    if (assignment.elf1.from <= assignment.elf2.from 
        &&  assignment.elf1.to >= assignment.elf2.from) {
        return true;
    }
    if (assignment.elf2.from <= assignment.elf1.from 
        &&  assignment.elf2.to >= assignment.elf1.from) {
            return true;
        }

    return false;

}

readFile();