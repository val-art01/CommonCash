<template>
    <div id="app">
      <!-- Votre barre de navigation ici -->
      <navbar>
        <!--<router-link to="/" exact>Accueil</router-link>
        <router-link to="/login" exact>Connexion</router-link>
        <router-link to="/register" exact>Inscription</router-link>-->
      </navbar>
  
      <!-- Ajoutez cette balise pour afficher le contenu de la page actuelle -->
      <router-view/>
    </div>
  </template>
  
  <script>
  /*import Navbar from '@/components/Navbar.vue';
  
  export default {
    components: {
      Navbar,
    },
  };*/
  </script>
  
  <style>
  /* Vos styles ici */
  </style>
  