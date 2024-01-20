<template>
  <div>
    <div class="navbar">
      <div class="logo">
        <img class="logo-img" src="@/assets/logo/téléchargement-removebg-preview (1).png">
      </div>
      <ul class="menu">
        <li><router-link to="/" exact>Accueil</router-link></li>
        <li><router-link to="/login" exact>Connexion</router-link></li>
        <li><router-link to="/register" exact>Inscription</router-link></li>
        <li><router-link to="/application" exact>Application Mobile</router-link></li>
        <li><router-link to="/about" exact>About</router-link></li>
      </ul>
    </div>

    <div class="bande-blanche"></div>
    
    <div class="background">
      <div class="shape"></div>
      <div class="shape"></div>
    </div>

    <form @submit.prevent="login">
      <h3>Login Here</h3>
       <!-- Affichez le message d'erreur -->
       <div v-if="errorMessage" class="alert alert-danger alert-dismissible" id="myAlert">
        <strong>Oup!</strong> {{ errorMessage }}
      </div>
      
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

      <label for="email">Email</label>
      <input type="email" placeholder="Email or Phone" id="email" v-model="email" required />

      <label for="password">Password</label>
      <input type="password" placeholder="Password" id="password" v-model="password" required>
      <div style="margin-top: 10px;">
        <router-link to="/forgot-password" class="forgot-password-link">>Mot de passe oublié ?</router-link>
        <router-link to="/register" class="register-link">Inscription</router-link>
      </div>

      <button type="submit">Log In</button>
     <div class="social">
        <div><i class="fab fa-google"></i> Google</div>
        <div class="fb"><i class="fab fa-facebook"></i> Facebook</div>
      </div>     
    </form>
  </div>
</template>

<script>
  import api from './../services/api';
  export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '', 
    };
  },

  methods: {
    async login() {
      try {
        const response = await api.login({
          email: this.email,
          password: this.password,
        });

        console.log('Connexion réussie:', response.data);
        this.$router.push("/dashboard");
      } catch (error) {
        if (error.response) {
          // Affichez le message d'erreur à l'utilisateur
          this.errorMessage = error.response.data.message;

          // Affichez le message d'erreur dans la console (à des fins de débogage)
          console.error('Erreur lors de la connexion:', error.response.data);
          
        } else if (error.request) {
          // La requête a été faite, mais aucune réponse n'a été reçue
          console.error('Aucune réponse reçue de l\API');
        } 
      }
    }, methods: {
    handleLoginSucess() {
      // Effectuez le processus de connexion et émettez un événement si réussi
      // Supposons que vous récupérez le nom d'utilisateur après une connexion réussie
      

      // Émettez un événement pour informer que l'utilisateur s'est connecté avec succès
      this.$emit("login-success", username);
    },
  },
  },
};
</script>
  
  <style scoped>
  /* Styles spécifiques à la page de connexion */
  .navbar {

color: #fff;
padding: 10px;
display: flex;
justify-content: space-between;
align-items: center;/*
height: 2px; /* Ajustez la hauteur de la bande blanche selon vos besoins *//*
background-color: #fff;*/
backdrop-filter: blur(50px); /* Ajoute un flou de 10 pixels au fond */
/*-webkit-backdrop-filter: blur(50px); /* Pour la prise en charge de WebKit (Safari) */
font-size: large;
}




.logo-img {

width: 15%;
height: auto;
}

.menu {
list-style: none;
display: flex;
}

.menu li {
margin: 0 10px;
}

.menu a {
text-decoration: none;
color: #fff;
font-weight: bold;
cursor: pointer;
font-size: 19px;
}

.menu a:hover {
color: #6b5683; /* Couleur au survol du lien */
}

.bande-blanche {
  height: 2px;
  background-color: #b567f1;
}

 /* .login-container {
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
  }*/

 /* *:before,
*:after{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}*/

.background{
    width: 430px;
    height: 520px;
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
    height: 520px;
    width: 500px;
    background-color: rgba(133, 25, 215, 0.13);
    position: absolute;
    transform: translate(-50%,-50%);
    top: 62%;
    left: 50%;
    border-radius: 10px;
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255,255,255,0.1);
    box-shadow: 0 0 40px rgba(8,7,16,0.6);
    padding: 50px 35px;
}
form *{
    font-family: 'Poppins',sans-serif;
    color: #ffffff;
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
    background-color: #ffffff;
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
  color: #ffffff;
}
  </style>
  