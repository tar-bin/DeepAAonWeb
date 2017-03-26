const KerasJS = require('../lib/keras')
import Vue from 'vue'
import ndarray from 'ndarray';
import ops from 'ndarray-ops';

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
        resultAA: ''
    },
    methods: {
        grayscale: function(imageURL) {
            try {
                // get image
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");
                var img = new Image();
                img.src = imageURL;
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
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
                // update
                ctx.putImageData(pixels, 0, 0, 0, 0, pixels.width, pixels.height);
                return [canvas.toDataURL(), pixels.width, pixels.height];
            } catch (err) {
                console.error('grayscale: ', err.message);
                this.resultAA = err.message;
                return '';
            }
        },
        inputImageLoad: function() {
            let [url, width, height] = this.grayscale(this.inputImage.URL);
            this.grayscaleImage.URL = url;
            this.grayscaleImage.width = width;
            this.grayscaleImage.height = height;
        },
        grayscaleImageLoad: async function() {
            try {
                // get input data
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                const img = new Image();
                img.src = this.grayscaleImage.URL;
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);

                // convert ndarray
                let dataTensor = ndarray(new Float32Array(pixels.data), [pixels.width, pixels.height]);
                // normalization (0.0 ~ 1.0)
                ops.divseq(dataTensor, 255);
                // calc AA line count
                let lineNum = Math.floor(pixels.height / 18);
                console.log('line count', lineNum);

                // wait until model is ready
                await this.model.ready();
                console.log('model ready!');

                // eval
                // for (var i = 0; i < lineNum; i++) {
                //     console.log(dataTensor)

                //     let lineImage = dataTensor.data.slice(i * 18, i * 18 + 64);
                //     let lineCharList = '';
                //     let start = 0;
                //     let end = 64;
                //     let penalty = 1;

                //     let width = 64;
                //     while (end <= dataTensor.shape[1]) {
                //         // lineImage.T
                //         let patch = ndarray(new Float32Array(lineImage), [1, 64, 64]);
                //         // predict
                //         const inputData = {
                //             'input_1': new Float32Array(patch.data)
                //         };
                //         const outputData = await this.model.predict(inputData);
                //         console.log(outputData);

                //         end += width;
                //         await this.sleep(100);
                //         console.log('processing: ', i, ', ', end);
                //     }
                // }
            } catch (err) {
                console.error('model: ', err.message);
                this.resultAA = err.message;
            }
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