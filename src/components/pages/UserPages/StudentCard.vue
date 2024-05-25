<template>
    <div class="app-container">
        <div class="content">
            <h1>身分驗證-學生證辨識系統</h1>
            <div class="button-container">
                <button type="button" @click="init" class="mybutton">開啟攝像頭</button>
                <router-link to="/newproduct" class="mybutton">之後再驗證</router-link>
            </div>
            <div id="webcam-container" class="webcam-container"></div>
            <div id="label-container" class="labels"></div>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
    name: 'TeachableMachine',
    setup() {
        const router = useRouter();
        return { router };
    },
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
        // async predict() {
        //     const prediction = await this.model.predict(this.webcam.canvas);
        //     for (let i = 0; i < this.maxPredictions; i++) {
        //         const classPrediction =
        //             prediction[i].className + ': ' + prediction[i].probability.toFixed(2);
        //         this.labelContainer.childNodes[i].innerHTML = classPrediction;
        //     }
        // },
        async predict() {
            // const prediction = await this.model.predict(this.webcam.canvas);
            // for (let i = 0; i < this.maxPredictions; i++) {
            //     const classPrediction = prediction[i].className + ': ' + prediction[i].probability.toFixed(2);
            //     this.labelContainer.childNodes[i].innerHTML = classPrediction;
            //     if (prediction[i].className === 'studentCard' && prediction[i].probability > 0.98) {
            //         this.$router.push('/newproduct');
            //     }
            // }
            const prediction = await this.model.predict(this.webcam.canvas);
            const labels = {
                studentCard: '學生證',
                otherCard: '其他卡',
                face: '人臉',
                others: '其他'
            };
            for (let i = 0; i < this.maxPredictions; i++) {
                const classPrediction = labels[prediction[i].className] + ': ' + prediction[i].probability.toFixed(2);
                this.labelContainer.childNodes[i].innerHTML = classPrediction;
                if (prediction[i].className === 'studentCard' && prediction[i].probability > 0.99) {
                    this.webcam.stop();
                    this.$router.push('/newproduct');
                }
            }
        },
    },
};
</script>



<style scoped>
:root {
    --primary-color: #807469;
    /* Brownish color */
    --secondary-color: #fae0c0;
    /* Beige color */
    --accent-color: #ffffff;
    /* White color */
}

.app-container {
    font-family: Arial, sans-serif;
    background-color: var(--secondary-color);
    color: var(--primary-color);
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.content {
    background: var(--accent-color);
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 600px;
    text-align: center;
}

h1 {
    font-size: 24px;
    margin-bottom: 20px;
    color: var(--primary-color);
}

.button-container {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
}

.mybutton {
    background-color: #807469;
    color: var(--accent-color);
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    font-size: 16px;
    text-decoration: none;
}

.mybutton:hover {
    background-color: #6f6154;
    /* Darker shade of the primary color */
}

.webcam-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.labels {
    margin-top: 20px;
    font-size: 18px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.labels div {
    background: var(--secondary-color);
    padding: 5px 10px;
    margin: 5px 0;
    border-radius: 5px;
    width: 100%;
    max-width: 200px;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>