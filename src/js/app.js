// JS Module
import * as KerasJS from 'keras-js'
import ndarray from 'ndarray'
import ops from 'ndarray-ops'
import Vue from 'vue'
import Clipboard from 'clipboard'

// JSON
import CharListFile from  '../char_list.json'

// clipboard.js
var clipboard = new Clipboard('.btn');

clipboard.on('success', function (e) {
    console.info('Action:', e.action);
    console.info('Text:', e.text);
    console.info('Trigger:', e.trigger);

    e.clearSelection();
});

clipboard.on('error', function (e) {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
});

// Vue.js
new Vue({
    el: '#app',
    data: {
        modelLoading: true,
        modelRunning: false,
        modelInterrupt: false,
        model: new KerasJS.Model({
            filepaths: {
                model: 'model/model.json',
                weights: 'model/model_weights.buf',
                metadata: 'model/model_metadata.json',
            },
            gpu: true
        }),
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
            URL: '',
            width: 0,
            height: 0
        },
        previewPatchImage: {
            URL: '',
            width: 0,
            height: 0
        },
        outputAA: {
            maxLineNum: '-',
            currentLineNum: '-',
            totalPercentage: 0,
            linePercentage: 0,
            width: 550,
        },
        resultAA: ''
    },
    methods: {
        onFileChange: function(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length) {
                return;
            }
            this.createImage(files[0]);
        },
        createImage: function(file) {
            var image = new Image();
            var reader = new FileReader();
            reader.onload = (e) => {
                this.inputImage.URL = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        canvasAddMargin: function(canvas) {
            var img = new Image();
            img.onload = () => {
                var ctx = canvas.getContext("2d");
                canvas.width = (24 + 17) + img.width + (24 + 17);
                canvas.height = 24 + img.height + 24;
                ctx.fillStyle = "white";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 24 + 17, 24);
                this.grayscaleImage.URL = canvas.toDataURL();
            };
            img.src = canvas.toDataURL();
        },
        canvasResize: function(canvas, scale_ratio) {
            var img = new Image();
            img.onload = () => {
                var ctx = canvas.getContext("2d");
                canvas.width *= scale_ratio;
                canvas.height *= scale_ratio;
                ctx.scale(scale_ratio, scale_ratio);
                ctx.drawImage(img, 0, 0);
                this.canvasAddMargin(canvas);
            };
            img.src = canvas.toDataURL();
        },
        grayscale: function(imageURL) {
            try {
                // get image
                var canvas = document.createElement("canvas");
                var img = new Image();
                img.onload = () => {
                    var ctx = canvas.getContext("2d");
                    canvas.width = img.width;
                    canvas.height = img.height;
                    // draw image to canvas
                    ctx.drawImage(img, 0, 0);
                    // get image data
                    var pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    // update input image info
                    this.inputImage.width = img.width;
                    this.inputImage.height = img.height;
                    // grayscaling
                    for (var y = 0; y < pixels.height; y++) {
                        for (var x = 0; x < pixels.width; x++) {
                            // sampling pixel(RGBA)
                            var pos = (y * pixels.width + x) * 4;
                            // RGB to grayscale color
                            var grayScalePixelColor = parseInt(
                                0.299 * pixels.data[pos] +
                                0.587 * pixels.data[pos + 1] +
                                0.114 * pixels.data[pos + 2], 10);
                            // update pixel data
                            pixels.data[pos]     = grayScalePixelColor; // R
                            pixels.data[pos + 1] = grayScalePixelColor; // G
                            pixels.data[pos + 2] = grayScalePixelColor; // B
                            pixels.data[pos + 3] = 255;                 // A
                        }
                    }
                    ctx.putImageData(pixels, 0, 0);
                    // update scale
                    let scale_ratio = this.outputAA.width / img.width;
                    this.canvasResize(canvas, scale_ratio);
                };
                img.src = imageURL;
            } catch (err) {
                console.error('grayscale: ', err.message);
                this.resultAA = err.message;
            }
        },
        inputImageLoad: function() {
            this.grayscale(this.inputImage.URL);
        },
        grayscaleImageLoad: async function() {
            try {
                while (this.modelRunning) {
                    this.modelInterrupt = true;
                    console.log('wait until stopped current process')
                    await this.sleep(16);
                }
                this.modelRunning = true;
                this.modelInterrupt = false;
                // reset status
                this.resultAA = '';
                this.outputAA.totalPercentage = 0;
                this.outputAA.linePercentage = 0;

                // get input data
                let dataTensor = undefined;
                let MaxlineNum = undefined;
                {
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");
                    const img = new Image();
                    img.src = this.grayscaleImage.URL;
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    // update grayscaleImage info
                    this.grayscaleImage.width = img.width;
                    this.grayscaleImage.height = img.height;
                    // convert ndarray (width * height * RGBA)
                    const dataSourceTensor = ndarray(new Float32Array(pixels.data), [pixels.width, pixels.height, 4]);
                    dataTensor = ndarray(new Float32Array(pixels.width * pixels.height), [pixels.width, pixels.height, 1]);
                    // pick grayscale data
                    ops.assign(dataTensor.pick(null, null, 0), dataSourceTensor.pick(null, null, 0))
                    // normalization (0.0 ~ 1.0)
                    ops.divseq(dataTensor, 255);
                    // calc AA line count
                    MaxlineNum = Math.floor((pixels.height - 48) / 18);
                    this.outputAA.maxLineNum = MaxlineNum;
                }

                // wait until model is ready
                await this.model.ready();

                const float32concat = function(first, second) {
                    let result = new Float32Array(first.length + second.length);
                    result.set(first);
                    result.set(second, first.length);
                    return result;
                };

                const PERLINE = 1 / MaxlineNum;
                const updateProgress = (currentLineNum, end) => {
                    this.outputAA.currentLineNum = currentLineNum;
                    this.outputAA.linePercentage =
                        Math.floor(end / dataTensor.shape[0] * 100);
                    this.outputAA.totalPercentage =
                        Math.floor(PERLINE * (currentLineNum + end / dataTensor.shape[0]) * 100);
                };

                // loop each line
                for (var i = 0; i < MaxlineNum; i++) {
                    // update progress
                    // reshape lineImage
                    let lineImage =
                        dataTensor.data.slice(
                            (i * 18) * dataTensor.shape[0],
                            ((i * 18) + 64) * dataTensor.shape[0]);
                    // console.log('lineImage', lineImage);
                    this.updatePreviewLineImage(lineImage, dataTensor.shape[0], 64);

                    let start = 0;
                    let end = 64;
                    let penalty = 1;

                    let width = 64;
                    while (end <= dataTensor.shape[0]) {
                        // update line progress
                        updateProgress(i, end);
                        // reshape
                        let patch_data = new Float32Array();
                        for (var j = 0; j < 64; j++) {
                            let line_data = lineImage.slice(
                                    (j * dataTensor.shape[0]) + start,
                                    (j * dataTensor.shape[0]) + end);
                            patch_data = float32concat(patch_data, line_data);
                        }
                        // console.log('patch_data', patch_data);
                        let patch = ndarray(new Float32Array(patch_data), [64, 64]);
                        this.updatePreviewPatchImage(patch.data, 64, 64);
                        // console.log('patch', patch);
                        // predict
                        const inputData = {
                            'input_1': patch.data
                        };
                        let y = await this.model.predict(inputData);
                        y = ndarray(y.dense_1);

                        if (penalty==1) {
                           y.set(1, 0);
                        }

                        // console.log('y', y);

                        let predict = ops.argmax(y);
                        // console.log('predict', predict);
                        let char = this.charListFile[predict][0];
                        let char_width = this.charListFile[predict][1];
                        // console.log('char', '\'' + char + '\'')
                        // console.log('char_width', char_width)

                        this.resultAA += char;
                        
                        start += char_width;
                        end += char_width;

                        if (predict==1) {
                            penalty = 1;
                        } else {
                            penalty = 0;
                        }
                        if (this.modelInterrupt) {
                            this.modelRunning = false;
                            return;
                        }
                        await this.sleep(16);
                    }
                    this.resultAA += '\n';
                }
                // finish
                this.outputAA.currentLineNum = MaxlineNum;
                this.outputAA.linePercentage = 100;
                this.outputAA.totalPercentage = 100;
                this.modelRunning = false;
            } catch (err) {
                this.modelRunning = false;
                console.error('model: ', err.message);
                this.resultAA = err.message;
            }
        },
        updatePreviewLineImage: function(data, width, height) {
            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");
            canvas.width = width;
            canvas.height = height;
            var pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
            for (var y = 0; y < pixels.height; y++) {
                for (var x = 0; x < pixels.width; x++) {
                    var i = (y * 4) * pixels.width + x * 4;
                    var rgb = data[x + y * pixels.width] * 255;
                    pixels.data[i] = rgb;
                    pixels.data[i + 1] = rgb;
                    pixels.data[i + 2] = rgb;
                    pixels.data[i + 3] = 255;
                }
            }
            ctx.putImageData(pixels, 0, 0);
            this.previewLineImage.width = width;
            this.previewLineImage.height = height;
            this.previewLineImage.URL = canvas.toDataURL();
        },
        updatePreviewPatchImage: function(data, width, height) {
            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");
            canvas.width = width;
            canvas.height = height;
            var pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
            for (var y = 0; y < pixels.height; y++) {
                for (var x = 0; x < pixels.width; x++) {
                    var i = (y * 4) * pixels.width + x * 4;
                    var rgb = data[x + y * pixels.width] * 255;
                    pixels.data[i] = rgb;
                    pixels.data[i + 1] = rgb;
                    pixels.data[i + 2] = rgb;
                    pixels.data[i + 3] = 255;
                }
            }
            ctx.putImageData(pixels, 0, 0);
            this.previewPatchImage.width = width;
            this.previewPatchImage.height = height;
            this.previewPatchImage.URL = canvas.toDataURL();
        },
        sleep: async function (ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
    },
    computed: {
        loadingProgress: function() {
            return this.model.getLoadingProgress();
        },
        progressMessage: function() {
            if (this.outputAA.totalPercentage == 100) {
                return 'Complete!';
            } else {
                return this.outputAA.totalPercentage + '%';
            }
        }
    }
})