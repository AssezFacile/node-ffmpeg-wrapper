const sharp = async () => {
    return {
        resize: async () => {},
        toFile: async () => {},
    };
};
const { assert } = require('chai');
const { changeSize } = require('proxyquire')('./image', {
    sharp: sharp,
});

const aSourceFile = 'image.png';
const aDestinationFile = 'convert.png';
const aSize = '128x128';

describe('image', () => {
    describe('when change size of image', () => {
        it('with all source value should return an promise result', async () => {
            const result = await changeSize(aSourceFile, aDestinationFile, aSize);

            assert.strictEqual(result, true);
        });
    });
});
