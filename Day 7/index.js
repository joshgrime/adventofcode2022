var fs = require('fs');

function readFile() {
    var data = fs.readFileSync(__dirname+'/data.txt', 'utf8');
    parseData(data);
}

function parseData(data) {

    data = data.split('\n');

    MapSystem(data);
}

function MapSystem(lines) {

    var fileSys = {
        '/': {
            files: [],
            subdirs: {}
        }
    }

    var dir = ['/'];

    function processInputCmd(cmd, index) {

        var parsed = cmd.split(' ');
        var command = parsed[1];

        if (command === 'cd') {
        
            var inpt = parsed[2];         

            if (inpt === '..') {
                dir.length = dir.length - 1;

            }
            else {
                dir.push(inpt);
            }

        }

        else if (command === 'ls') {

            let depth = dir.length;
            let objRef = fileSys['/'];

            for (let x=1; x<depth; x++) {
                objRef = objRef.subdirs[dir[x]];

            }

            for (let i=index+1; i<lines.length; i++) {

                if (lines[i][0] === '$') break;

                else if (lines[i].substring(0,3) === 'dir') {

                    var nextDir = lines[i].split(' ')[1];

                    objRef.subdirs[nextDir] = {
                        files: [],
                        subdirs: {}
                    };

                }
                else {
                    objRef.files.push(lines[i]);
                }

            }

        }
    
    }

    for (let i=1; i<lines.length; i++) {
        if (lines[i][0] === '$') processInputCmd(lines[i], i);
    }
    ChallengePart1(fileSys);

}

function ChallengePart1(sys){

    var challenge1Vals = [];

    function getDirSizeRecursive(dirRef){

        dirRef.fileSize = 0;

        for (let file of dirRef.files) {
            var fileSize = parseInt(file.split(' ')[0]);
            dirRef.fileSize += fileSize;
        }

        for (let dir in dirRef.subdirs) {
                var subdirottal = getDirSizeRecursive(dirRef.subdirs[dir]);
                dirRef.fileSize += subdirottal;
        }

        if (dirRef.fileSize <= 100000) challenge1Vals.push(dirRef.fileSize);

        return dirRef.fileSize;

    }

    getDirSizeRecursive(sys['/']);

    var solution = 0;

    challenge1Vals.forEach(x=> {solution += x});

    console.log('Part 1: The solution is '+solution);

    ChallengePart2(sys);
}

function ChallengePart2(sys){
    var max_space = 70000000;
    var req_space = 30000000;
    var used_space = sys['/'].fileSize;
    var space_needed = req_space - (max_space - used_space);

    var currentBest = req_space;

    var sizes = [];

    function checkSize(dirRef){
        for (let dir in dirRef.subdirs) {
            var filesize = dirRef.subdirs[dir].fileSize;

            sizes.push(filesize);
            if (filesize > space_needed && filesize < currentBest) {
                currentBest = filesize;
                
            }
           checkSize(dirRef.subdirs[dir]);
        }
    }
    checkSize(sys['/']);

    console.log('Part 2: Solution is '+currentBest);

}

readFile();