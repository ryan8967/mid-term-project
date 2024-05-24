<!-- <template>
    <div>
        <div>Teachable Machine Image Model</div>
        <button type="button" @click="init">Start</button>
        <div id="webcam-container"></div>
        <div id="label-container"></div>
    </div>
</template>

<script>
import * as tmImage from '@teachablemachine/image';

export default {
    name: 'TeachableMachine',
    data() {
        return {
            URL: '/my_model/',  // Ensure the path starts with a slash
            model: null,
            webcam: null,
            labelContainer: null,
            maxPredictions: 0,
        };
    },
    methods: {
        async init() {
            const modelURL = this.URL + 'model.json';
            const metadataURL = this.URL + 'metadata.json';

            try {
                // Load the model and metadata
                this.model = await tmImage.load(modelURL, metadataURL);
                this.maxPredictions = this.model.getTotalClasses();

                // Convenience function to setup a webcam
                const flip = true; // whether to flip the webcam
                this.webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
                await this.webcam.setup(); // request access to the webcam
                await this.webcam.play();
                window.requestAnimationFrame(this.loop);

                // append elements to the DOM
                document.getElementById('webcam-container').appendChild(this.webcam.canvas);
                this.labelContainer = document.getElementById('label-container');
                for (let i = 0; i < this.maxPredictions; i++) { // and class labels
                    this.labelContainer.appendChild(document.createElement('div'));
                }
            } catch (error) {
                console.error('Error loading model:', error);
            }
        },
        async loop() {
            this.webcam.update(); // update the webcam frame
            await this.predict();
            window.requestAnimationFrame(this.loop);
        },
        async predict() {
            // predict can take in an image, video or canvas html element
            const prediction = await this.model.predict(this.webcam.canvas);
            for (let i = 0; i < this.maxPredictions; i++) {
                const classPrediction =
                    prediction[i].className + ': ' + prediction[i].probability.toFixed(2);
                this.labelContainer.childNodes[i].innerHTML = classPrediction;
            }
        },
    },
};
</script>

<style scoped>
/* Add any necessary styles here */
</style> -->


<!-- 
<template>
    <div>
        <div>Teachable Machine Image Model</div>
        <button type="button" @click="init">Start</button>
        <div id="webcam-container"></div>
        <div id="label-container"></div>
    </div>
</template>

<script>
// import * as tf from '@tensorflow/tfjs';
import * as tmImage from '@teachablemachine/image';

export default {
    name: 'TeachableMachine',
    data() {
        return {
            URL: '/my_model/', // 確保路徑以斜杠開頭，這樣在根目錄下尋找
            model: null,
            webcam: null,
            labelContainer: null,
            maxPredictions: 0,
        };
    },
    methods: {
        async init() {
            const modelURL = this.URL + 'model.json';
            const metadataURL = this.URL + 'metadata.json';

            try {
                // Initialize TensorFlow.js backend
                // await tf.setBackend('webgl'); // 或者 'cpu' / 'wasm'
                // await tf.setBackend('cpu');
                // await tf.ready();

                // Load the model and metadata
                this.model = await tmImage.load(modelURL, metadataURL);
                this.maxPredictions = this.model.getTotalClasses();

                // Convenience function to setup a webcam
                const flip = true; // whether to flip the webcam
                this.webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
                await this.webcam.setup(); // request access to the webcam
                await this.webcam.play();
                window.requestAnimationFrame(this.loop);

                // append elements to the DOM
                document.getElementById('webcam-container').appendChild(this.webcam.canvas);
                this.labelContainer = document.getElementById('label-container');
                for (let i = 0; i < this.maxPredictions; i++) { // and class labels
                    this.labelContainer.appendChild(document.createElement('div'));
                }
            } catch (error) {
                console.error('Error loading model:', error);
            }
        },
        async loop() {
            this.webcam.update(); // update the webcam frame
            await this.predict();
            window.requestAnimationFrame(this.loop);
        },
        async predict() {
            // predict can take in an image, video or canvas html element
            const prediction = await this.model.predict(this.webcam.canvas);
            for (let i = 0; i < this.maxPredictions; i++) {
                const classPrediction =
                    prediction[i].className + ': ' + prediction[i].probability.toFixed(2);
                this.labelContainer.childNodes[i].innerHTML = classPrediction;
            }
        },
    },
};
</script>

<style scoped>
/* Add any necessary styles here */
</style> -->


<template>
    <div>
        <div>Teachable Machine Image Model</div>
        <button type="button" @click="init">Start</button>
        <div id="webcam-container"></div>
        <div id="label-container"></div>
    </div>
</template>

<script>
export default {
    name: 'TeachableMachine',
    data() {
        return {
            model: null,
            webcam: null,
            labelContainer: null,
            maxPredictions: 0,
        };
    },
    mounted() {
        this.loadScripts()
            .then(() => {
                console.log("External scripts loaded");
            })
            .catch((error) => {
                console.error("Error loading external scripts:", error);
            });
    },
    methods: {
        loadScripts() {
            return new Promise((resolve, reject) => {
                const script1 = document.createElement('script');
                script1.src = "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest/dist/tf.min.js";
                script1.onload = () => {
                    console.log("TensorFlow.js loaded");
                    const script2 = document.createElement('script');
                    script2.src = "https://cdn.jsdelivr.net/npm/@teachablemachine/image@latest/dist/teachablemachine-image.min.js";
                    script2.onload = () => {
                        console.log("Teachable Machine loaded");
                        resolve();
                    };
                    script2.onerror = () => {
                        reject(new Error("Failed to load Teachable Machine script"));
                    };
                    document.head.appendChild(script2);
                };
                script1.onerror = () => {
                    reject(new Error("Failed to load TensorFlow.js script"));
                };
                document.head.appendChild(script1);
            });
        },
        async init() {
            try {
                // 確保 TensorFlow.js 和 Teachable Machine 庫已加載
                if (typeof window.tf === 'undefined') {
                    throw new Error('TensorFlow.js library not loaded');
                }
                if (typeof window.tmImage === 'undefined') {
                    throw new Error('Teachable Machine library not loaded');
                }

                // Initialize TensorFlow.js backend
                await window.tf.setBackend('webgl'); // 可以嘗試 'cpu' 或 'wasm'
                await window.tf.ready();

                const modelURL = './my_model/model.json';
                const metadataURL = './my_model/metadata.json';

                // Load the model and metadata
                console.log("Loading model...");
                this.model = Object.freeze(await window.tmImage.load(modelURL, metadataURL));
                console.log("Model loaded");

                this.maxPredictions = this.model.getTotalClasses();
                console.log(`Max predictions: ${this.maxPredictions}`);

                // Setup the webcam
                const flip = true;
                this.webcam = new window.tmImage.Webcam(200, 200, flip);
                await this.webcam.setup();
                await this.webcam.play();
                window.requestAnimationFrame(this.loop);

                // Append elements to the DOM
                document.getElementById('webcam-container').appendChild(this.webcam.canvas);
                this.labelContainer = document.getElementById('label-container');
                for (let i = 0; i < this.maxPredictions; i++) {
                    this.labelContainer.appendChild(document.createElement('div'));
                }
            } catch (error) {
                console.error('Error during initialization:', error);
            }
        },
        async loop() {
            this.webcam.update();
            await this.predict();
            window.requestAnimationFrame(this.loop);
        },
        async predict() {
            const prediction = await this.model.predict(this.webcam.canvas);
            for (let i = 0; i < this.maxPredictions; i++) {
                const classPrediction =
                    prediction[i].className + ': ' + prediction[i].probability.toFixed(2);
                this.labelContainer.childNodes[i].innerHTML = classPrediction;
            }
        },
    },
};
</script>

<style scoped>
/* Add any necessary styles here */
</style>