// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import MobileExplanation from '@/views/application.vue';
import Dashboard from '@/views/dashboard.vue';
import GroupManagement from '@/views/GroupManagement.vue';
import NosDepensesComponent from '@/views/NosDepensesComponent.vue';
import RemboursementComponent from '@/views/RemboursementComponent.vue';
import SoldeComponent from '@/views/SoldeComponent.vue';
import MessagerieComponent from '@/views/MessagerieComponent.vue';
import StatistiqueComponent from '@/views/StatistiqueComponent.vue';
import MonProfilComponent from '@/views/MonProfilComponent.vue';
import Sidebar from '@/components/Sidebar.vue';


const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/application', name: 'MobileExplanation', component: MobileExplanation },
  { path: '/dashboard', name: 'Dashboard',  component: Dashboard },
  { path: '/group-management',name: 'GroupManagement',component: GroupManagement,},
  { path: '/nos-depenses',name: 'Nos Depenses',component: NosDepensesComponent,},
  { path: '/remboursement',name: 'Remboursement', component: RemboursementComponent,},
  { path: '/solde',name: 'Solde', component: SoldeComponent,}, // Remplacez SoldeComponent par le composant réel},
  { path: '/messagerie',name: 'Messagerie',component: MessagerieComponent,},
  { path: '/statistique',name: 'Statistique',component: StatistiqueComponent,},
  { path: '/mon-profil',name: 'Mon profil',component: MonProfilComponent,},
  { path: '/sidebar',name: 'Sidebar',component: Sidebar,},

    // ...
  
  
  // Ajoutez d'autres routes au besoin
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
