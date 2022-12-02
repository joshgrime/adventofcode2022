var fs = require('fs');

function readFile(){
    var data = fs.readFileSync(__dirname+'/data.txt', 'utf8');
    parseData(data);
}

function parseData(data){
    var d = data.split('\n');

    var elves = []; //holds all the elves
    var elf = []; //hold an elf calories or whatever

    for (let x of d) {
        if (x === '') {
            var temp_elf = [...elf];
            elves.push(temp_elf);
            elf.length = 0;
        }
        else {
            elf.push(x);
        }
    }

    calculateTotals(elves);

}

function calculateTotals(elves) {

    var totals = elves.map(elf => {
        var total = 0;
        for (let food of elf) {
            total += parseInt(food);
        }
        return total;
    });

    var highestNumber = Math.max(...totals);
    console.log(highestNumber);

}

readFile();