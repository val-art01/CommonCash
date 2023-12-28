<!-- src/views/Home.vue -->
<!-- Home.vue -->

<template>
  
  <div>
    <div class="navbar">
      <div class="brand">Gestion de Dépenses</div>
      <ul class="menu">
        <li><router-link to="/">Accueil</router-link></li>
        <li><router-link to="/login">Connexion</router-link></li>
        <li><router-link to="/register">Inscription</router-link></li>
        <!-- Ajoutez d'autres liens du menu selon les besoins -->
      </ul>
    </div>
  </div>  
  <div class="image-container"></div>
  <!-- Votre contenu HTML ici -->

  <div>
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
    <div class="image-container"></div>
  <!-- Votre contenu HTML ici -->
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style>
/* Styles spécifiques à la barre de navigation */

body {
  background: linear-gradient(to right, black, rgb(119, 119, 244));
  color: white; 
  }

.image-container {
  /* Image en arrière-plan avec opacité */
  background-image: url('src/assets/logo/gettyimages-1201626412.jpg');
  background-size: cover; /* Ajustez la taille de l'image selon vos besoins */
  background-repeat: no-repeat;
  background-position: center center;
  opacity: 0.02; /* Opacité de l'image, 1 étant complètement opaque et 0 complètement transparent */
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1; /* Place l'image en arrière-plan */
}

.navbar {
  /*background-color: #333;*/
  color: #fff;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /*height: 5px; /* Ajustez la hauteur de la bande blanche selon vos besoins *//*
  background-color: #fff;*/
  backdrop-filter: blur(50px); /* Ajoute un flou de 10 pixels au fond */
  /*-webkit-backdrop-filter: blur(50px); /* Pour la prise en charge de WebKit (Safari) */
}

.brand {
  font-size: 1.5em;
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
}

.menu a:hover {
  color: #ffcc00; /* Couleur au survol du lien */
}
.welcome-section {
  text-align: center;
  margin: 50px;
}

.buttons {
  margin-top: 20px;
}

.login-button,
.register-button {
  /*padding: 10px 20px;*/
  font-size: 14px;
  margin: 0 10px;
  cursor: pointer;
  
  display: inline-block;
  outline: none;
  

  line-height: 1;
 -radius: 500px;
  transition-property: background-color,border-color,color,box-shadow,filter;
  transition-duration: .3s;
  border: 1px solid transparent;
  letter-spacing: 2px;
  min-width: 160px;
  text-transform: uppercase;
  white-space: normal;
  font-weight: 700;
  text-align: center;
  padding: 16px 14px 18px;
  color: #ffffff;
  box-shadow: inset 0 0 0 2px #ffffff;
  background-color: transparent;
  height: 48px;
  :hover{

    color: #fff;
    background-color: #616467;
  }
                
}

.login-button,
.register-button:hover{
  color: #fff;
  background-color: #6b5683;
}




</style>
