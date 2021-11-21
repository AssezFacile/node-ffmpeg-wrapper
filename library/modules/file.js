
exports.setIconShellCommand = (srcPathFile, destPathFile, srcIcon) => {
    return [
        'ffmpeg', '-y', '-v', 'error',
        '-i', srcPathFile,
        '-i', srcIcon,
        '-map', 0,
        '-map', 1,
        '-c', 'copy',
        '-c:v:1', 'png',
        '-disposition:v:1', 'attached_pic',
        destPathFile
    ];
};