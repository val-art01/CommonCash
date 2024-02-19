<!-- src/views/Home.vue -->
<!-- Home.vue -->

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
    <!--<router-view/>-->
  
    <div class="bande-blanche"></div>
    <div class="image-container"></div>
     <!-- Votre contenu HTML ici -->
 
    <div>
      <div class="welcome-section">
        <h1>CommonCash</h1>
        <h2>Bienvenue sur l'application de gestion de dépenses<br></h2>
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
  
    </div>
    <div class="container">
      <div class="text-with-bar">
        <div class="vertical-bar"></div>
        <span class="text"> CommonCash a pour objectif de permettre à un groupe de personnes de gérer des dépenses communes de manière collaborative.<br> Chaque membre du groupe a la possibilité de déclarer une dépense, <br>en précisant quels sont les autres membres du groupe qui ont bénéficié de cette dépense.<br>Une fois les dépenses déclarées, CommonCash effectue des calculs pour déterminer les remboursements nécessaires afin d'équilibrer les comptes du groupe.<br><br>En d'autres termes, CommonCash répond à la question "qui doit combien à qui ?" <br>en fournissant des informations sur les ajustements financiers à effectuer entre les membres du groupe.<br></span>
      
      </div>
    </div>
  </div>  
</template>

<script>
import telechargementImage from "@/assets/logo/téléchargement-removebg-preview (1).png";
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';

export default {
  name: 'Home',
  data() {
    return {
      telechargementImage,
    };
  },
  // ... Autres options du composant ...
};
</script>

<style>
/* Styles spécifiques à la barre de navigation */

body {
  background: linear-gradient(to left, black, rgb(119, 119, 244));
  color: white; 
  }

.image-container {
  /* Image en arrière-plan avec opacité */
  background-image: url('src/assets/logo/gettyimages-1201626412.jpg');
  background-size: cover; /* Ajustez la taille de l'image selon vos besoins */
  background-repeat: no-repeat;
  background-position: center center;
  opacity: 0.06; 
  /* Opacité de l'image, 1 étant complètement opaque et 0 complètement transparent */
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1; /* Place l'image en arrière-plan */
}

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
 
.welcome-section h2 {
  margin-bottom: 15px; /* Ajoutez une marge en bas (20 pixels dans cet exemple) */
}

.welcome-section h1 {
  margin-bottom: 15px; /* Ajoutez une marge en bas (20 pixels dans cet exemple) */
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

.container {
  display: flex;
  /*justify-content: center;
  align-items: center;*/
  height: 40vh; /* Ajustez selon vos besoins */
  left: 90%;
  font-size: 20px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  margin-left: 65px;
}

.text-with-bar {
  display: flex;
  align-items: center;
}

.text {
  margin-left: 20px; /* Espacement entre le texte et la barre */
  font-family:'Times New Roman', Times, serif;
  font-size: 20px;
  
}

.vertical-bar {
  height: 220px; /* Hauteur de la barre */
  width: 10px; /* Largeur de la barre */
  background-color: rgb(100, 0, 128); /* Couleur de la barre */
  border-radius: 5px;
  margin-left: 65px;


}

</style>
