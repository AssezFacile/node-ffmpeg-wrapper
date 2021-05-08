const fs = require('fs');
const path = require('path');
const execution = require('./shell-execution');
const fileInformation = require('./file-information');
const audio = require('./audio');
const video = require('./video');

class FFmpeg {
    constructor(filePath) {
        if (!fs.existsSync(filePath)) throw new Error('Your file does not exist');

        this.source = filePath;
        this.directory = path.dirname(filePath);
        this.extension = path.extname(filePath);
    }

    _generateTemporaryName(extension = null) {
        return `${(new Date()).getTime()}${(extension || this.extension)}`;
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
        if (typeof(levelVolume) !== 'number') {
            throw new Error('level volume should be a number');
        }

        const temporaryName = this._generateTemporaryName();
        const command = audio.volumeShellCommand(this.source, `${this.directory}/${temporaryName}`, levelVolume);
        await execution.execute(command);

        return new FFmpeg(`${this.directory}/${temporaryName}`);
    }

    async convertAudio(extension = null, codec = null, bitrate = null, rate = null, channels = null) {
        if (extension && extension.indexOf('.') !== 0) {
            throw new Error('extension should start with "."');
        }

        const temporaryName = this._generateTemporaryName(extension);
        const command = audio.convertCodecShellCommand(
            this.source, `${this.directory}/${temporaryName}`,
            codec, bitrate, rate, channels
        );
        await execution.execute(command);

        return new FFmpeg(`${this.directory}/${temporaryName}`);
    }

    async convertAudioToStandardTelephonyFormat() {
        return await this.convertAudio('.wav', 'pcm_s16le', null, 8000, 1);
    }

    async convertAudioToStandardWaveFormat() {
        return await this.convertAudio('.wav', 'pcm_u8');
    }

    async convertAudioToStandardFlacFormat() {
        return await this.convertAudio('.flac', 'flac');
    }

    async convertAudioToStandardOggFormat() {
        return await this.convertAudio('.ogg', 'libvorbis');
    }

    async convertVideo(extension = null, codec = null, bitrate = null) {
        if (extension && extension.indexOf('.') !== 0) {
            throw new Error('extension should start with "."');
        }

        const temporaryName = this._generateTemporaryName(extension);
        const command = video.convertCodecShellCommand(
            this.source, `${this.directory}/${temporaryName}`,
            codec, bitrate
        );
        await execution.execute(command);

        return new FFmpeg(`${this.directory}/${temporaryName}`);
    }
}

exports.FFmpeg = FFmpeg;