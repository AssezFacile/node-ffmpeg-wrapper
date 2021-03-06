const {
    convertCodecShellCommand, changeSizeShellCommand,
    extractShellCommand, removeAudioShellCommand,
    setWatermarkShellCommand
} = require('./video');
const { assert } = require('chai');

const aSourceFile = 'test.mp4';
const aDestinationFile = 'convert.mp4';
const aThumbnailFile = 'image.png';

describe('video', () => {
    describe('when building a ffmpeg command to convert video codec', () => {
        const aCodec = 'vp9';
        const aBitrate = 128000;
        const aRate = 30;

        it('with all source value should return an array with 7 string', () => {
            const command = convertCodecShellCommand(aSourceFile, aDestinationFile);

            assert.strictEqual(command.length, 7);
            assert.strictEqual(command[0], 'ffmpeg');
            assert.strictEqual(command[5], aSourceFile);
            assert.strictEqual(command[6], aDestinationFile);
        });

        it('with a new codec value should return an array with 9 string', () => {
            const command = convertCodecShellCommand(aSourceFile, aDestinationFile, aCodec);

            assert.strictEqual(command.length, 9);
            assert.strictEqual(command[0], 'ffmpeg');
            assert.strictEqual(command[5], aSourceFile);
            assert.strictEqual(command[7], aCodec);
            assert.strictEqual(command[8], aDestinationFile);
        });

        it('with a new bitrate value should return an array with 9 string', () => {
            const command = convertCodecShellCommand(aSourceFile, aDestinationFile, null, aBitrate);

            assert.strictEqual(command.length, 9);
            assert.strictEqual(command[0], 'ffmpeg');
            assert.strictEqual(command[5], aSourceFile);
            assert.strictEqual(command[7], aBitrate);
            assert.strictEqual(command[8], aDestinationFile);
        });

        it('with a new bitrate value should return an array with 9 string', () => {
            const command = convertCodecShellCommand(aSourceFile, aDestinationFile, null, null, aRate);

            assert.strictEqual(command.length, 9);
            assert.strictEqual(command[0], 'ffmpeg');
            assert.strictEqual(command[5], aSourceFile);
            assert.strictEqual(command[7], aRate);
            assert.strictEqual(command[8], aDestinationFile);
        });

        it('with all new value should return an array with 13 string', () => {
            const command = convertCodecShellCommand(aSourceFile, aDestinationFile, aCodec, aBitrate, aRate);

            assert.strictEqual(command.length, 13);
            assert.strictEqual(command[0], 'ffmpeg');
            assert.strictEqual(command[5], aSourceFile);
            assert.strictEqual(command[7], aCodec);
            assert.strictEqual(command[9], aBitrate);
            assert.strictEqual(command[11], aRate);
            assert.strictEqual(command[12], aDestinationFile);
        });
    });

    describe('when building a ffmpeg command to change video size', () => {
        it('with all source value should return an array with 11 string', () => {
            const aSize = 'hd720';
            const command = changeSizeShellCommand(aSourceFile, aDestinationFile, aSize);

            assert.strictEqual(command.length, 11);
            assert.strictEqual(command[0], 'ffmpeg');
            assert.strictEqual(command[5], aSourceFile);
            assert.strictEqual(command[9], aSize);
            assert.strictEqual(command[10], aDestinationFile);
        });
    });

    describe('when building a ffmpeg command to extract part of video', () => {
        it('with all source value should return an array with 15 string', () => {
            const aStartingTime = '00:01:00';
            const aDuration = 60;
            const command = extractShellCommand(aSourceFile, aDestinationFile, aStartingTime, aDuration);

            assert.strictEqual(command.length, 15);
            assert.strictEqual(command[0], 'ffmpeg');
            assert.strictEqual(command[5], aSourceFile);
            assert.strictEqual(command[11], aStartingTime);
            assert.strictEqual(command[13], aDuration);
            assert.strictEqual(command[14], aDestinationFile);
        });
    });

    describe('when building a ffmpeg command to keep only video', () => {
        it('with all source value should return an array with 9 string', () => {
            const command = removeAudioShellCommand(aSourceFile, aDestinationFile);

            assert.strictEqual(command.length, 9);
            assert.strictEqual(command[0], 'ffmpeg');
            assert.strictEqual(command[5], aSourceFile);
            assert.strictEqual(command[8], aDestinationFile);
        });
    });

    describe('when building a ffmpeg command to set watermark', () => {
        it('with all source value should return an array with 11 string', () => {
            const command = setWatermarkShellCommand(aSourceFile, aDestinationFile, aThumbnailFile);

            assert.strictEqual(command.length, 11);
            assert.strictEqual(command[0], 'ffmpeg');
            assert.strictEqual(command[5], aSourceFile);
            assert.strictEqual(command[7], aThumbnailFile);
            assert.strictEqual(command[10], aDestinationFile);
        });
    });
});
