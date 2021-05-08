class AudioInformation {
    stream = '';
    codec = '';
    bitrate = '';
    samplingRate = '';
    channels = '';

    constructor() { }
}

class VideoInformation {
    stream = '';
    codec = '';
    bitrate = '';
    resolution = '';
    pixel = '';
    aspect = '';
    fps = '';

    constructor() { }
};

class FileInformation {
    from = '';
    date = '';
    duration = '';
    container = '';
    audio = new AudioInformation();
    video = new VideoInformation();

    constructor() { }
};

exports.AudioInformation = AudioInformation;
exports.VideoInformation = VideoInformation;
exports.FileInformation = FileInformation;