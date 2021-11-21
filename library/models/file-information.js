const { AudioInformation } = require('./audio-information');
const { VideoInformation } = require('./video-information');

class FileInformation {
    from = '';
    date = '';
    duration = '';
    container = '';
    audio = new AudioInformation();
    video = new VideoInformation();

    constructor() { }
};

exports.FileInformation = FileInformation;