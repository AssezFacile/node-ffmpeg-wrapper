const ffmpegWrapper = require('../index');
const assert = require('assert');

describe('package information', () => {
    describe('get package version', () => {
        it('should contains 3 number', () => {
            const version = ffmpegWrapper.version();

            assert.strictEqual(version.split('.').length, 3);
        });
    });
});
