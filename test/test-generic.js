const execution = {};

const { assert, expect } = require('chai');
const { version, requirements } = require('proxyquire')('../library/modules/generic', {
    './shell-execution': execution
});

describe('generic', () => {
    describe('when get package version', () => {
        it('should return a string with 3 number', () => {
            const aVersion = version();

            assert.strictEqual(aVersion.split('.').length, 3);
        });
    });

    describe('when check all requirements', () => {
        it('with all dependencies should not throw error', async () => {
            execution.execute = () => Promise.resolve('ok');

            await expect(requirements).not.to.throw();
        });

        it('with missing dependencies should throw error', (done) => {
            execution.execute = () => Promise.reject(new Error());

            requirements().then(() => {
                done(new Error('Expected method to be rejected'));
            }).catch(() => done());
        });
    });
});
