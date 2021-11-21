const sharp = require('sharp');

exports.changeSize = async (srcPathFile, destPathFile, size) => {
    try {
        const format = size.split('x');
        const convert = await sharp(srcPathFile);
        await convert.resize(parseInt(format[0]), parseInt(format[1]));
        await convert.toFile(destPathFile);

        return true;
    } catch(ex) {
        return false;
    }
};
