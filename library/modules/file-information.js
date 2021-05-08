const { AudioInformation, VideoInformation, FileInformation } = require('../models/file-information');

const extractInfo = (info, regex, extension) => {
    const result = regex.exec(info) || [];

    if (result.length === 0) {
        return '';
    } else if (!extension) {
        return result[1];
    }

    return `${result[1]} ${extension}`;
};

exports.buildShellCommand = (pathFile) => {
    if (pathFile.indexOf('./') > -1) {
        pathFile = `${process.cwd()}/${pathFile}`;
    }

    return [
        'ffprobe', '-i', pathFile
    ];
};

exports.convertShellInformation = (info) => {
    return Object.assign(new FileInformation(), {
        from: extractInfo(info, /from \'(.*)\'/),
        date: extractInfo(info, /date\s+:\s(.+)/),
        duration: extractInfo(info, /Duration: (([0-9]+):([0-9]{2}):([0-9]{2}).([0-9]+))/),
        container: extractInfo(info, /Input #0, ([a-zA-Z0-9]+),/),
        video: Object.assign(new VideoInformation(), {
            stream: extractInfo(info, /Stream #([0-9\.]+)([a-z0-9\(\)\[\]]*)[:] Video/),
            codec: extractInfo(info, /Video: ([\w]+)/),
            bitrate: extractInfo(info,  /bitrate: ([0-9]+) kb\/s/, 'kb/s'),
            resolution: extractInfo(info, /(([0-9]{2,5})x([0-9]{2,5}))/),
            pixel: extractInfo(info, /[SP]AR ([0-9\:]+)/),
            aspect: extractInfo(info, /DAR ([0-9\:]+)/),
            fps: extractInfo(info, /([0-9\.]+) (fps|tb\(r\))/, 'fps'),
        }),
        audio: Object.assign(new AudioInformation(), {
            stream: extractInfo(info, /Stream #([0-9\.]+)([a-z0-9\(\)\[\]]*)[:] Audio/),
            codec: extractInfo(info, /Audio: ([\w]+)/),
            bitrate: extractInfo(info, /Audio:.* ([0-9]+) kb\/s/, 'kb/s'),
            samplingRate: extractInfo(info, /([0-9]+) Hz/i, 'Hz'),
            channels: extractInfo(info, /Audio:.* (stereo|mono)/)
        })
    });
}