const KerasJS = require('../lib/keras')
import Vue from 'vue'

var app = new Vue({
    el: '#app',
    data: {
        modelLoading: true,
        message: 'hello world',
        model: new KerasJS.Model({
            filepaths: {
                model: 'model/model.json',
                weights: 'model/model_weights.buf',
                metadata: 'model/model_metadata.json',
            },
            gpu: true
        }),
        inputImageURL: 'sample-data/test_image.png',
        grayscaleImageURL: ''
    },
    methods: {
        inputImageLoad: function() {
            this.grayscaleImageURL = this.grayscale(this.inputImageURL);
        },
        grayscale: function(imageURL) {
            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");
            var img = new Image();
            img.src = imageURL;
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            var pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
            for (var y = 0; y < pixels.height; y++) {
                for (var x = 0; x < pixels.width; x++) {
                    var i = (y * 4) * pixels.width + x * 4;
                    var rgb = parseInt((pixels.data[i] + pixels.data[i + 1] + pixels.data[i + 2]) / 3, 10);
                    pixels.data[i] = rgb;
                    pixels.data[i + 1] = rgb;
                    pixels.data[i + 2] = rgb;
                }
            }
            ctx.putImageData(pixels, 0, 0, 0, 0, pixels.width, pixels.height);
            return canvas.toDataURL();
        }
    },
    computed: {
        loadingProgress: function() {
            return this.model.getLoadingProgress();
        }
    }
})