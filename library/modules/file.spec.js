const { setIconShellCommand } = require('./file');
const { assert } = require('chai');

const aSourceFile = 'test.mp4';
const aDestinationFile = 'convert.mp4';
const aThumbnailFile = 'image.png';

describe('file', () => {
    describe('when building a ffmpeg command to set icon', () => {
        it('with all source value should return an array with 19 string', () => {
            const command = setIconShellCommand(aSourceFile, aDestinationFile, aThumbnailFile);

            assert.strictEqual(command.length, 19);
            assert.strictEqual(command[0], 'ffmpeg');
            assert.strictEqual(command[5], aSourceFile);
            assert.strictEqual(command[7], aThumbnailFile);
            assert.strictEqual(command[18], aDestinationFile);
        });
    });
});
