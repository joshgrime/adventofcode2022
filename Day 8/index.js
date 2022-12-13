var fs = require('fs');

function readFile() {
    var data = fs.readFileSync(__dirname+'/data.txt', 'utf8');
    parseData(data);
}

function parseData(data) {

    var grid = data.split('\r\n');

    grid = grid.map(treeRow => {
        return treeRow.split('')
        .map(tree => {
            return parseInt(tree);
        });
    });

    ChallengePart1(grid);

}

function cutTrees(grid, x, y) {
    var row = grid[y];
    var col = grid.map(treeRow=>{
        return treeRow[x];
    });
    var leftTrees = row.slice(0, x);
    var rightTrees = row.slice(x + 1, row.length);
    var topTrees = col.slice(0, y);
    var botTrees = col.slice(y + 1, col.length);
    return [leftTrees, rightTrees, topTrees, botTrees];
}

function ChallengePart1(grid) {

    var viewableTrees = 0;
    
    var sideTrees = ( grid.length * 2 ) + ( grid[0].length * 2 ) - 4;
    viewableTrees += sideTrees;

    function isViewable(coord) {
        //coord: {x: 0, y: 0}
        var tree = grid[coord.y][coord.x];
        var treeRows = cutTrees(grid, coord.x, coord.y);

        if (checkTreeRow(treeRows[0], tree)) return true;
        if (checkTreeRow(treeRows[1], tree)) return true;
        if (checkTreeRow(treeRows[2], tree)) return true;
        if (checkTreeRow(treeRows[3], tree)) return true;
    
        return false;
    }

    function checkTreeRow(treeRow, value) {
        for (let x of treeRow) {
            if (x >= value) {
                return false;
            }
        }
        return true;
    }

    for (let i=1; i<grid[0].length-1; i++) {
        for (let j=1; j<grid.length-1; j++) {
           if (isViewable({x: i, y: j})) viewableTrees++;
        }
    }

    console.log('Part 1: Total viewable trees: '+viewableTrees);

    ChallengePart2(grid);
    

}

function ChallengePart2(grid) {

    function calculateScore(coord){
        //coord: {x: 0, y: 0}

        var tree = grid[coord.y][coord.x];
        var treeRows = cutTrees(grid, coord.x, coord.y);

        var lscore = getScore(treeRows[0], tree, false);
        var rscore = getScore(treeRows[1], tree, true);
        var tscore = getScore(treeRows[2], tree, false);
        var bscore = getScore(treeRows[3], tree, true);

        return lscore * rscore * tscore * bscore;
        
    }

    function getScore(treeRow, value, direction) {
        //direction should be true for down/right, false for up/left

        if (direction) {
            for (let i=0; i<treeRow.length; i++) {
                if (treeRow[i] >= value) {
                    return i + 1;
                }
            }
            return treeRow.length;
        }

        else {
            var c = 0;
            for (let i=treeRow.length-1; i>-1; i--) {
                c++;
                if (treeRow[i] >= value) {
                    return c;
                }
            }
            return treeRow.length;
        }

    }

    var topScore = 0;

    for (let i=1; i<grid[0].length-1; i++) {
        for (let j=1; j<grid.length-1; j++) {
           var score = calculateScore({x: i, y: j});
           if (score > topScore) topScore = score;
        }
    }

    console.log('Part 2: The highest possible score in this forest is '+topScore);

}

readFile();