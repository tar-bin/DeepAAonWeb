<template>
  <div class="container-fluid">
    <!-- Navi bar -->
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">DeepAA on Web : Version 2.2</a>
          <div class="navbar-text" v-if="modelLoading" v-cloak>
            Model Loading...{{ modelLoadingProgress }}%
          </div>
          <div class="navbar-text" v-else-if="modelInitializing" v-cloak>
            Model Initializing...{{ modelInitProgress }}%
          </div>
        </div>
        <ul class="nav navbar-nav navbar-right">
          <li><a href="https://github.com/tar-bin/DeepAAonWeb" target="_new">DeepAAonWeb (GitHub)</a></li>
          <li><a href="https://github.com/OsciiArt/DeepAA" target="_new">DeepAA (GitHub)</a></li>
        </ul>
      </div>
    </nav>
    <!-- Main -->
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6">
      <!-- Info -->
      <div class="alert alert-info" role="alert">
        <p>・動作保証はGoogle Chromeのみです。画像を選択、加工後、Startボタンで実行してください。</p>
        <p>・選択された画像はローカルにのみ保持されます。外部サーバーには送信されません。</p>
        <p>・本ツールによって作成された生成物に関して、本ツール作者は一切の権利を主張しません。</p>
        <p>・本ツールおよびその生成物を利用したことによるいかなる損害も本ツール作者は一切の責任を負いません。</p>
        <p>・入力画像はノイズを除去した細い線画をおすすめします。画像からの線画化は以下のツール等で作成できます。</p>
        <p><a href="https://tar-bin.github.io/image-thinning-processer/"
            target="_new">https://tar-bin.github.io/image-thinning-processer/</a>
        </p>
      </div>
      <!-- Orignal Image -->
      <div class="col-xs-6 col-md-6">
        <div class="panel panel-default">
          <div class="panel-heading" v-cloak>
            Original Image {{ inputImage.width }} x {{ inputImage.height }}
          </div>
          <div class="panel-body">
            <form class="form-inline">
              <div class="form-group">
                <input type="file" @change="onFileChange">
              </div>
            </form>
            <img id="img-input" class="img-thumbnail" :src="inputImage.URL" @load="onLoadInputImage">
          </div>
        </div>
      </div>
      <!-- Input Image -->
      <div class="col-xs-6 col-md-6">
        <div class="panel panel-default">
          <div class="panel-heading" v-cloak>
            Input Image {{ grayscaleImage.width }} x {{ grayscaleImage.height }}
          </div>
          <div class="panel-body">
            <form class="form-inline" onsubmit="return false;">
              <div class="form-group">
                <label for="outputAASize">Output Width:</label>
                <input v-model="outputAA.width" type="text" class="form-control" id="outputAASize" placeholder="出力横幅"
                  maxlength="4" pattern="^[0-9]+$" required>
                <button class="btn btn-default" @click="onClickInputImageWidth">update</button>
              </div>
            </form>
            <img id="img-grayscale" class="img-thumbnail" :src="grayscaleImage.URL">
          </div>
        </div>
      </div>
    </div>
    <!-- Output AA -->
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6">
      <div class="panel panel-default">
        <div class="panel-heading">Output AA</div>
        <div class="panel-body">
          <div class="row">
            <div class="col-xs-1 col-md-1">
              <!-- Start Button -->
              <button class="btn btn-primary" @click="onClickConvertAAStart">Start</button>
            </div>
            <div class="col-xs-2 col-md-2">
              <p class="text-center" style="margin-left: 10px" v-cloak>
                {{ '[' + outputAA.currentLineNum + ' / ' + outputAA.maxLineNum + '][' + outputAA.linePercentage + '%]'
                }}
              </p>
            </div>
            <div class="col-xs-9 col-md-9">
              <div class="progress">
                <div class="progress-bar" v-bind:style="{ width: outputAA.totalPercentage + '%' }" v-cloak>
                  {{ progressMessage }}
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="checkbox" style="margin-left: 20px">
              <label>
                <input type="checkbox" id="highspeedmode" v-model="highSpeedMode">
                高速モード(高負荷)
              </label>
            </div>
          </div>
          <div class="row">
            <!-- Line Image -->
            <div class="col-xs-12 col-sm-12 col-md-10">
              <div class="panel panel-default">
                <div class="panel-heading">Line Image</div>
                <div class="panel-body" style="height: 104px">
                  <div style="position: relative">
                    <canvas class="img-thumbnail" ref="lineImageCanvas" style="position: absolute"
                      :width="previewLineImage.width" height="64"></canvas>
                    <canvas ref="lineImagePatchGuideCanvas" id="patch-guide"
                      :style="{ left: previewLineImage.patchGuidePosX  + 'px'}" width="64" height="64"></canvas>
                  </div>
                </div>
              </div>
            </div>
            <!-- Patch Image -->
            <div class="col-xs-12 col-sm-12 col-md-2">
              <div class="panel panel-default">
                <div class="panel-heading">Patch Image</div>
                <div class="panel-body">
                  <canvas class="img-thumbnail" width="64" height="64" ref="patchImageCanvas"></canvas>
                </div>
              </div>
            </div>
          </div>
          <!-- Copy Button -->
          <button class="btn btn-default" :data-clipboard-text="resultAA.text">Copy to clipboard</button>
          <!-- Result AA -->
          <textarea id="result_aa" class="form-control aa" :rows="resultAA.rows" v-model="resultAA.text"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHead } from '@unhead/vue'
import * as KerasJS from 'keras-js'
import ndarray from 'ndarray'
import ops from 'ndarray-ops'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import CharListFile from './assets/char_list.json'
import kerasModelUrl from './assets/model/model_v2.bin?url';
import sampleImageUrl from './assets/sample-data/test_image.png?url';

// Vue.js
const modelLoading = ref(true);
const modelInitializing = ref(true);
const modelLoadingProgress = ref(0);
const modelInitProgress = ref(0)
const modelRunning = ref(false);
const modelInterrupt = ref(false);
const convertPromise = ref();
const charListFile = CharListFile;
const lineImagePatchGuideCanvas = ref(null);
const lineImageCanvas = ref(null);
const patchImageCanvas = ref(null);
const inputImage = reactive({
    URL: sampleImageUrl,
    width: 0,
    height: 0
});
const grayscaleImage = reactive({
    URL: '',
    width: 0,
    height: 0
});
const previewLineImage = reactive({
    width: 632,
    patchGuidePosX: 0
});
const outputAA = reactive({
    maxLineNum: '-',
    currentLineNum: '-',
    totalPercentage: 0,
    linePercentage: 0,
    width: 550,
});
const resultAA = reactive({
    text: '',
    rows: 8
});
const highSpeedMode = ref(false);

const model = new KerasJS.Model({
    filepath: kerasModelUrl,
    gpu: true
});

watch(highSpeedMode, (val, oldVal) => {
  console.debug(`hs: ${val}`);
});

const progressMessage = computed(() => {
    if (outputAA.totalPercentage > 100) {
        return 'Complete!';
    }
    return `${outputAA.totalPercentage}%`;
});

const handleLoadingProgress = (progress) => {
    modelLoadingProgress.value = Math.round(progress);
    if (progress === 100) {
        modelLoading.value = false;
    }
};

const handleInitProgress = (progress) => {
  modelInitProgress.value = Math.round(progress);
  if (progress === 100) {
    modelInitializing.value = false;
  }
};

const onFileChange = (e) => {
    const files = e.target.files || e.dataTransfer.files;
    if (!files.length) {
        return;
    }
    createImage(files[0]);
};

const createImage = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
        inputImage.URL = e.target.result;
    };
    reader.readAsDataURL(file);
};

const canvasResize = (canvas, scale_ratio) => {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      canvas.width *= scale_ratio;
      canvas.height *= scale_ratio;
      ctx.scale(scale_ratio, scale_ratio);
      ctx.drawImage(img, 0, 0);
      // update grayscaleImage info
      grayscaleImage.width = canvas.width;
      grayscaleImage.height = canvas.height;
      resolve(canvas.toDataURL());
    };
    img.src = canvas.toDataURL();
  });
};

const grayscale = (imageURL) => {
  return new Promise(resolve => {
    try {
      // get image
      const canvas = document.createElement("canvas");
      const img = new Image();
      img.onload = async () => {
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        canvas.width = img.width;
        canvas.height = img.height;
        // draw image to canvas
        ctx.drawImage(img, 0, 0);
        // get image data
        const pixels = ctx.getImageData(0, 0, Number(canvas.width), Number(canvas.height));
        // update input image info
        inputImage.width = img.width;
        inputImage.height = img.height;
        // grayscaling
        for (let y = 0; y < pixels.height; y++) {
          for (let x = 0; x < pixels.width; x++) {
            // sampling pixel(RGBA)
            const pos = (y * pixels.width + x) * 4;
            // RGB to grayscale color
            const grayScalePixelColor = Number.parseInt(
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
        const scale_ratio = outputAA.width / img.width;
        const dataUrl = await canvasResize(canvas, scale_ratio);
        resolve(dataUrl);
      };
      img.src = imageURL;
    } catch (err) {
      console.error('grayscale: ', err.message);
      resultAA.value = err.message;
    }
  });
};

const inputImageUpdate = async () => {
    grayscaleImage.URL = await grayscale(inputImage.URL);
};

const onLoadInputImage = () => {
    inputImageUpdate();
};

const onClickInputImageWidth = () => {
    inputImageUpdate();
};

const canvasAddMargin = () => {
  return new Promise(resolve => {
    const canvas = document.createElement("canvas");
    const img = new Image();
    img.onload = () => {
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      canvas.width = 24 + img.width + (15 + 24);
      canvas.height = 24 + img.height + (17 + 24);
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 24, 24);
      const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
      resolve(pixels);
    };
    img.src = grayscaleImage.URL;
  });
};

const convertAA = async () => {
  // biome-ignore lint/suspicious/noAsyncPromiseExecutor: <explanation>
  return new Promise(async resolve => {
    modelRunning.value = true;
    // reset status
    resultAA.text = '';
    outputAA.totalPercentage = 0;
    outputAA.linePercentage = 0;

    // get input data
    let dataTensor = undefined;
    let maxLineNum = undefined;
    {
      const pixels = await canvasAddMargin();
      // convert ndarray (width * height * RGBA)
      const dataSourceTensor = ndarray(new Float32Array(pixels.data), [pixels.width, pixels.height, 4]);
      dataTensor = ndarray(new Float32Array(pixels.width * pixels.height), [pixels.width, pixels.height, 1]);
      // pick grayscale data (pick each 'R' data)
      ops.assign(dataTensor.pick(null, null, 0), dataSourceTensor.pick(null, null, 0));
      // normalization (0.0 ~ 1.0)
      ops.divseq(dataTensor, 255);
      // calc AA line count
      maxLineNum = Math.floor((pixels.height - 48) / 18);
      outputAA.maxLineNum = maxLineNum;
      resultAA.rows = maxLineNum + 1;
      // update line preview canvas size
      previewLineImage.width = pixels.width;
      // update screen
      await setInterval(16);
    }

    const float32concat = (first, second) => {
      const result = new Float32Array(first.length + second.length);
      result.set(first);
      result.set(second, first.length);
      return result;
    };

    const PERLINE = 1 / maxLineNum;
    const updateProgress = (currentLineNum, end) => {
      outputAA.currentLineNum = currentLineNum;
      outputAA.linePercentage =
        Math.floor(end / dataTensor.shape[0] * 100);
      outputAA.totalPercentage =
        Math.floor(PERLINE * (currentLineNum + end / dataTensor.shape[0]) * 100);
    };

    const getInterval = () => {
      if (highSpeedMode.value) {
        return setInterval(1);
      }
      return setInterval(16);
    };

    // loop each line
    for (let i = 0; i < maxLineNum; i++) {
      // reshape lineImage
      const lineImage =
        dataTensor.data.slice(
          (i * 18) * dataTensor.shape[0],
          ((i * 18) + 64) * dataTensor.shape[0]);

      const pLineImage = updatePreviewLineImage(lineImage);

      let start = 0;
      let end = 64;
      let penalty = 1;

      while (end <= dataTensor.shape[0]) {
        // set timeout
        const timeout = getInterval();
        // update line progress
        updateProgress(i, end);
        // reshape
        let patch_data = new Float32Array([]);
        for (let j = 0; j < 64; j++) {
          const line_data = lineImage.slice(
            (j * dataTensor.shape[0]) + start,
            (j * dataTensor.shape[0]) + end);
          patch_data = float32concat(patch_data, line_data);
        }

        const patch = ndarray(new Float32Array(patch_data), [64, 64]);

        const pPatchImage = updatePreviewPatchImage(patch.data);

        const pKerasPredict = model.predict({ 'input_1': patch.data })
          .then(value => {
            const y = ndarray(value.predictions);
            if (penalty === 1) {
              y.set(1, 0);
            }

            const resultCharIndex = ops.argmax(y);
            const char = charListFile[resultCharIndex][0];
            const charWidth = charListFile[resultCharIndex][1];

            resultAA.text += char;

            start += charWidth;
            end += charWidth;

            if (resultCharIndex === 1) {
              penalty = 1;
            } else {
              penalty = 0;
            }

            previewLineImage.patchGuidePosX = start;
          });

        // interrupt
        if (modelInterrupt.value) {
          modelRunning.value = false;
          modelInterrupt.value = false;
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
      resultAA.text += '\n';
      await pLineImage;
    }
    // finish
    outputAA.currentLineNum = maxLineNum;
    outputAA.linePercentage = 100;
    outputAA.totalPercentage = 100;
    modelRunning.value = false;
    resolve();
  });
};

const onClickConvertAAStart = async () => {
    try {
        // wait until model is ready
        await model.ready();
        // check convert task is allready running
        if (modelRunning.value) {
            modelInterrupt.value = true;
            console.log('wait until stopped current process');
            await convertPromise.value;
        }
        // convert start
        convertPromise.value = convertAA();
    } catch (err) {
        modelRunning.value = false;
        console.error('onClickConvertAAStart', err.message);
        resultAA.text = err.message;
    }
};

const initLineImagePatchGuideRect = () => {
    const canvas = lineImagePatchGuideCanvas.value;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    // write blue rectangle (Patch Image Area)
    ctx.beginPath();
    ctx.strokeStyle = 'blue';
    ctx.strokeRect(0, 0, 64, 64);
    ctx.strokeRect(24, 24, 16, 16);
};

const updatePreviewLineImage = async (data) => { 
  // update canvas
  const canvas = lineImageCanvas.value;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
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
};

const updatePreviewPatchImage = async (data) => {
  const canvas = patchImageCanvas.value;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
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
};

const setInterval = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

model.events.on('loadingProgress', handleLoadingProgress);
model.events.on('initProgress', handleInitProgress);

onMounted(() => {
  initLineImagePatchGuideRect();
});

useHead({
  title: outputAA.totalPercentage !== 0 ? `[${outputAA.totalPercentage}%] DeepAA on Web` : 'DeepAA on Web'
})
</script>

<style scoped>
@font-face {
  font-family: 'Saitamaar';
  src: url('assets/fonts/Saitamaar.woff2') format('woff2'),
    url('assets/fonts/Saitamaar.eot') format('eot'),
    url('assets/fonts/Saitamaar.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

.aa {
  font-family: 'ＭＳ Ｐゴシック', 'MS PGothic', 'Saitamaar', serif !important;
  line-height: 18px;
  font-size: 16px;
}

body {
  padding-top: 70px;
}

.progress-bar {
  -webkit-transition: none !important;
  transition: none !important;
}

#patch-guide {
  position: absolute;
  background-color: transparent;
}

[v-cloak] {
  display: none;
}
</style>
