const generic = require('./library/modules/generic');
const { FFmpeg } = require('./library/ffmpeg');
const { FileInformation, AudioInformation, VideoInformation } = require('./library/models/file-information');

exports.ffmpeg = {
    version: generic.version,
    requirements: generic.requirements,
    instance: (pathFile) => {
        return new FFmpeg(pathFile);
    },
};

exports.FFmpeg = FFmpeg;
exports.FileInformation = FileInformation;
exports.AudioInformation = AudioInformation;
exports.VideoInformation = VideoInformation;