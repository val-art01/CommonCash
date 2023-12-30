import './assets/style/style.css'

import { createApp } from 'vue'
import App from './views/Home.vue'
import router from './routes'; // Importez le routeur

createApp(App).mount('#app')

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router, // Utilisez le routeur dans l'instance Vue
}).$mount('#app');
