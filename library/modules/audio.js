
exports.volumeShellCommand = (srcPathFile, destPathFile, volume) => {
    return [
        'ffmpeg', '-y', '-v', 'error',
        '-i', srcPathFile,
        '-filter:a', `volume=${volume}`,
        destPathFile
    ];
};

exports.convertCodecShellCommand = (srcPathFile, destPathFile, codec, samplingRate, bitrate, channels) => {
    const commands = [
        'ffmpeg', '-y', '-v', 'error',
        '-i', srcPathFile,
        destPathFile
    ];

    if (codec) commands.splice(-1, 0, '-acodec', codec);
    if (samplingRate) commands.splice(-1, 0, '-ar', samplingRate);
    if (bitrate) commands.splice(-1, 0, '-b:a', bitrate);
    if (channels) commands.splice(-1, 0, '-ac', channels);

    return commands;
};
