<!-- <template>
    <div>
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2918.1875327398757!2d121.19268770538548!3d24.96614566811014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346823c18e351855%3A0x9c8a1b801e403a56!2z5ZyL56uL5Lit5aSu5aSn5a245L6d5LuB5aCC!5e0!3m2!1szh-TW!2stw!4v1716683323018!5m2!1szh-TW!2stw"
            width="100%" height="450" style="border:0;" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
        </iframe>

        <div class="container">
            <h1>時間地點選擇器</h1>
            <div class="datetime-picker">
                <label for="date">日期:</label>
                <input type="date" id="date" v-model="selectedDate">

                <label for="time">時間:</label>
                <select id="time" v-model="selectedTime">
                    <option v-for="time in timeOptions" :key="time" :value="time">{{ time }}</option>
                </select>
            </div>

            <div class="location-picker">
                <label for="location">地點:</label>
                <input type="text" id="location" v-model="selectedLocation" placeholder="Enter a location">
            </div>

            <div v-if="selectedTime">
                <h2>選擇時段 {{ selectedTimeDisplay }}</h2>
            </div>

            <button @click="addTimeSlot">儲存</button>
            <button @click="confirmSelection">確認並生成EMAIL</button>

            <ul>
                <li v-for="(slot, index) in timeSlots" :key="index">
                    {{ slot.date }} {{ slot.time }} - {{ slot.location }}
                </li>
            </ul>

            <div v-if="isLoading" class="loading-overlay">
                <div class="loading-spinner"></div>
                <p>正在生成EMAIL，請稍候...</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectedDate: null,
            selectedTime: null,
            selectedLocation: '',
            timeOptions: [],
            timeSlots: [],
            isLoading: false
        };
    },
    computed: {
        selectedTimeDisplay() {
            if (!this.selectedTime) return '';
            let [hour, minute] = this.selectedTime.split(':').map(Number);
            let nextMinute = minute + 10;
            let nextHour = hour;
            if (nextMinute >= 60) {
                nextMinute -= 60;
                nextHour = (nextHour + 1) % 24;
            }
            let formattedNextHour = String(nextHour).padStart(2, '0');
            let formattedNextMinute = String(nextMinute).padStart(2, '0');
            return `${this.selectedTime} ~ ${formattedNextHour}:${formattedNextMinute}`;
        },
    },
    mounted() {
        this.generateTimeOptions();
    },
    methods: {
        generateTimeOptions() {
            const intervals = 10; // 10 minutes intervals
            for (let hour = 0; hour < 24; hour++) {
                for (let minute = 0; minute < 60; minute += intervals) {
                    let formattedHour = String(hour).padStart(2, '0');
                    let formattedMinute = String(minute).padStart(2, '0');
                    this.timeOptions.push(`${formattedHour}:${formattedMinute}`);
                }
            }
        },
        addTimeSlot() {
            if (this.selectedDate && this.selectedTime && this.selectedLocation) {
                this.timeSlots.push({
                    date: this.selectedDate,
                    time: this.selectedTimeDisplay,
                    location: this.selectedLocation
                });
                this.selectedDate = null;
                this.selectedTime = null;
                this.selectedLocation = '';
            }
        },
        confirmSelection() {
            this.isLoading = true; // 显示加载提示
            const slot = this.timeSlots[this.timeSlots.length - 1];
            const event = new CustomEvent('confirm-selection', { detail: slot });
            window.dispatchEvent(event);
        }
    }
};
</script>

<style scoped>
body {
    font-family: 'Roboto', sans-serif;
    background-color: #f4f4f9;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    padding: 20px;
}

.container {
    background-color: #fff;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    text-align: center;
    margin-top: 20px;
    position: relative;
}

h1 {
    margin-bottom: 25px;
    font-size: 24px;
    color: #333;
}

.datetime-picker,
.location-picker {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 20px;
}

label {
    font-weight: 600;
    margin-bottom: 8px;
    text-align: left;
}

input,
select {
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
}

input:focus,
select:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 6px rgba(0, 123, 255, 0.5);
}

iframe {
    display: block;
    margin: 0 auto;
    width: 100%;
    border: none;
    border-radius: 12px;
}

button {
    padding: 12px 20px;
    margin-top: 10px;
    border: none;
    border-radius: 8px;
    background-color: #007bff;
    color: white;
    font-size: 16px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

ul {
    list-style-type: none;
    padding: 0;
    margin-top: 20px;
}

li {
    background-color: #f9f9f9;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-bottom: 8px;
    text-align: left;
    font-size: 14px;
    color: #333;
}

.loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.loading-spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-top: 4px solid #007bff;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style> -->

<!-- 
<template>
    <div class="wrapper">
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2918.1875327398757!2d121.19268770538548!3d24.96614566811014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346823c18e351855%3A0x9c8a1b801e403a56!2z5ZyL56uL5Lit5aSu5aSn5a245L6d5LuB5aCC!5e0!3m2!1szh-TW!2stw!4v1716683323018!5m2!1szh-TW!2stw"
            width="100%" height="450" style="border:0;" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
        </iframe>

        <div class="container">
            <h1>時間地點選擇器</h1>
            <div class="datetime-picker">
                <label for="date">日期:</label>
                <input type="date" id="date" v-model="selectedDate">

                <label for="time">時間:</label>
                <select id="time" v-model="selectedTime">
                    <option v-for="time in timeOptions" :key="time" :value="time">{{ time }}</option>
                </select>
            </div>

            <div class="location-picker">
                <label for="location">地點:</label>
                <input type="text" id="location" v-model="selectedLocation" placeholder="Enter a location">
            </div>

            <div v-if="selectedTime">
                <h2>選擇時段 {{ selectedTimeDisplay }}</h2>
            </div>

            <button @click="addTimeSlot">儲存</button>
            <button v-if="timeSlots.length > 0" @click="confirmSelection">確認並生成EMAIL</button>

            <ul>
                <li v-for="(slot, index) in timeSlots" :key="index">
                    {{ slot.date }} {{ slot.time }} - {{ slot.location }}
                </li>
            </ul>

            <div v-if="isLoading" class="loading-overlay">
                <div class="loading-spinner"></div>
                <p>正在生成EMAIL，請稍候...</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectedDate: null,
            selectedTime: null,
            selectedLocation: '',
            timeOptions: [],
            timeSlots: [],
            isLoading: false
        };
    },
    computed: {
        selectedTimeDisplay() {
            if (!this.selectedTime) return '';
            let [hour, minute] = this.selectedTime.split(':').map(Number);
            let nextMinute = minute + 10;
            let nextHour = hour;
            if (nextMinute >= 60) {
                nextMinute -= 60;
                nextHour = (nextHour + 1) % 24;
            }
            let formattedNextHour = String(nextHour).padStart(2, '0');
            let formattedNextMinute = String(nextMinute).padStart(2, '0');
            return `${this.selectedTime} ~ ${formattedNextHour}:${formattedNextMinute}`;
        },
    },
    mounted() {
        this.generateTimeOptions();
    },
    methods: {
        generateTimeOptions() {
            const intervals = 10; // 10 minutes intervals
            for (let hour = 0; hour < 24; hour++) {
                for (let minute = 0; minute < 60; minute += intervals) {
                    let formattedHour = String(hour).padStart(2, '0');
                    let formattedMinute = String(minute).padStart(2, '0');
                    this.timeOptions.push(`${formattedHour}:${formattedMinute}`);
                }
            }
        },
        addTimeSlot() {
            if (this.selectedDate && this.selectedTime && this.selectedLocation) {
                this.timeSlots.push({
                    date: this.selectedDate,
                    time: this.selectedTimeDisplay,
                    location: this.selectedLocation
                });
                this.selectedDate = null;
                this.selectedTime = null;
                this.selectedLocation = '';
            }
        },
        confirmSelection() {
            this.isLoading = true; // 显示加载提示
            const slot = this.timeSlots[this.timeSlots.length - 1];
            const event = new CustomEvent('confirm-selection', { detail: slot });
            window.dispatchEvent(event);
        }
    }
};
</script>

<style scoped>
body {
    font-family: 'Roboto', sans-serif;
    background-color: #f4f4f9;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    padding: 20px;
}

.wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 600px;
}

.container {
    background-color: #fff;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    text-align: center;
    margin-top: 20px;
    position: relative;
}

h1 {
    margin-bottom: 25px;
    font-size: 24px;
    color: #333;
}

.datetime-picker,
.location-picker {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 20px;
}

label {
    font-weight: 600;
    margin-bottom: 8px;
    text-align: left;
}

input,
select {
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
}

input:focus,
select:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 6px rgba(0, 123, 255, 0.5);
}

iframe {
    display: block;
    margin: 0 auto;
    width: 100%;
    border: none;
    border-radius: 12px;
}

button {
    padding: 12px 20px;
    margin-top: 10px;
    border: none;
    border-radius: 8px;
    background-color: #007bff;
    color: white;
    font-size: 16px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

ul {
    list-style-type: none;
    padding: 0;
    margin-top: 20px;
}

li {
    background-color: #f9f9f9;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-bottom: 8px;
    text-align: left;
    font-size: 14px;
    color: #333;
}

.loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.loading-spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-top: 4px solid #007bff;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style> -->


<template>
    <div class="wrapper">
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2918.1875327398757!2d121.19268770538548!3d24.96614566811014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346823c18e351855%3A0x9c8a1b801e403a56!2z5ZyL56uL5Lit5aSu5aSn5a245L6d5LuB5aCC!5e0!3m2!1szh-TW!2stw!4v1716683323018!5m2!1szh-TW!2stw"
            class="map">
        </iframe>

        <div class="container">
            <h1>時間地點選擇器</h1>
            <div class="datetime-picker">
                <label for="date">日期:</label>
                <input type="date" id="date" v-model="selectedDate">

                <label for="time">時間:</label>
                <select id="time" v-model="selectedTime">
                    <option v-for="time in timeOptions" :key="time" :value="time">{{ time }}</option>
                </select>
            </div>

            <div class="location-picker">
                <label for="location">地點:</label>
                <input type="text" id="location" v-model="selectedLocation" placeholder="Enter a location">
            </div>

            <div v-if="selectedTime">
                <h2>選擇時段 {{ selectedTimeDisplay }}</h2>
            </div>

            <button @click="addTimeSlot" class="button">儲存</button>
            <button v-if="timeSlots.length > 0" @click="confirmSelection" class="button">AI智慧生成EMAIL</button>

            <ul>
                <li v-for="(slot, index) in timeSlots" :key="index">
                    {{ slot.date }} {{ slot.time }} - {{ slot.location }}
                </li>
            </ul>

            <div v-if="isLoading" class="loading-overlay">
                <div class="loading-spinner"></div>
                <p>正在AI生成EMAIL，請稍候...</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectedDate: null,
            selectedTime: null,
            selectedLocation: '',
            timeOptions: [],
            timeSlots: [],
            isLoading: false
        };
    },
    computed: {
        selectedTimeDisplay() {
            if (!this.selectedTime) return '';
            let [hour, minute] = this.selectedTime.split(':').map(Number);
            let nextMinute = minute + 10;
            let nextHour = hour;
            if (nextMinute >= 60) {
                nextMinute -= 60;
                nextHour = (nextHour + 1) % 24;
            }
            let formattedNextHour = String(nextHour).padStart(2, '0');
            let formattedNextMinute = String(nextMinute).padStart(2, '0');
            return `${this.selectedTime} ~ ${formattedNextHour}:${formattedNextMinute}`;
        },
    },
    mounted() {
        this.generateTimeOptions();
    },
    methods: {
        generateTimeOptions() {
            const intervals = 10; // 10 minutes intervals
            for (let hour = 0; hour < 24; hour++) {
                for (let minute = 0; minute < 60; minute += intervals) {
                    let formattedHour = String(hour).padStart(2, '0');
                    let formattedMinute = String(minute).padStart(2, '0');
                    this.timeOptions.push(`${formattedHour}:${formattedMinute}`);
                }
            }
        },
        addTimeSlot() {
            if (this.selectedDate && this.selectedTime && this.selectedLocation) {
                this.timeSlots.push({
                    date: this.selectedDate,
                    time: this.selectedTimeDisplay,
                    location: this.selectedLocation
                });
                this.selectedDate = null;
                this.selectedTime = null;
                this.selectedLocation = '';
            }
        },
        confirmSelection() {
            this.isLoading = true; // 显示加载提示
            const slot = this.timeSlots[this.timeSlots.length - 1];
            const event = new CustomEvent('confirm-selection', { detail: slot });
            window.dispatchEvent(event);
        }
    }
};
</script>

<style scoped>
body {
    font-family: 'Roboto', sans-serif;
    background-color: #f4f4f9;
    margin: 0;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.wrapper {
    display: flex;
    flex-direction: column;
    /*align-items: center;*/
    width: 100%;
    max-width: 800px;
}

.map {
    width: 100vw;
    height: 450px;
    border: 0;
    border-radius: 12px;
    margin-bottom: 20px;
    padding: 30px;
}

.container {
    background-color: #fff;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100vw;
    /*text-align: center;*/
}

h1 {
    margin-bottom: 25px;
    font-size: 24px;
    color: #333;
}

.datetime-picker,
.location-picker {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 20px;
}

label {
    font-weight: 600;
    margin-bottom: 8px;
    text-align: left;
}

input,
select {
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
}

input:focus,
select:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 6px rgba(0, 123, 255, 0.5);
}

.button {
    padding: 12px 20px;
    margin-top: 10px;
    border: none;
    border-radius: 8px;
    background-color: #007bff;
    color: white;
    font-size: 16px;
    cursor: pointer;
    width: 100%;
    max-width: 200px;
    margin: 10px auto;
}

.button:hover {
    background-color: #0056b3;
}

ul {
    list-style-type: none;
    padding: 0;
    margin-top: 20px;
}

li {
    background-color: #f9f9f9;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-bottom: 8px;
    text-align: left;
    font-size: 14px;
    color: #333;
}

.loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.loading-spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-top: 4px solid #007bff;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
