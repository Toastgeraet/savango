import { createApp } from 'vue'
import Vue3TouchEvents from 'vue3-touch-events';
import App from './App.vue'

let app = createApp(App);
app.use(Vue3TouchEvents);
app.mount('#app');
