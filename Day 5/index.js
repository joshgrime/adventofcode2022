var fs = require('fs');

function readFile() {
    var data = fs.readFileSync(__dirname+'/data.txt', 'utf8');
    parseData(data);
}

function parseData(data) {

    var howManyStacks = 9;
   
    var instructions = data.split('\n');
    var startingBlocks = [...instructions];
    startingBlocks.length = howManyStacks;
    instructions.splice(0, 10);

    var strategy = [];

    for (let x of instructions) {
        var d = x.split(' ');
        var obj = {
            amount: d[1],
            from: d[3]-1,
            to : d[5]-1
        }
        strategy.push(obj);
    }

    var stacks = Array(howManyStacks);
    var _stacks = Array(howManyStacks);
    for (let i=0; i<stacks.length; i++) {
        stacks[i] = [];
        _stacks[i] = [];
    }

    for (let i=startingBlocks.length-1; i>-1; i-- ) {

        for (let j=-1; j<howManyStacks*2; j++) {

            var blockType = startingBlocks[i].substring((j*2)+1,(j*2)+2);

            if (blockType !== ' ' && blockType !== '' && i < startingBlocks.length-1) {

                let index = ((j + 2) / 2) - 1;
                stacks[index].push(blockType);
                _stacks[index].push(blockType);

            }

        }
        
    }
    
    ChallengePart1(stacks, strategy);
    ChallengePart2(_stacks, strategy);
}

function ChallengePart1(stacks, strategy) {

    for (let x of strategy) {

        for (let i=0; i<x.amount; i++) {
            var block = stacks[x.from].pop();
            stacks[x.to].push(block);
        }
    }

    var solutionstring = '';
    
    for (let x of stacks) {
        solutionstring += x[x.length-1];
    }

    console.log('Part 1: Final solution is: '+solutionstring);

}

function ChallengePart2(stacks, strategy) {

    for (let x of strategy) {
        var len = stacks[x.from].length;
        var blocks = stacks[x.from].splice(len - x.amount, len);
        stacks[x.to] = stacks[x.to].concat(blocks);
    }

    var solutionstring = '';
    
    for (let x of stacks) {
        solutionstring += x[x.length-1];
    }

    console.log('Part 2: Final solution is: '+solutionstring);

}

readFile();