const { ffmpeg, FFmpeg } = require('../index');
const file = `${__dirname}/audio.mp3`;

/* Get all information of file *//*
new FFmpeg(file).getFileInformation().then((infos) => {
    console.log(infos);
});
*/

/* Get audio information of file *//*
new FFmpeg(file).getAudioInformation().then((infos) => {
    console.log(infos);
});
*/

/* Get video information of file *//*
ffmpeg.instance(file).getVideoInformation().then((infos) => {
    console.log(infos);
});
*/

/* Increase the volume by 2 *//*
ffmpeg.instance(file).setVolume(2).then((infos) => {
    console.log(infos);
});
*/
