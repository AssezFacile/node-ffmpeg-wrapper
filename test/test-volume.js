const { buildShellCommand } = require('../library/modules/volume');
const { assert } = require('chai');

const aSourceFile = 'test.wav';
const aDestinationFile = 'test_increase.wav';

describe('volume', () => {
    describe('building a ffmpeg command', () => {
        it('should return an array with 9 string', () => {
            const aVolume = 2;
            const command = buildShellCommand(aVolume, aSourceFile, aDestinationFile);

            assert.strictEqual(command.length, 9);
            assert.strictEqual(command[0], 'ffmpeg');
            assert.strictEqual(command[5], aSourceFile);
            assert.strictEqual(command[7], `volume=${aVolume}`);
            assert.strictEqual(command[8], aDestinationFile);
        });
    });
});
