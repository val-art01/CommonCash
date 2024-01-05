// main.js
import { createApp } from 'vue';
import App from './app.vue';
import router from './routes';
import 'vuetify/styles'; // Assurez-vous d'importer correctement les styles de Vuetify
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Créez l'application Vue
const app = createApp(App);

// Utilisez Vue Router
app.use(router);

// Utilisez Vuetify avec la configuration des composants et directives
const vuetify = createVuetify({
  components,
  directives,
});

// Utilisez Vuetify avec l'application Vue
app.use(vuetify);

// Montez l'application sur l'élément avec l'ID 'app'
app.mount('#app');



