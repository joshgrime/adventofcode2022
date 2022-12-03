var fs = require('fs');

function readFile() {
    var data = fs.readFileSync(__dirname+'/data.txt', 'utf8');
    parseData(data);
}

function parseData(data) {
    var bags = data.split('\n');
    ChallengePart1(bags);
}

function ChallengePart1(bags) {

    var doubleItems = [];

    for (let bag of bags) {

        var itemcount = bag.length;
        var leftCompartment = bag.substring(0, itemcount/2);
        var rightCompartment = bag.substring(itemcount/2, bags.length);

        for (let i=0; i<leftCompartment.length; i++) {
            var l = leftCompartment[i];
            if (rightCompartment.indexOf(l) > -1) {
                doubleItems.push(l);
                break;
            }
        }

    }

    var totalScore = sumPriorities(doubleItems);

    console.log('Part 1: Final sum is: '+totalScore);

    ChallengePart2(bags);

}

function ChallengePart2(bags) {

    var badges = [];

    for (let i=0; i<bags.length; i+=3) {
        var badge = getCommonItem(bags[i], bags[i+1], bags[i+2]);
        badges.push(badge);
    }

    var totalScore = sumPriorities(badges);

    console.log('Part 2: Final sum is: '+totalScore);


}

function getLongestLength(bags) {
    var longestLen = 0;
    bags.forEach(bag => {if (bag.length > longestLen) longestLen = bag.length});
    return longestLen;
}

function getCommonItem(bag1, bag2, bag3) {
    var loops = getLongestLength([bag1, bag2, bag3]);
    for (let j=0; j<loops; j++) {
        for (let k=0; k<loops; k++) {
            for (let l=0; l<loops; l++) {
                if (bag1[j] === bag2[k] && bag1[j] === bag3[l]) return bag1[j];
            }
        }
    }
}

function sumPriorities(items) {
    var priorityList = ' abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var totalSum = 0;
    items.forEach(item => totalSum += priorityList.indexOf(item));
    return totalSum;
}

readFile();
