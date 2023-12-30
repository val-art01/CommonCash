import './assets/style/style.css'


// main.js
import { createApp } from 'vue';
import App from './app.vue';
import router from './routes'; // Assurez-vous d'importer votre fichier de routage correctement

const app = createApp(App);

app.use(router); // Utilisez Vue Router

app.mount('#app');
