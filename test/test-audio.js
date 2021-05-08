const { volumeShellCommand, convertCodecShellCommand } = require('../library/modules/audio');
const { assert } = require('chai');

const aSourceFile = 'test.wav';
const aDestinationFile = 'convert.wav';

describe('audio', () => {
    describe('when building a ffmpeg command to set volume', () => {
        it('should return an array with 9 string', () => {
            const aVolume = 2;
            const command = volumeShellCommand(aSourceFile, aDestinationFile, aVolume);

            assert.strictEqual(command.length, 9);
            assert.strictEqual(command[0], 'ffmpeg');
            assert.strictEqual(command[5], aSourceFile);
            assert.strictEqual(command[7], `volume=${aVolume}`);
            assert.strictEqual(command[8], aDestinationFile);
        });
    });

    describe('when building a ffmpeg command to convert audio codec', () => {
        const aCodec = 'pcm_s16le';
        const aChannels = 1;
        const aSamplingRate = 8000;
        const aBitrate = 128000;

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

        it('with a new channels value should return an array with 9 string', () => {
            const command = convertCodecShellCommand(aSourceFile, aDestinationFile, null, aChannels);

            assert.strictEqual(command.length, 9);
            assert.strictEqual(command[0], 'ffmpeg');
            assert.strictEqual(command[5], aSourceFile);
            assert.strictEqual(command[7], aChannels);
            assert.strictEqual(command[8], aDestinationFile);
        });

        it('with a new sampling rate value should return an array with 9 string', () => {
            const command = convertCodecShellCommand(aSourceFile, aDestinationFile, null, null, aSamplingRate);

            assert.strictEqual(command.length, 9);
            assert.strictEqual(command[0], 'ffmpeg');
            assert.strictEqual(command[5], aSourceFile);
            assert.strictEqual(command[7], aSamplingRate);
            assert.strictEqual(command[8], aDestinationFile);
        });

        it('with a new bitrate value should return an array with 9 string', () => {
            const command = convertCodecShellCommand(aSourceFile, aDestinationFile, null, null, null, aBitrate);

            assert.strictEqual(command.length, 9);
            assert.strictEqual(command[0], 'ffmpeg');
            assert.strictEqual(command[5], aSourceFile);
            assert.strictEqual(command[7], aBitrate);
            assert.strictEqual(command[8], aDestinationFile);
        });

        it('with all new value should return an array with 15 string', () => {
            const command = convertCodecShellCommand(aSourceFile, aDestinationFile, aCodec, aSamplingRate, aBitrate, aChannels);

            assert.strictEqual(command.length, 15);
            assert.strictEqual(command[0], 'ffmpeg');
            assert.strictEqual(command[5], aSourceFile);
            assert.strictEqual(command[7], aCodec);
            assert.strictEqual(command[9], aSamplingRate);
            assert.strictEqual(command[11], aBitrate);
            assert.strictEqual(command[13], aChannels);
            assert.strictEqual(command[14], aDestinationFile);
        });
    });
});
