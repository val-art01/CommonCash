<template>
    <div>
      <navbar></navbar>
      <div class="register-container">
        <h2>Inscription</h2>
        <form @submit.prevent="register">
          <label for="username">Nom d'utilisateur:</label>
          <input type="text" id="username" v-model="username" required />
  
          <label for="email">Adresse e-mail:</label>
          <input type="email" id="email" v-model="email" required />
  
          <label for="password">Mot de passe:</label>
          <input type="password" id="password" v-model="password" required />
  
          <label for="confirmPassword">Confirmer le mot de passe:</label>
          <input type="password" id="confirmPassword" v-model="confirmPassword" required />
  
          <button type="submit">S'inscrire</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      };
    },
    methods: {
      register() {
        // Implémentez votre logique d'inscription ici
        console.log("Tentative d'inscription avec:", this.username, this.email, this.password);
        // Redirigez l'utilisateur après l'inscription réussie
        this.$router.push("/dashboard");
      },
    },
  };
  </script>
  
  <style scoped>
  /* Styles spécifiques à la page d'inscription */
  .register-container {
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
  