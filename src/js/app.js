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
        })
    },
    computed: {
        loadingProgress: function() {
            return this.model.getLoadingProgress();
        }
    }
})