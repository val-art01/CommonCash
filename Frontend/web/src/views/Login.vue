<template>
    <div>
      <navbar></navbar>
      <div class="login-container">
        <h2>Connexion</h2>
        <form @submit.prevent="login">
          <label for="username">Nom d'utilisateur:</label>
          <input type="text" id="username" v-model="username" required />
  
          <label for="password">Mot de passe:</label>
          <input type="password" id="password" v-model="password" required />
  
          <button type="submit">Se connecter</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: "",
        password: "",
      };
    },
    methods: {
      login() {
        // Implémentez votre logique d'authentification ici
        console.log("Tentative de connexion avec:", this.username, this.password);
        // Redirigez l'utilisateur après la connexion réussie
        this.$router.push("/dashboard");
      },
    },
  };
  </script>
  
  <style scoped>
  /* Styles spécifiques à la page de connexion */
  .login-container {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-top: 50px;
  }
  
  label {
    display: block;
    margin-bottom: 8px;
  }
  
  input {
    width: 100%;
    padding: 8px;
    margin-bottom: 16px;
  }
  
  button {
    background-color: #4caf50;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>
  