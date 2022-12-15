var fs = require('fs');

function readFile() {
    var data = fs.readFileSync(__dirname+'/data.txt', 'utf8');
    parseData(data);
}

function parseData(data){

    var monkeys = [];

    data = data.split('\r\n');    

    for (let i=0; i<data.length; i+=7) {

            var monkey = {};

            monkey.id = parseInt(data[i].split(' ')[1].substring(0, 1));
            monkey.inspects = 0;

            var items = data[i+1].split(' ')
            var startItems = [];

            for (let j=4; j<items.length; j++) {
                startItems.push(parseInt(items[j]));
            }

            monkey.items = startItems;

            var operations = data[i+2].split(' ');
            monkey.operation = operations[operations.length-2] === '*' ?
            monkeyFunctions.multiply : monkeyFunctions.add;
            monkey.operationNum = operations[operations.length-1]

            var test = data[i+3].split(' ');
            monkey.test = parseInt(test[test.length-1]);

            var result_true = data[i+4].split(' ');
            monkey.result_true =  parseInt(result_true[result_true.length-1]);

            var result_false = data[i+5].split(' ');
            monkey.result_false =  parseInt(result_false[result_false.length-1]);

            monkeys.push(monkey);
        }

    ChallengePart1(monkeys);
    ChallengePart2(monkeys);

}

var monkeyFunctions = {
    multiply: function(a, b) {
        return a * b;
    },
    add: function (a, b) {
        return a + b;
    }
}

function simulateMonkeyBusiness(monkeys, rounds, worrying) {

    function throwItem(item, monkey) {

        var target = monkeys.filter(m=> {
            return m.id === monkey;
        });

        target[0].items.push(item);

    }

    let divisor = monkeys.reduce((acc, monkey) => {
        return acc * monkey.test;
      }, 1);

    for (let i=0; i<rounds; i++) {

        for (let monkey of monkeys) {

            var itemCount = monkey.items.length;

            for (let item of monkey.items) {

                let factor = monkey.operationNum === 'old' ? item : parseInt(monkey.operationNum);
                item = monkey.operation(item, factor);

                if (worrying) { //Part 1
                    item = Math.floor(item/3);
                }
                else { //Part 2
                   item %= divisor;
                }

                if (worrying) { //Part 1
                    if (item % monkey.test === 0) {
                        throwItem(item, monkey.result_true);
                    }
                    else {
                        throwItem(item, monkey.result_false);
                    }
                }
                else { //Part 2
                    if (item % monkey.test === 0) {
                        throwItem(item, monkey.result_true);
                    }
                    else {
                        throwItem(item, monkey.result_false);
                    }
                }
 
                monkey.inspects++;

            }

            monkey.items.splice(0, itemCount);

        }

    }

    return monkeys;

}

function calcMonkeyBusiness(monkeys) {

    var topTwoMonkeys = [0,0];

    for (let monkey of monkeys) {

        if (monkey.inspects > topTwoMonkeys[0]) topTwoMonkeys.unshift(monkey.inspects);
        else if (monkey.inspects > topTwoMonkeys[1]) topTwoMonkeys.splice(1, 1, monkey.inspects);

        topTwoMonkeys.length = 2;

    }

    return topTwoMonkeys;

}

function ChallengePart1(monkeys) {

    var rounds = 20;

    var monkeys = simulateMonkeyBusiness(monkeys, rounds, true);
    var topTwoMonkeys = calcMonkeyBusiness(monkeys);
    
    console.log('Part 1: Solution is '+(topTwoMonkeys[0] * topTwoMonkeys[1]));

}

function ChallengePart2(monkeys) {

    var rounds = 10000;

    var monkeys = simulateMonkeyBusiness(monkeys, rounds, false);
    var topTwoMonkeys = calcMonkeyBusiness(monkeys);

    console.log('Part 2: Solution is '+(topTwoMonkeys[0] * topTwoMonkeys[1]));

}

readFile();