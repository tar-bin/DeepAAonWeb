// JS Module
import * as KerasJS from 'keras-js'
import ndarray from 'ndarray'
import ops from 'ndarray-ops'
import Vue from 'vue'
import Clipboard from 'clipboard/dist/clipboard.min.js'

// JSON
import CharListFile from '../char_list.json'

// clipboard.js
new Clipboard('.btn');

const VueTitle = new Vue({
    el: 'title',
    data: {
        progress: 0
    },
    computed: {
        title: function () {
            if (this.progress !== 0) {
                return '[' + this.progress + '%] DeepAA on Web';
            } else {
                return 'DeepAA on Web';
            }
        }
    }
});

// Vue.js
new Vue({
    el: '#app',
    data: {
        modelLoading: true,
        modelInitializing: true,
        modelLoadingProgress: 0,
        modelInitProgress: 0,
        modelRunning: false,
        modelInterrupt: false,
        convertPromise: undefined,
        charListFile: CharListFile,
        inputImage: {
            URL: 'sample-data/test_image.png',
            width: 0,
            height: 0
        },
        grayscaleImage: {
            URL: '',
            width: 0,
            height: 0
        },
        previewLineImage: {
            width: 632,
            patchGuidePosX: 0
        },
        outputAA: {
            maxLineNum: '-',
            currentLineNum: '-',
            totalPercentage: 0,
            linePercentage: 0,
            width: 550,
        },
        resultAA: {
            text: '',
            rows: 8
        },
        highSpeedMode: false
    },
    created: function () {
        this.model = new KerasJS.Model({
            filepath: 'model/model_v2.bin',
            gpu: true
        });

        this.model.events.on('loadingProgress', this.handleLoadingProgress);
        this.model.events.on('initProgress', this.handleInitProgress);
    },
    methods: {
        handleLoadingProgress(progress) {
            this.modelLoadingProgress = Math.round(progress);
            if (progress === 100) {
                this.modelLoading = false;
            }
        },
        handleInitProgress(progress) {
            this.modelInitProgress = Math.round(progress);
            if (progress === 100) {
                this.modelInitializing = false;
            }
        },
        onFileChange: function (e) {
            const files = e.target.files || e.dataTransfer.files;
            if (!files.length) {
                return;
            }
            this.createImage(files[0]);
        },
        createImage: function (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.inputImage.URL = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        canvasResize: function (canvas, scale_ratio) {
            return new Promise(resolve => {
                const img = new Image();
                img.onload = () => {
                    const ctx = canvas.getContext("2d");
                    canvas.width *= scale_ratio;
                    canvas.height *= scale_ratio;
                    ctx.scale(scale_ratio, scale_ratio);
                    ctx.drawImage(img, 0, 0);
                    // update grayscaleImage info
                    this.grayscaleImage.width = canvas.width;
                    this.grayscaleImage.height = canvas.height;
                    resolve(canvas.toDataURL());
                };
                img.src = canvas.toDataURL();
            });
        },
        grayscale: function (imageURL) {
            return new Promise(resolve => {
                try {
                    // get image
                    const canvas = document.createElement("canvas");
                    const img = new Image();
                    img.onload = async () => {
                        const ctx = canvas.getContext("2d");
                        canvas.width = img.width;
                        canvas.height = img.height;
                        // draw image to canvas
                        ctx.drawImage(img, 0, 0);
                        // get image data
                        const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
                        // update input image info
                        this.inputImage.width = img.width;
                        this.inputImage.height = img.height;
                        // grayscaling
                        for (let y = 0; y < pixels.height; y++) {
                            for (let x = 0; x < pixels.width; x++) {
                                // sampling pixel(RGBA)
                                const pos = (y * pixels.width + x) * 4;
                                // RGB to grayscale color
                                const grayScalePixelColor = parseInt(
                                    0.299 * pixels.data[pos] +
                                    0.587 * pixels.data[pos + 1] +
                                    0.114 * pixels.data[pos + 2], 10);
                                // update pixel data
                                pixels.data[pos] = grayScalePixelColor; // R
                                pixels.data[pos + 1] = grayScalePixelColor; // G
                                pixels.data[pos + 2] = grayScalePixelColor; // B
                                pixels.data[pos + 3] = 255;                 // A
                            }
                        }
                        ctx.putImageData(pixels, 0, 0);
                        // update scale
                        let scale_ratio = this.outputAA.width / img.width;
                        const dataUrl = await this.canvasResize(canvas, scale_ratio);
                        resolve(dataUrl);
                    };
                    img.src = imageURL;
                } catch (err) {
                    console.error('grayscale: ', err.message);
                    this.resultAA = err.message;
                }
            });
        },
        inputImageUpdate: async function () {
            this.grayscaleImage.URL = await this.grayscale(this.inputImage.URL);
        },
        onLoadInputImage: function () {
            this.inputImageUpdate();
        },
        onClickInputImageWidth: function () {
            this.inputImageUpdate();
        },
        canvasAddMargin: function () {
            return new Promise(resolve => {
                const canvas = document.createElement("canvas");
                const img = new Image();
                img.onload = () => {
                    const ctx = canvas.getContext("2d");
                    canvas.width = 24 + img.width + (15 + 24);
                    canvas.height = 24 + img.height + (17 + 24);
                    ctx.fillStyle = "white";
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 24, 24);
                    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    resolve(pixels);
                };
                img.src = this.grayscaleImage.URL;
            });
        },
        convertAA: async function () {
            return new Promise(async resolve => {
                this.modelRunning = true;
                // reset status
                this.resultAA.text = '';
                this.outputAA.totalPercentage = 0;
                this.outputAA.linePercentage = 0;

                // get input data
                let dataTensor = undefined;
                let maxLineNum = undefined;
                {
                    const pixels = await this.canvasAddMargin();
                    // convert ndarray (width * height * RGBA)
                    const dataSourceTensor = ndarray(new Float32Array(pixels.data), [pixels.width, pixels.height, 4]);
                    dataTensor = ndarray(new Float32Array(pixels.width * pixels.height), [pixels.width, pixels.height, 1]);
                    // pick grayscale data (pick each 'R' data)
                    ops.assign(dataTensor.pick(null, null, 0), dataSourceTensor.pick(null, null, 0));
                    // normalization (0.0 ~ 1.0)
                    ops.divseq(dataTensor, 255);
                    // calc AA line count
                    maxLineNum = Math.floor((pixels.height - 48) / 18);
                    this.outputAA.maxLineNum = maxLineNum;
                    this.resultAA.rows = maxLineNum + 1;
                    // update line preview canvas size
                    this.previewLineImage.width = pixels.width;
                    // update screen
                    await this.setInterval(16);
                }

                const float32concat = function (first, second) {
                    let result = new Float32Array(first.length + second.length);
                    result.set(first);
                    result.set(second, first.length);
                    return result;
                };

                const PERLINE = 1 / maxLineNum;
                const updateProgress = (currentLineNum, end) => {
                    this.outputAA.currentLineNum = currentLineNum;
                    this.outputAA.linePercentage =
                        Math.floor(end / dataTensor.shape[0] * 100);
                    this.outputAA.totalPercentage =
                        Math.floor(PERLINE * (currentLineNum + end / dataTensor.shape[0]) * 100);
                };

                const getInterval = () => {
                    if (this.highSpeedMode) {
                        return this.setInterval(1);
                    } else {
                        return this.setInterval(16);
                    }
                };

                // loop each line
                for (let i = 0; i < maxLineNum; i++) {
                    // reshape lineImage
                    let lineImage =
                        dataTensor.data.slice(
                            (i * 18) * dataTensor.shape[0],
                            ((i * 18) + 64) * dataTensor.shape[0]);

                    let pLineImage = this.updatePreviewLineImage(lineImage);

                    let start = 0;
                    let end = 64;
                    let penalty = 1;

                    let width = 64;
                    while (end <= dataTensor.shape[0]) {
                        // set timeout
                        let timeout = getInterval();
                        // update line progress
                        updateProgress(i, end);
                        // reshape
                        let patch_data = new Float32Array([]);
                        for (let j = 0; j < 64; j++) {
                            let line_data = lineImage.slice(
                                (j * dataTensor.shape[0]) + start,
                                (j * dataTensor.shape[0]) + end);
                            patch_data = float32concat(patch_data, line_data);
                        }

                        let patch = ndarray(new Float32Array(patch_data), [64, 64]);

                        let pPatchImage = this.updatePreviewPatchImage(patch.data);

                        let pKerasPredict = this.model.predict({'input_1': patch.data})
                            .then(value => {
                                let y = ndarray(value.predictions);
                                if (penalty === 1) {
                                    y.set(1, 0);
                                }

                                let resultCharIndex = ops.argmax(y);
                                let char = this.charListFile[resultCharIndex][0];
                                let charWidth = this.charListFile[resultCharIndex][1];

                                this.resultAA.text += char;

                                start += charWidth;
                                end += charWidth;

                                if (resultCharIndex === 1) {
                                    penalty = 1;
                                } else {
                                    penalty = 0;
                                }

                                this.previewLineImage.patchGuidePosX = start;
                            });

                        // interrupt
                        if (this.modelInterrupt) {
                            this.modelRunning = false;
                            this.modelInterrupt = false;
                            resolve();
                            return;
                        }

                        // update preview image
                        await Promise.all([
                            pKerasPredict,
                            pPatchImage,
                            timeout
                        ]);
                    }
                    this.resultAA.text += '\n';
                    await pLineImage;
                }
                // finish
                this.outputAA.currentLineNum = maxLineNum;
                this.outputAA.linePercentage = 100;
                this.outputAA.totalPercentage = 100;
                this.modelRunning = false;
                resolve();
            });
        },
        onClickConvertAAStart: async function () {
            try {
                // wait until model is ready
                await this.model.ready();
                // check convert task is allready running
                if (this.modelRunning) {
                    this.modelInterrupt = true;
                    console.log('wait until stopped current process');
                    await this.convertPromise;
                }
                // convert start
                this.convertPromise = this.convertAA();
            } catch (err) {
                this.modelRunning = false;
                console.error('onClickConvertAAStart', err.message);
                this.resultAA.text = err.message;
            }
        },
        initLineImagePatchGuideRect: function () {
            const canvas = this.$refs.lineImagePatchGuideCanvas;
            const ctx = canvas.getContext("2d");
            // write blue rectangle (Patch Image Area)
            ctx.beginPath();
            ctx.strokeStyle = 'blue';
            ctx.strokeRect(0, 0, 64, 64);
            ctx.strokeRect(24, 24, 16, 16);
        },
        updatePreviewLineImage: async function (data) {
            // update canvas
            const canvas = this.$refs.lineImageCanvas;
            const ctx = canvas.getContext("2d");
            const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
            for (let y = 0; y < pixels.height; y++) {
                for (let x = 0; x < pixels.width; x++) {
                    const i = (y * 4) * pixels.width + x * 4;
                    const rgb = data[x + y * pixels.width] * 255;
                    pixels.data[i] = rgb;
                    pixels.data[i + 1] = rgb;
                    pixels.data[i + 2] = rgb;
                    pixels.data[i + 3] = 255;
                }
            }
            ctx.putImageData(pixels, 0, 0);
            // write red rectangle (Convert AA Area)
            ctx.beginPath()
            ctx.strokeStyle = 'red';
            ctx.strokeRect(24, 24, canvas.width - (24 * 2), 16);
        },
        updatePreviewPatchImage: async function (data) {
            const canvas = this.$refs.patchImageCanvas;
            const ctx = canvas.getContext("2d");
            const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
            for (let y = 0; y < pixels.height; y++) {
                for (let x = 0; x < pixels.width; x++) {
                    const i = (y * 4) * pixels.width + x * 4;
                    const rgb = data[x + y * pixels.width] * 255;
                    pixels.data[i] = rgb;
                    pixels.data[i + 1] = rgb;
                    pixels.data[i + 2] = rgb;
                    pixels.data[i + 3] = 255;
                }
            }
            ctx.putImageData(pixels, 0, 0);
            // write red rectangle (convert AA area)
            ctx.beginPath();
            ctx.strokeStyle = 'red';
            ctx.strokeRect(24, 24, 16, 16);
        },
        setInterval: async function (ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
    },
    watch: {
        'outputAA.totalPercentage': function (val, oldVal) {
            VueTitle.progress = val;
        },
        'highSpeedMode': function (val, oldVal) {
            console.debug("hs" + val);
        }
    },
    computed: {
        progressMessage: function () {
            if (this.outputAA.totalPercentage > 100) {
                return 'Complete!';
            } else {
                return this.outputAA.totalPercentage + '%';
            }
        }
    },
    mounted: function () {
        this.initLineImagePatchGuideRect();
    }
});