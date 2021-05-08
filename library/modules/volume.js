
exports.buildShellCommand = (volume, srcPathFile, destPathFile) => {
    return [
        'ffmpeg', '-y', '-v', 'error',
        '-i', srcPathFile,
        '-filter:a', `volume=${volume}`,
        destPathFile
    ];
};
