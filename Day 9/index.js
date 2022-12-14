var fs = require('fs');

function readFile() {
    var data = fs.readFileSync(__dirname+'/data.txt', 'utf8');
    parseData(data);
}

function parseData(data) {

    var inputs = data.split('\n')
                .map(input => {
                    let i = input.split(' ');
                    return {direction: i[0], amount: parseInt(i[1])}
                });

    ChallengePart1(inputs);

}

function ChallengePart1(inputs) {

    var head = {x: 50, y: 50};
    var tail = {x: 50, y: 50};

    var solution = [];

    solution.push(JSON.stringify(tail));

    for (let input of inputs) {

        for (let i=0; i<input.amount; i++) {

            if (input.direction === 'U') head.y--;
            if (input.direction === 'D') head.y++;
            if (input.direction === 'L') head.x--;
            if (input.direction === 'R') head.x++;
            
            var newTail = calcTailFollow(head, tail);

            tail.x = newTail.x;
            tail.y = newTail.y;

            var tailStr = JSON.stringify(newTail);
            if (solution.indexOf(tailStr) === -1) solution.push(tailStr);

        }

    }

    console.log('Part 1: There are '+solution.length+' unique tail locations.');
    ChallengePart2(inputs);

}

function ChallengePart2(inputs) {

    var rope = [];

    for (let i=0; i<10; i++) {
        rope.push({x: 50, y: 50});
    }

    var solution = [];

    solution.push(JSON.stringify(rope[0]));

    for (let input of inputs) {

        for (let i=0; i<input.amount; i++) {

            let head = rope[0];

            if (input.direction === 'U') head.y--;
            if (input.direction === 'D') head.y++;
            if (input.direction === 'L') head.x--;
            if (input.direction === 'R') head.x++;

            for (let j=1; j<rope.length; j++) {

                let knot = rope[j];
                var newKnot = calcTailFollow(rope[j-1], knot);

                rope[j].x = newKnot.x;
                rope[j].y = newKnot.y;

                if (j === rope.length-1) {
                    var tailStr = JSON.stringify(newKnot);
                    if (solution.indexOf(tailStr) === -1) solution.push(tailStr);
                }

            }

        }

    }
    console.log('Part 2: There are '+solution.length+' unique tail locations');
}

function calcTailFollow(head, tail) {

    if (tail.y === head.y && tail.x === head.x) return tail;

    var xdiff = head.x - tail.x;
    var ydiff = head.y - tail.y;

    var pos_xdiff = xdiff < 0 ? xdiff * -1 : xdiff; 
    var pos_ydiff = ydiff < 0 ? ydiff * -1 : ydiff;

    if (pos_xdiff <= 1 && pos_ydiff <= 1) return tail;

    if ((pos_xdiff > 1 && pos_ydiff > 0) || (pos_xdiff > 0 && pos_ydiff > 1)) { //diagonal move

        if (xdiff > 0 && ydiff > 0) { //down and right
            tail.x++;
            tail.y++;
        }
        if (xdiff > 0 && ydiff < 0) { //up and right
            tail.x++;
            tail.y--;
        }
        if (xdiff < 0 && ydiff < 0) { //up and left
            tail.x--;
            tail.y--;
        }
        if (xdiff < 0 && ydiff > 0) { //down and left
            tail.x--;
            tail.y++;
        }

    }
    else { //horizontal or vertical move

        if (xdiff > 1) tail.x++;
        if (xdiff < -1) tail.x--;
        if (ydiff > 1) tail.y++;
        if (ydiff < -1) tail.y--;
        
    }

    return tail;

}

readFile();