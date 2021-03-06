// Uncomment to test the local library
const { ffmpeg, FFmpeg } = require('../index');
// Uncomment to test the repository library
//const { ffmpeg, FFmpeg } = require('@assezfacile/ffmpeg-wrapper');

// Finally, uncomment the method you want to try
const audio = `${__dirname}/audio.mp3`;
const video = `${__dirname}/video.mp4`;
const image = `${__dirname}/image.png`;

/* Get library version *//*
console.log(ffmpeg.version());
*/

/* Check for all requirements */
/*
ffmpeg.requirements().then(() => {
    console.log('all requirements');
}).catch((error) => {
    console.log(error.message);
});
*/

/* Get all information of file */
/*
ffmpeg.instance(video).getFileInformation().then((infos) => {
    console.log(infos);
});
*/

/* Get audio information of file */
/*
ffmpeg.instance(audio).getAudioInformation().then((infos) => {
    console.log(infos);
});
/*

/* Get video information of file */
/*
new FFmpeg(audio).getVideoInformation().then((infos) => {
    console.log(infos);
});
*/

/* Increase the volume by 2 */
/*
new FFmpeg(audio).setVolume(2).then((infos) => {
    console.log(infos);
});
*/

/* Convert audio */
/*
new FFmpeg(audio).convertAudio('.wav', 'pcm_s16le', 8000, null, 1).then((infos) => {
    console.log(infos);
});
*/

/* Convert to ogg */
/*
new FFmpeg(audio).convertAudioToStandardOggFormat().then((infos) => {
    console.log(infos);
});
*/

/* Convert video */
/*
new FFmpeg(video).convertVideo('.mkv', 'vp9', '300k', 30).then((infos) => {
    console.log(infos);
});
*/

/* Convert video */
/*
new FFmpeg(video).convertVideo('.webm').then((infos) => {
    console.log(infos);
});
*/

/* Size video size */
/*
new FFmpeg(video).changeSize('1280x720').then((infos) => {
    console.log(infos);
});
new FFmpeg(video).changeSize([1280, 720]).then((infos) => {
    console.log(infos);
});
new FFmpeg(video).changeSize({ width: 1280, height: 720 }).then((infos) => {
    console.log(infos);
});
*/

/* Extract part of video */
/*
new FFmpeg(video).extractPart('00:00:30', 10).then((infos) => {
    console.log(infos);
});
*/

/* Remove audio from video */
/*
new FFmpeg(video).removeAudio().then((infos) => {
    console.log(infos);
});
*/

/* Remove video from video */
/*
new FFmpeg(video).removeVideo().then((infos) => {
    console.log(infos);
});
*/

/* Convert video and audio */
/*
new FFmpeg(video).multiple(
    ['convertVideo', '.mkv'],
    ['convertAudioToStandardOggFormat'],
    ['save', `${__dirname}/output.mkv`]
).then((infos) => {
    console.log(infos);
});
*/

/* Add image as icon on file */
/*
new FFmpeg(video).setIcon(image).then((infos) => {
    console.log(infos);
});
*/

/* Add image as watermark on video */
/*
new FFmpeg(video).setWatermark(image, 'top-right', {
    width: 64,
    height: 64,
}).then((infos) => {
    console.log(infos);
});
*/
