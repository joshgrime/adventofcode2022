var fs = require('fs');

function readFile() {
    var data = fs.readFileSync(__dirname+'/data2.txt', 'utf8');
    parseData(data);
}

function parseData(data) {

    var inputs = data.split('\r\n')
                .map(input => {
                    let i = input.split(' ');
                    return {direction: i[0], amount: parseInt(i[1])}
                });


   //inputs.length = 10;

    console.log(inputs);
    ChallengePart1(inputs);

}

function ChallengePart1(inputs) {

    var head = {x: 50, y: 50};
    var tail = {x: 50, y: 50};

    var solution = [];

    for (let input of inputs) {
        
        console.log(input);

        for (let i=0; i<input.amount; i++) {

            if (input.direction === 'U') head.y--;
            if (input.direction === 'D') head.y++;
            if (input.direction === 'L') head.x--;
            if (input.direction === 'R') head.x++;
            console.log('i: '+i);
            var newTail = calcTailFollow(input.direction, head, tail);
            tail.x = newTail.x;
            tail.y = newTail.y;
            console.log('Moved tail to');
            console.log(tail);
        }

        
        console.log('New head is: ');
        console.log(head);
        console.log('New tail is: ');
        console.log(tail);
        console.log('*****');

        var tailStr = newTail.toString();

        if (solution.indexOf(tailStr === -1)) solution.push(tailStr);
        
    }

    console.log('There are '+solution.length+' unique tail locations.');

}

function calcTailFollow(direction, head, tail) {

    console.log('Working with head:');
    console.log(head);

    var negative = (direction === 'U' || direction === 'L') ? true : false;

    var xdiff = head.x - tail.x;
    var ydiff = head.y - tail.y;

    if (xdiff < 0) xdiff *= -1;
    if (ydiff < 0) ydiff *= -1;

    console.log('xdiff: '+xdiff+'  |  ydiff: '+ydiff);
    
    if (xdiff > 1 || ydiff > 1) { // not touching, need to move
        if (xdiff > 1 && ydiff <= 1) { // just move x
        console.log('Need to move x')
            if (negative) tail.x--;
            else tail.x++;
        } 
        else if (ydiff > 1 && xdiff <= 1) {// just move y
        console.log('Need to move y')
            if (negative) tail.y--;
            else tail.y++;
        }
        else { //move both
        console.log('Need to move both')
            if (negative) {
                tail.x--;
                tail.y--;
            }
            else {
                tail.x++;
                tail.y++;
            }
        }
    }
    else {
        console.log('Dont need to move');
    }
    return tail;

}

readFile();