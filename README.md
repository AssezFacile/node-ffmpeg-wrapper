# @assezfacile/ffmpeg-wrapper
NodeJS wrapper to simplify some ffmpeg function

### Install
`npm install @assezfacile/ffmpeg-wrapper`

### How to use it
```
const { FFmpeg } = require('@assezfacile/ffmpeg-wrapper');

new FFmpeg(sourcefile).getFileInformation().then(info => {
    console.log(info);
});
```
more detail in [example](./example/README.md)