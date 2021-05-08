const shell = require('any-shell-escape');
const { exec } = require('child_process');

exports.execute = (command) => {
    return new Promise((resolve, reject) => {
        exec(shell(command), (error, stdout, stderr) => {
            if (error) {
                return reject(error);
            }

            resolve(stdout || stderr);
        });
    });
};