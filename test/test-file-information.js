const { FileInformation } = require('../library/models/file-information');
const { buildShellCommand, convertShellInformation } = require('../library/modules/file-information');
const { assert } = require('chai');

const anAudioFile = 'test.wav';
const anAudioFfProbeResult = `ffprobe version 4.3.1-4ubuntu1 Copyright (c) 2007-2020 the FFmpeg developers
built with gcc 10 (Ubuntu 10.2.0-9ubuntu2)
configuration: --prefix=/usr --extra-version=4ubuntu1 --toolchain=hardened --libdir=/usr/lib/x86_64-linux-gnu --incdir=/usr/include/x86_64-linux-gnu --arch=amd64 --enable-gpl --disable-stripping --enable-avresample --disable-filter=resample --enable-gnutls --enable-ladspa --enable-libaom --enable-libass --enable-libbluray --enable-libbs2b --enable-libcaca --enable-libcdio --enable-libcodec2 --enable-libdav1d --enable-libflite --enable-libfontconfig --enable-libfreetype --enable-libfribidi --enable-libgme --enable-libgsm --enable-libjack --enable-libmp3lame --enable-libmysofa --enable-libopenjpeg --enable-libopenmpt --enable-libopus --enable-libpulse --enable-librabbitmq --enable-librsvg --enable-librubberband --enable-libshine --enable-libsnappy --enable-libsoxr --enable-libspeex --enable-libsrt --enable-libssh --enable-libtheora --enable-libtwolame --enable-libvidstab --enable-libvorbis --enable-libvpx --enable-libwavpack --enable-libwebp --enable-libx265 --enable-libxml2 --enable-libxvid --enable-libzmq --enable-libzvbi --enable-lv2 --enable-omx --enable-openal --enable-opencl --enable-opengl --enable-sdl2 --enable-pocketsphinx --enable-libmfx --enable-libdc1394 --enable-libdrm --enable-libiec61883 --enable-nvenc --enable-chromaprint --enable-frei0r --enable-libx264 --enable-shared
libavutil      56. 51.100 / 56. 51.100
libavcodec     58. 91.100 / 58. 91.100
libavformat    58. 45.100 / 58. 45.100
libavdevice    58. 10.100 / 58. 10.100
libavfilter     7. 85.100 /  7. 85.100
libavresample   4.  0.  0 /  4.  0.  0
libswscale      5.  7.100 /  5.  7.100
libswresample   3.  7.100 /  3.  7.100
libpostproc    55.  7.100 / 55.  7.100
Input #0, wav, from '${anAudioFile}':
Metadata:
    encoded_by      : REAPER
    date            : 2021-03-29
    creation_time   : 09-26-57
    time_reference  : 0
Duration: 00:01:25.82, bitrate: 128 kb/s
    Stream #0:0: Audio: pcm_s16le ([1][0][0][0] / 0x0001), 8000 Hz, 1 channels, s16, 128 kb/s
`;

const aVideoFile = 'test.mp4';
const aVideoFfProbeResult = `ffprobe version 4.3.1-4ubuntu1 Copyright (c) 2007-2020 the FFmpeg developers
built with gcc 10 (Ubuntu 10.2.0-9ubuntu2)
configuration: --prefix=/usr --extra-version=4ubuntu1 --toolchain=hardened --libdir=/usr/lib/x86_64-linux-gnu --incdir=/usr/include/x86_64-linux-gnu --arch=amd64 --enable-gpl --disable-stripping --enable-avresample --disable-filter=resample --enable-gnutls --enable-ladspa --enable-libaom --enable-libass --enable-libbluray --enable-libbs2b --enable-libcaca --enable-libcdio --enable-libcodec2 --enable-libdav1d --enable-libflite --enable-libfontconfig --enable-libfreetype --enable-libfribidi --enable-libgme --enable-libgsm --enable-libjack --enable-libmp3lame --enable-libmysofa --enable-libopenjpeg --enable-libopenmpt --enable-libopus --enable-libpulse --enable-librabbitmq --enable-librsvg --enable-librubberband --enable-libshine --enable-libsnappy --enable-libsoxr --enable-libspeex --enable-libsrt --enable-libssh --enable-libtheora --enable-libtwolame --enable-libvidstab --enable-libvorbis --enable-libvpx --enable-libwavpack --enable-libwebp --enable-libx265 --enable-libxml2 --enable-libxvid --enable-libzmq --enable-libzvbi --enable-lv2 --enable-omx --enable-openal --enable-opencl --enable-opengl --enable-sdl2 --enable-pocketsphinx --enable-libmfx --enable-libdc1394 --enable-libdrm --enable-libiec61883 --enable-nvenc --enable-chromaprint --enable-frei0r --enable-libx264 --enable-shared
libavutil      56. 51.100 / 56. 51.100
libavcodec     58. 91.100 / 58. 91.100
libavformat    58. 45.100 / 58. 45.100
libavdevice    58. 10.100 / 58. 10.100
libavfilter     7. 85.100 /  7. 85.100
libavresample   4.  0.  0 /  4.  0.  0
libswscale      5.  7.100 /  5.  7.100
libswresample   3.  7.100 /  3.  7.100
libpostproc    55.  7.100 / 55.  7.100
Input #0, mov,mp4,m4a,3gp,3g2,mj2, from '${aVideoFile}':
Metadata:
    major_brand     : isom
    minor_version   : 512
    compatible_brands: isomiso2avc1mp41
    encoder         : Lavf58.26.101
Duration: 00:04:58.89, start: 0.000000, bitrate: 900 kb/s
    Stream #0:0(und): Video: h264 (Main) (avc1 / 0x31637661), yuv420p(tv, bt709), 854x480 [SAR 1:1 DAR 427:240], 765 kb/s, 30 fps, 30 tbr, 15360 tbn, 60 tbc (default)
    Metadata:
        handler_name    : ISO Media file produced by Google Inc.
    Stream #0:1(eng): Audio: aac (LC) (mp4a / 0x6134706D), 44100 Hz, stereo, fltp, 127 kb/s (default)
    Metadata:
        handler_name    : ISO Media file produced by Google Inc.`;

describe('file information', () => {
    const aFfProbeCommand = ['ffprobe', '-i', 'test.mp3'];

    describe('when building a ffprobe command', () => {
        it('should return an array with 3 string and filename as third string', () => {
            const command = buildShellCommand(anAudioFile);

            assert.strictEqual(command.length, 3);
            assert.strictEqual(command[0], 'ffprobe');
            assert.strictEqual(command[1], '-i');
            assert.strictEqual(command[2], anAudioFile);
        });
    });

    describe('when get all information for audio file', () => {
        const execute = () => Promise.resolve(anAudioFfProbeResult);

        it('should return an instance of FileInformation', async () => {
            const shellInfos = await execute(aFfProbeCommand);
            const infos = convertShellInformation(shellInfos);

            assert.instanceOf(infos, FileInformation);
        });

        it(`should return "${anAudioFile}" as from`, async () => {
            const shellInfos = await execute(aFfProbeCommand);
            const infos = convertShellInformation(shellInfos);

            assert.strictEqual(infos.from, anAudioFile);
        });

        it(`should return "128 kb/s" as bitrate`, async () => {
            const shellInfos = await execute(aFfProbeCommand);
            const infos = convertShellInformation(shellInfos);

            assert.strictEqual(infos.audio.bitrate, '128 kb/s');
        });
    });

    describe('when get all information for video file', () => {
        const execute = () => Promise.resolve(aVideoFfProbeResult);

        it('should return an instance of FileInformation', async () => {
            const shellInfos = await execute(aFfProbeCommand);
            const infos = convertShellInformation(shellInfos);

            assert.instanceOf(infos, FileInformation);
        });

        it(`should return "${aVideoFile}" as from`, async () => {
            const shellInfos = await execute(aFfProbeCommand);
            const infos = convertShellInformation(shellInfos);

            assert.strictEqual(infos.from, aVideoFile);
        });

        it(`should return "854x480" as resolution`, async () => {
            const shellInfos = await execute(aFfProbeCommand);
            const infos = convertShellInformation(shellInfos);

            assert.strictEqual(infos.video.resolution, '854x480');
        });
    });
});
