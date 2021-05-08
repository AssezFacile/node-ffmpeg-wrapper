const fs = require('fs');
const path = require('path');
const execution = require('./shell-execution');
const fileInformation = require('./file-information');
const audio = require('./audio');
const video = require('./video');

class FFmpeg {
    constructor(filePath, original = null) {
        if (!fs.existsSync(filePath)) throw new Error('Your file does not exist');

        this.source = filePath;
        this.original = original || filePath;
        this.directory = path.dirname(filePath);
        this.extension = path.extname(filePath);
        this.originalPath = this.original.replace(/\/|:|\\/ig, '-');
        this.temporaryPrefix = `.ffmpeg-wrapper_${this.originalPath}_`;
    }

    _generateTemporaryName(extension = null) {
        return `${this.temporaryPrefix}${(new Date()).getTime()}${(extension || this.extension)}`;
    }

    _deleteTemporaryFiles() {
        const files = fs.readdirSync(this.directory).filter(file => file.indexOf(this.temporaryPrefix) > -1);
        
        for (let i = 0, j = files.length; i < j; i++) {
            fs.unlinkSync(`${this.directory}/${files[i]}`);
        }
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

    async save(filePath = null) {
        return new Promise((resolve, reject) => {
            fs.rename(this.source, filePath || this.original, async (error) => {
                if (error) reject(error);
                else  {
                    this._deleteTemporaryFiles();
                    resolve(filePath || this.original);
                }
            });
        });
    }

    async multiple(...parameters) {
        let activeFFmpeg = this;

        for (let i = 0, j = parameters.length; i < j; i++) {
            const command = parameters[i][0];
            const argument = parameters[i].splice(1, parameters[i].length);

            activeFFmpeg = await activeFFmpeg[command](...argument);
        }

        return activeFFmpeg;
    }

    async executeCustomCommand(command = []) {
        if (!Array.isArray(command)) {
            throw new Error('pass an array with all parameter of the command line : ["ffmpeg", "-i", "file.mp3", "file.wav"]');
        }

        const temporaryName = command[command.length - 1];
        if (temporaryName && temporaryName.indexOf('.') === -1) {
            throw new Error('last item in array should be the output file path');
        }

        await execution.execute(command);

        return new FFmpeg(`${this.directory}/${temporaryName}`, this.original);
    }

    async setVolume(levelVolume) {
        if (typeof(levelVolume) !== 'number') {
            throw new Error('level volume should be a number');
        }

        const temporaryName = this._generateTemporaryName();
        const command = audio.volumeShellCommand(this.source, `${this.directory}/${temporaryName}`, levelVolume);
        await execution.execute(command);

        return new FFmpeg(`${this.directory}/${temporaryName}`, this.original);
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

        return new FFmpeg(`${this.directory}/${temporaryName}`, this.original);
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

    async convertAudioToStandardMp3Format() {
        return await this.convertAudio('.mp3', 'libmp3lame');
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

        return new FFmpeg(`${this.directory}/${temporaryName}`, this.original);
    }

    async changeSize(size) {
        const temporaryName = this._generateTemporaryName();
        const command = video.changeSizeShellCommand(
            this.source, `${this.directory}/${temporaryName}`, size
        );
        await execution.execute(command);

        return new FFmpeg(`${this.directory}/${temporaryName}`, this.original);
    }

    async extractPart(startingTime, duration) {
        const temporaryName = this._generateTemporaryName();
        const command = video.extractShellCommand(
            this.source, `${this.directory}/${temporaryName}`, startingTime, duration
        );
        await execution.execute(command);

        return new FFmpeg(`${this.directory}/${temporaryName}`, this.original);
    }

    async removeAudio() {
        const temporaryName = this._generateTemporaryName();
        const command = video.removeAudioShellCommand(
            this.source, `${this.directory}/${temporaryName}`
        );
        await execution.execute(command);

        return new FFmpeg(`${this.directory}/${temporaryName}`, this.original);
    }

    async removeVideo() {
        const temporaryName = this._generateTemporaryName('.mp3');
        const command = audio.removeVideoShellCommand(
            this.source, `${this.directory}/${temporaryName}`, 'libmp3lame'
        );
        await execution.execute(command);

        return new FFmpeg(`${this.directory}/${temporaryName}`, this.original);
    }
}

exports.FFmpeg = FFmpeg;