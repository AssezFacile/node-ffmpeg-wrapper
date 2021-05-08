const path = require('path');
const execution = require('../modules/shell-execution');
const fileInformation = require('../modules/file-information');
const volume = require('../modules/volume');

class FFmpeg {
    constructor(filePath) {
        this.source = filePath;
        this.directory = path.dirname(filePath);
        this.extension = path.extname(filePath);
    }

    async getFileInformation() {
        const command = fileInformation.buildShellCommand(this.source);
        const result = await execution.execute(command);
        return fileInformation.convertShellInformation(result);
    }
    
    async getAudioInformation() {
        const command = fileInformation.buildShellCommand(this.source);
        const result = await execution.execute(command);
        const infos = fileInformation.convertShellInformation(result);

        return infos.audio;
    }

    async getVideoInformation() {
        const command = fileInformation.buildShellCommand(this.source);
        const result = await execution.execute(command);
        const infos = fileInformation.convertShellInformation(result);

        return infos.video;
    }

    async setVolume(levelVolume) {
        const temporaryName = `${(new Date()).getTime()}${this.extension}`;
        const command = volume.buildShellCommand(levelVolume, this.source, temporaryName);
        await execution.execute(command);

        return new FFmpeg(temporaryName);
    }
}

exports.FFmpeg = FFmpeg;