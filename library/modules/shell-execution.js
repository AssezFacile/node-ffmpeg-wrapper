const shell = require('any-shell-escape');
const { exec } = require('child_process');

exports.execute = (command) => {
    return new Promise((resolve, reject) => {
        const options = {};

        exec(shell(command), options, (error, stdout, stderr) => {
            if (error) {
                if (error.message.includes('ffmpeg: not found')) {
                    return reject(new Error(`You need to install ffmpeg`));
                }

                return reject(error);
            }

            resolve(stdout || stderr);
        });
    });
};