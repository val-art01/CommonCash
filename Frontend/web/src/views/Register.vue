<template>
    <div>
      <div class="navbar">
      <div class="logo"><img class="logo-img" src="@/assets/logo/téléchargement-removebg-preview (1).png"></div>
      <ul class="menu">
        <li><router-link to="/" exact>Accueil</router-link></li>
        <li><router-link to="/login" exact>Connexion</router-link></li>
        <li><router-link to="/register" exact>Inscription</router-link></li>
        <li><router-link to="/application" exact> Application Mobile</router-link></li>
        <li><router-link to=/about exact>About</router-link></li>

        <!-- Ajoutez d'autres liens du menu selon les besoins -->
      </ul>
    </div>
    <div class="bande-blanche"></div>
      <navbar></navbar>
      <!--<div class="register-container">
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
      </div>-->
      <div class="background">
      <div class="shape"></div>
      <div class="shape"></div>
    </div>

    <form @submit.prevent="register">
      <h3>inscrivez vous</h3>

      <label for="username">Username</label>
      <input type="text" placeholder="Username or Phone" id="username" v-model="username" required>

      <label for="email">Adresse e-mail:</label>
      <input type="email" id="email" v-model="email" required />
       
      <label for="password">Mot de passe:</label>
      <input type="password" id="password" v-model="password" required />
  
      <label for="confirmPassword">Confirmer le mot de passe:</label>
      <input type="password" id="confirmPassword" v-model="confirmPassword" required />

      <button type="submit">Sign up</button>
     </form>
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import { RouterLink } from 'vue-router';
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
    margin-top: 100px;
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
    background-color: #5745a0;
  }

  .background{
    width: 430px;
    height: 600px;
    position: absolute;
    transform: translate(-50%,-50%);
    left: 50%;
    top: 50%;
}
.background .shape{
    height: 200px;
    width: 200px;
    position: absolute;
    border-radius: 50%;
}
.shape:first-child{
    background: linear-gradient(
        #6c18ad,
        #a823f5
    );
    left: -80px;
    /*top: -80px;*/
}
.shape:last-child{
    background: linear-gradient(
        to right,
        #d52fff,
        #7319f0
    );
    right: -30px;
    bottom: -80px;
}
form{
    height: 550px;
    width: 500px;
    background-color: rgba(133, 25, 215, 0.13);
    position: absolute;
    transform: translate(-50%,-50%);
    top: 75%;
    left: 50%;
    border-radius: 10px;
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255,255,255,0.1);
    box-shadow: 0 0 40px rgba(8,7,16,0.6);
    padding: 50px 35px;
}
form *{
    font-family: 'Poppins',sans-serif;
    color: #be1af0;
    letter-spacing: 0.5px;
    outline: none;
    border: none;
}
form h3{
    font-size: 32px;
    font-weight: 500;
    line-height: 42px;
    text-align: center;
}

label{
    display: block;
    margin-top: 30px;
    font-size: 16px;
    font-weight: 500;
}
input{
    display: block;
    height: 50px;
    width: 100%;
    background-color: rgba(255,255,255,0.07);
    border-radius: 3px;
    padding: 0 10px;
    margin-top: 8px;
    font-size: 14px;
    font-weight: 300;
}
::placeholder{
    color: #e5e5e5;
}
button{
    margin-top: 23px;
    width: 100%;
    background-color: #b957f1;
    color: #080710;
    padding: 15px 0;
    font-size: 18px;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;
}
.social{
  margin-top: 30px;
  display: flex;
}
.social div{
  background: red;
  width: 150px;
  border-radius: 3px;
  padding: 5px 10px 10px 5px;
  background-color: rgba(255,255,255,0.27);
  color: #eaf0fb;
  text-align: center;
}
.social div:hover{
  background-color: rgba(255,255,255,0.47);
}
.social .fb{
  margin-left: 25px;
}
.social i{
  margin-right: 4px;}

.link{
  margin-top: 20px;
}  
.forgot-password-link {
  margin-right: 10px;
}

.register-link {
  margin-left: 50px;
  color: #110127;
}
  </style>
  