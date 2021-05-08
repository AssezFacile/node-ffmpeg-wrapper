const package = require('../../package.json');
const execution = require('./shell-execution');

exports.version = () => {
    return package.version;
};

exports.requirements = async () => {
    const outputFfprobeVersion = await execution.execute(['ffprobe', '-version']);
    const outputFfmpegVersion = await execution.execute(['ffmpeg', '-version']);
};