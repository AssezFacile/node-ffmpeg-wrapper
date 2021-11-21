
exports.convertCodecShellCommand = (srcPathFile, destPathFile, codec, bitrate, rate) => {
    const commands = [
        'ffmpeg', '-y', '-v', 'error',
        '-i', srcPathFile,
        destPathFile
    ];

    if (codec) commands.splice(-1, 0, '-c:v', codec);
    if (bitrate) commands.splice(-1, 0, '-b:v', bitrate);
    if (rate) commands.splice(-1, 0, '-r', rate);

    return commands;
};

exports.changeSizeShellCommand = (srcPathFile, destPathFile, size) => {
    return [
        'ffmpeg', '-y', '-v', 'error',
        '-i', srcPathFile,
        '-c:a', 'copy',
        '-s', size,
        destPathFile
    ];
};

exports.extractShellCommand = (srcPathFile, destPathFile, startingTime, duration) => {
    return [
        'ffmpeg', '-y', '-v', 'error',
        '-i', srcPathFile,
        '-c:v', 'copy', '-c:a', 'copy',
        '-ss', startingTime, '-t', duration,
        destPathFile
    ];
};

exports.removeAudioShellCommand = (srcPathFile, destPathFile) => {
    return [
        'ffmpeg', '-y', '-v', 'error',
        '-i', srcPathFile,
        '-an', '-sn',
        destPathFile
    ];
};

exports.setWatermarkShellCommand = (srcPathFile, destPathFile, srcWatermark, position) => {
    return [
        'ffmpeg', '-y', '-v', 'error',
        '-i', srcPathFile,
        '-i', srcWatermark,
        '-filter_complex', position,
        destPathFile
    ];
};
