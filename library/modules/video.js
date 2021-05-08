
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
