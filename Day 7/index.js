var fs = require('fs');

function readFile() {
    var data = fs.readFileSync(__dirname+'/data.txt', 'utf8');
    parseData(data);
}

function parseData(data) {

    data = data.split('\n');

    ChallengePart1(data);
}

function ChallengePart1(lines) {

    var fileSys = {
        '/': {
            files: [],
            subdirs: {}
        }
    }

    var dir = '/';

    function processInputCmd(cmd, index) {

        var parsed = cmd.split(' ');
    
        var command = parsed[1];

        if (command === 'cd') {
        
            var inpt = parsed[2];
            var currentDirectory = dir.split('/');

            if (inpt === '..') {
                currentDirectory = currentDirectory.slice(0, -1);
                dir = currentDirectory.join('/');
            }

        }

        else if (command === 'ls') {

            for (let i=index+1; i<lines.length; i++) {

                if (lines[i][0] === '$') break;

                else if (lines[i].substring(0,3) === 'dir') {

                    var dirname = lines[i].split(' ')[1];

                    fileSys[dir].subdirs[dirname] = {
                        files: [],
                        subdirs: {}
                    };

                }
                else {
                    fileSys[dir].files.push(lines[i]);
                }

            }

        }
    
    }
    
    for (let i=1; i<lines.length; i++) {
        if (lines[i][0] === '$') processInputCmd(lines[i], i);
    }


}



function processOutput() {

}



readFile();