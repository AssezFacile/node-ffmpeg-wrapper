const package = require('./package.json');

exports.version = () => {
    return package.version;
}