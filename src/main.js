import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import axios from 'axios';

document.addEventListener('DOMContentLoaded', function () {
    const token = document.querySelector('meta[name="csrf-token"]');
    if (token) {
        axios.defaults.headers.common['X-CSRF-TOKEN'] = token.getAttribute('content');
    } else {
        console.error('CSRF token not found: Check that your meta tag is correct');
    }
});

const app = createApp(App);
app.use(router);
app.mount('#app');