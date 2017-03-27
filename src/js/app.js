const KerasJS = require('../lib/keras')
import Vue from 'vue'
import ndarray from 'ndarray';
import ops from 'ndarray-ops';

import CharListFile from  '../char_list.json'

var app = new Vue({
    el: '#app',
    data: {
        modelLoading: true,
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
            lineMaxNum: '-',
            progressLineNum: '-',
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
            img.onload = function() {
                var ctx = canvas.getContext("2d");
                canvas.width = (24 + 17) + img.width + (24 + 17);
                canvas.height = 24 + img.height + 24;
                ctx.fillStyle = "white";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 24 + 17, 24);
                this.grayscaleImage.URL = canvas.toDataURL();
            }.bind(this);
            img.src = canvas.toDataURL();
        },
        canvasResize: function(canvas, scale_ratio) {
            var img = new Image();
            img.onload = function() {
                var ctx = canvas.getContext("2d");
                canvas.width *= scale_ratio;
                canvas.height *= scale_ratio;
                ctx.scale(scale_ratio, scale_ratio);
                ctx.drawImage(img, 0, 0);
                this.canvasAddMargin(canvas);
            }.bind(this);
            img.src = canvas.toDataURL();
        },
        grayscale: function(imageURL) {
            try {
                // get image
                var canvas = document.createElement("canvas");
                var img = new Image();
                img.onload = function() {
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
                            var i = (y * 4) * pixels.width + x * 4;
                            var rgb = parseInt((pixels.data[i] + pixels.data[i + 1] + pixels.data[i + 2]) / 3, 10);
                            pixels.data[i] = rgb;
                            pixels.data[i + 1] = rgb;
                            pixels.data[i + 2] = rgb;
                        }
                    }
                    ctx.putImageData(pixels, 0, 0);
                    // update scale
                    let scale_ratio = this.outputAA.width / img.width;
                    this.canvasResize(canvas, scale_ratio);
                }.bind(this);
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
                // clear output AA
                this.resultAA = '';
                // get input data
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
                let dataSourceTensor = ndarray(new Float32Array(pixels.data), [pixels.width, pixels.height, 4]);
                // console.log('dataSourceTensor', dataSourceTensor)
                // normalization (0.0 ~ 1.0)
                let dataTensor = ndarray(new Float32Array(pixels.width * pixels.height), [pixels.width, pixels.height, 1]);
                ops.assign(dataTensor.pick(null, null, 0), dataSourceTensor.pick(null, null, 0))
                // console.log('dataTensor', dataTensor)
                ops.divseq(dataTensor, 255);
                // console.log('dataTensor', dataTensor)
                // calc AA line count
                let lineNum = Math.floor((pixels.height - 48) / 18);
                this.outputAA.lineMaxNum = lineNum;
                console.log('line count', lineNum);

                // wait until model is ready
                await this.model.ready();
                console.log('model ready!');

                let float32concat = function(first, second) {
                    let result = new Float32Array(first.length + second.length);
                    result.set(first);
                    result.set(second, first.length);
                    return result;
                };

                // loop each line
                for (var i = 0; i < lineNum; i++) {
                    // update progress
                    this.outputAA.progressLineNum = i;
                    // reshape lineImage
                    let lineImage =
                        dataTensor.data.slice(
                            i * dataTensor.shape[0],
                            (i + 64) * dataTensor.shape[0]);
                    // console.log('lineImage', lineImage);
                    this.updatePreviewLineImage(lineImage, dataTensor.shape[0], 64);

                    let start = 0;
                    let end = 64;
                    let penalty = 1;

                    let width = 64;
                    while (end <= dataTensor.shape[0]) {
                        // update line progress
                        this.outputAA.linePercentage = Math.floor(end / dataTensor.shape[0] * 100);
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
                        await this.sleep(16);
                    }
                    this.resultAA += '\n';
                }
            } catch (err) {
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
        }
    }
})