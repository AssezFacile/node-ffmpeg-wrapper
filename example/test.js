const { ffmpeg, FFmpeg } = require('../index');
const file = `${__dirname}/audio.mp3`;

/* Get library version *//*
console.log(ffmpeg.version());
*/

/* Check for all requirements *//*
ffmpeg.requirements().then(() => {
    console.log('all requirements');
}).catch((error) => {
    console.log(error.message);
});
*/

/* Get all information of file *//*
ffmpeg.instance(file).getFileInformation().then((infos) => {
    console.log(infos);
});
*/

/* Get audio information of file *//*
ffmpeg.instance(file).getAudioInformation().then((infos) => {
    console.log(infos);
});
*/

/* Get video information of file *//*
new FFmpeg(file).getVideoInformation().then((infos) => {
    console.log(infos);
});
*/

/* Increase the volume by 2 *//*
new FFmpeg(file).setVolume(2).then((infos) => {
    console.log(infos);
});
*/
