<template>
  <div id="app">
   <!-- <Sidebar :drawer="drawer" @updateDrawer="updateDrawer" />-->
    <!-- Votre barre de navigation ici -->
    <navbar>
      <!--<router-link to="/" exact>Accueil</router-link>
      <router-link to="/login" exact>Connexion</router-link>
      <router-link to="/register" exact>Inscription</router-link>-->
    </navbar>
    <Header />
    <Dashboard />

    <!-- Ajoutez cette balise pour afficher le contenu de la page actuelle -->
    <router-view/>
  </div>
</template>

<script>
//import Header from "@/components/Header.vue";
//import Sidebar from "@/components/sidebar.vue"; // Assurez-vous que le chemin est correct
//import Dashboard from "@/views/dashboard.vue";

//export default {
//  components: {
//    Header,
//    Sidebar,
//    Dashboard,
//  },
//  data() {
//    return {
//      drawer: false,
//    };
//  },
//  methods: {
//    updateDrawer(value) {
//      this.drawer = value;
//    },
//  },
//};
</script>

<style>
/* Vos styles ici */
</style>

  