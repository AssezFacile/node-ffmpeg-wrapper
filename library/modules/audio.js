
exports.convertCodecShellCommand = (srcPathFile, destPathFile, codec, bitrate, rate, channels) => {
    const commands = [
        'ffmpeg', '-y', '-v', 'error',
        '-i', srcPathFile,
        destPathFile
    ];

    if (codec) commands.splice(-1, 0, '-c:a', codec);
    if (bitrate) commands.splice(-1, 0, '-b:a', bitrate);
    if (rate) commands.splice(-1, 0, '-ar', rate);
    if (channels) commands.splice(-1, 0, '-ac', channels);

    return commands;
};

exports.volumeShellCommand = (srcPathFile, destPathFile, volume) => {
    return [
        'ffmpeg', '-y', '-v', 'error',
        '-i', srcPathFile,
        '-filter:a', `volume=${volume}`,
        destPathFile
    ];
};

exports.removeVideoShellCommand = (srcPathFile, destPathFile, codec) => {
    return [
        'ffmpeg', '-y', '-v', 'error',
        '-i', srcPathFile,
        '-c:a', codec,
        '-vn',
        destPathFile
    ];
};
