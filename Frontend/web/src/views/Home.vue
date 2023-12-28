<!-- src/views/Home.vue -->
<!-- Home.vue -->

<template>
  <div>
    <navbar></navbar>
    <div class="welcome-section">
      <h1>CommonCash</h1>
      <h2>Bienvenue sur l'application de gestion de dépenses</h2>
      <p>Connectez-vous pour commencer à utiliser l'application.</p>

      <div class="buttons">
        <router-link to="/login">
          <button class="login-button">Se connecter</button>
        </router-link>
        <router-link to="/register">
          <button class="register-button">S'inscrire</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style scoped>
/* Styles spécifiques à la page d'accueil */

.welcome-section {
  text-align: center;
  margin: 50px;
}

.buttons {
  margin-top: 20px;
}

.login-button,
.register-button {
  padding: 10px 20px;
  font-size: 16px;
  margin: 0 10px;
  cursor: pointer;
}

</style>
