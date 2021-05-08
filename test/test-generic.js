const { version, requirements } = require('../library/modules/generic');
const { assert } = require('chai');

describe('generic', () => {
    describe('get package version', () => {
        it('should return a string with 3 number', () => {
            const aVersion = version();

            assert.strictEqual(aVersion.split('.').length, 3);
        });
    });

    describe('check all requirements', () => {
        it('should return true', () => {
            const success = requirements();

            assert.strictEqual(success, true);
        });
    });
});
