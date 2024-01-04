// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import MobileExplanation from '@/views/application.vue';
import Dashboard from '@/views/dashboard.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/application', name: 'MobileExplanation', component: MobileExplanation },
  { path: '/dashboard', name: 'Dashboard',  component: Dashboard },
  // Ajoutez d'autres routes au besoin
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
