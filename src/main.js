import { createApp } from 'vue'
import App from './App.vue'


createApp(App).directive('uppercase', {
    updated(el) {
        el.value = el.value.toUpperCase();
    }
}).mount('#app')
