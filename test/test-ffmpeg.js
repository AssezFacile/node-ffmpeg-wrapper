const fs = {};
const execution = {};

const { assert, expect } = require('chai');
const { FileInformation } = require('../library/models/file-information');
const { FFmpeg } = require('proxyquire')('../library/modules/ffmpeg', {
    'fs': fs,
    './shell-execution': execution,
});

const aAudioFile = 'test.wav';
const aVideoFile = 'test.mp4';
const aSourceFfProbeResult = `ffprobe version 4.3.1-4ubuntu1 Copyright (c) 2007-2020 the FFmpeg developers
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
Input #0, mov,mp4,m4a,3gp,3g2,mj2, from '${aAudioFile}':
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


describe('ffmpeg', () => {
    describe('when generate a new instance', () => {
        it('with existing file should return an error', () => {
            fs.existsSync = () => true;

            expect(() => new FFmpeg(aAudioFile)).not.to.throw();
        });

        it('with not existing file should return an error', () => {
            fs.existsSync = () => false;

            expect(() => new FFmpeg(aAudioFile)).to.throw('Your file does not exist');
        });
    });

    describe('when get file information', () => {
        it('should return an instance of FileInformation', async () => {
            fs.existsSync = () => true;
            execution.execute = () => Promise.resolve(aSourceFfProbeResult);

            const ffmpeg = new FFmpeg(aAudioFile);
            const fileInformation = await ffmpeg.getFileInformation();

            assert.instanceOf(fileInformation, FileInformation);
        });
    });

    describe('when save is executed', () => {
        it('with output file should return the output file path', (done) => {
            const aOutputFile = 'output.webm';
            fs.existsSync = () => true;
            fs.rename = (file, output, callback) => { callback(); };
            
            new FFmpeg(aVideoFile).save(aOutputFile).then((filePath) => {
                assert.strictEqual(aOutputFile, filePath);
                done();
            }).catch(() => {
                done(new Error('Expected method to be accepted'));
            });
        });

        it('without output file should return the output file path', (done) => {
            fs.existsSync = () => true;
            fs.rename = (file, output, callback) => { callback(); };
            
            new FFmpeg(aVideoFile).save().then((filePath) => {
                assert.strictEqual(aVideoFile, filePath);
                done();
            }).catch(() => {
                done(new Error('Expected method to be accepted'));
            });
        });

        it('with error from fs.rename should return an error', (done) => {
            fs.existsSync = () => true;
            fs.rename = (file, output, callback) => { callback('File cannot be save'); };
            
            new FFmpeg(aVideoFile).save().then((filePath) => {
                done(new Error('Expected method to be rejected'));
            }).catch(() => {
                done();
            });
        });
    });

    describe('when multiple is executed', () => {
        it('should execute all method', (done) => {
            fs.existsSync = () => true;
            fs.rename = (file, output, callback) => { callback(); };
            
            new FFmpeg(aVideoFile).multiple(
                ['convertAudioToStandardOggFormat'],
                ['convertVideo', '.webm'],
                ['save']
            ).then((filePath) => {
                assert.strictEqual(filePath, aVideoFile);
                done();
            }).catch(() => {
                done(new Error('Expected method to be accepted'));
            });
        });
    });

    describe('when custom command is executed', () => {
        it('should return an instance of FFmpeg', async () => {
            const aCommand = ['ffmpeg', '-i', 'test.mp4', 'test.webm'];
            const ffmpeg = new FFmpeg(aVideoFile);
            const result = await ffmpeg.executeCustomCommand(aCommand);

            assert.instanceOf(result, FFmpeg);
        });
    });

    describe('when set volume', () => {
        beforeEach(() => {
            fs.existsSync = () => true;
            execution.execute = () => Promise.resolve('ok');
        });

        it('with an integer should return an instance of FFmpeg', async () => {
            const ffmpeg = new FFmpeg(aAudioFile);
            const result = await ffmpeg.setVolume(2);

            assert.instanceOf(result, FFmpeg);
        });

        it('with an float should return an instance of FFmpeg', async () => {
            const ffmpeg = new FFmpeg(aAudioFile);
            const result = await ffmpeg.setVolume(0.5);

            assert.instanceOf(result, FFmpeg);
        });

        it('without a number should return an error', (done) => {
            const ffmpeg = new FFmpeg(aAudioFile);

            ffmpeg.setVolume('2').then(() => {
                done(new Error('Expected method to be rejected'));
            }).catch(() => done());
        });
    });

    describe('when convert audio', () => {
        const anExtension = '.mp3';
        beforeEach(() => {
            fs.existsSync = () => true;
            execution.execute = () => Promise.resolve('ok');
        });

        it('should return an instance of FFmpeg', async () => {
            const ffmpeg = new FFmpeg(aAudioFile);
            const result = await ffmpeg.convertAudio(anExtension);

            assert.instanceOf(result, FFmpeg);
            assert.strictEqual(result.source.indexOf(anExtension) > -1, true);
        });
    });

    describe('when convert video', () => {
        const anExtension = '.webm';
        beforeEach(() => {
            fs.existsSync = () => true;
            execution.execute = () => Promise.resolve('ok');
        });

        it('should return an instance of FFmpeg', async () => {
            const ffmpeg = new FFmpeg(aVideoFile);
            const result = await ffmpeg.convertVideo(anExtension);

            assert.instanceOf(result, FFmpeg);
            assert.strictEqual(result.source.indexOf(anExtension) > -1, true);
        });
    });

    describe('when change video size', () => {
        beforeEach(() => {
            fs.existsSync = () => true;
            execution.execute = () => Promise.resolve('ok');
        });

        it('should return an instance of FFmpeg', async () => {
            const aSize = 'hd720';
            const ffmpeg = new FFmpeg(aVideoFile);
            const result = await ffmpeg.changeSize(aSize);

            assert.instanceOf(result, FFmpeg);
        });
    });

    describe('when extracting part of video', () => {
        beforeEach(() => {
            fs.existsSync = () => true;
            execution.execute = () => Promise.resolve('ok');
        });

        it('should return an instance of FFmpeg', async () => {
            const aStartingTime = '00:01:00';
            const aDuration = 10;
            const ffmpeg = new FFmpeg(aVideoFile);
            const result = await ffmpeg.extractPart(aStartingTime, aDuration);

            assert.instanceOf(result, FFmpeg);
        });
    });

    describe('when removing audio', () => {
        beforeEach(() => {
            fs.existsSync = () => true;
            execution.execute = () => Promise.resolve('ok');
        });

        it('should return an instance of FFmpeg', async () => {
            const ffmpeg = new FFmpeg(aVideoFile);
            const result = await ffmpeg.removeAudio();

            assert.instanceOf(result, FFmpeg);
        });
    });

    describe('when removing video', () => {
        beforeEach(() => {
            fs.existsSync = () => true;
            execution.execute = () => Promise.resolve('ok');
        });

        it('should return an instance of FFmpeg', async () => {
            const ffmpeg = new FFmpeg(aVideoFile);
            const result = await ffmpeg.removeVideo();

            assert.instanceOf(result, FFmpeg);
            assert.strictEqual(result.source.indexOf('.mp3') > -1, true);
        });
    });
});
