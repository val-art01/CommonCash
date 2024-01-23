<template>
  <v-container fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title class="text-h5">Déconnexion</v-card-title>
          <v-card-text>
            <p>Êtes-vous sûr de vouloir vous déconnecter?</p>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="cancelLogout" color="grey darken-1">Annuler</v-btn>
            <v-btn @click="performLogout" color="primary">Déconnexion</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  methods: {
    performLogout() {
      // Mettez ici le code pour effectuer la déconnexion
      // Par exemple, vous pouvez appeler une API pour déconnecter l'utilisateur côté serveur.
      // Ensuite, redirigez l'utilisateur vers la page de connexion ou la page d'accueil.
      // Exemple :
      // api.logout().then(() => {
      //   // Déconnexion réussie
      //   this.$router.push('/login');
      // }).catch(error => {
      //   console.error('Erreur lors de la déconnexion :', error);
      // });
    },
    cancelLogout() {
      // Annuler la déconnexion et revenir en arrière
      this.$router.go(-1); // Revenir à la page précédente
    },
  },
};
</script>

<style scoped>
/* Vos styles spécifiques à ce composant */
</style>
