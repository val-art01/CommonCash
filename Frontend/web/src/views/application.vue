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
  
      <div class="explanation-container">
        <h2>CommonCash</h2>
        <p>Stay focused, be present</p>
      </div>
  
      <div class="link-container">
        <CustomLink :url="'@/assets/logo/android.png'" :imageSrc="'android.png'" :altText="'Description de l\'image Android'"/>
        <CustomLink :url="'@/assets/logo/iphone.png'" :imageSrc="'iphone.png'" :altText="'Description de l\'image iPhone'"/>
      </div>
  
      <div class="specific-page">
        <div class="image">
          <img class="logo-img-2" src="@/assets/logo/Capture_d_écran_tel-removebg-preview.png">
        </div>
      </div>
    

    <!-- Section Application (Fond Violet Foncé Mobile) -->
    
  <div class="mobile-section" style="background-color: #5d42f4;">
    <div class="background-image"></div>
    <div class="overlay"></div>
    <div class="content">
      <h2>Application Mobile</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Proin sodales, turpis id ultrices sagittis, nisi libero dapibus odio, ut tristique eros lectus vitae dui. Fusce ac odio eu urna tincidunt malesuada.</p>
    </div>
    <div class="scrolling-text">
        <p v-for="(phrase, index) in phrases" :key="index">{{ phrase }}</p>
      </div>
  </div>

    <!-- Section Économie (Fond Violet Clair) -->
    <div class="section" style="background-color: #a823f5; margin-bottom: 0;">
      <h3>Économie</h3>
      <p>Économisez avec CommonCash.</p>
    </div>
    </div>
  </template>
  
  <script>
  export default {
    components: {
      CustomLink: {
        props: ['url', 'imageSrc', 'altText'],
        template: `
          <a :href="url">
            <img :src="require('@/assets/' + imageSrc)" :alt="altText">
          </a>
        `,
      },
    },
    data() {
    return {
      phrases: [
        "salut",
        "test",
        "waaaw",
        // Ajoutez autant de phrases que nécessaire
      ],
      currentIndex: 0,
    };
  },
  mounted() {
    // Démarrez le défilement automatique au montage du composant
    this.startAutoScroll();
  },

  methods: {
    startAutoScroll() {
      setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.phrases.length;
      }, 3000); // Changez la valeur (en millisecondes) pour ajuster la vitesse du défilement
    },
  },
};
  </script>
  
  <style scoped>
  /* Styles spécifiques à la page d'explication mobile */
  body {
    filter: blur(5px);
  }
  
  .specific-page {
    position: relative;
   
  }
  
  .logo-img-2 {
    position: absolute;
    top: -260px;
    right: 0;
    width: 20%;
    height: auto;
    z-index: 1;
    margin-right: 300px;
  }
  
  .explanation-container {
    max-width: 600px;
    margin: auto;
    padding: 20px;
    margin-top: 50px;
  }
  
  h2 {
    color: #721e87;
    margin-top: 40px;
    font-size: 50px;
  }
  
  .link-container {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
  }
  
  .link-container a {
    text-decoration: none;
  }
  
  .link-container img {
    width: 100px; /* Ajustez la taille selon vos besoins */
    height: auto;
  }

  .section {
    margin-top: 0;
  padding: 100px;
  color: #fff;
  margin-bottom: 0 !important; /* Couleur du texte dans les sections, ajustez selon vos besoins */
  top: 0;
}

.section h3 {
  font-size: 30px;
  margin-bottom: 20px;
}

#avantages {
    margin-top: 500px;  /* Ajustez cette valeur selon vos besoins */
  }


  .mobile-section {
  position: relative;
  height: 500px; /* Ajustez la hauteur selon vos besoins */
}

.background-image {
  background-image: url('src/assets/logo/appli.jpg');
  filter: blur(5px);
  background-size: cover;
  background-position: center;
  height: 100%;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Ajustez l'opacité selon vos besoins */
}

.content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff; /* Couleur du texte */
  text-align: center;
}

.content h2 {
  font-size: 24px;
}

.content p {
  font-size: 16px;
}  
.scrolling-text {
  overflow: hidden;
  height: 50px; /* Ajustez la hauteur selon vos besoins */
}

.scrolling-text p {
  margin: 0;
  line-height: 50px; /* Assurez-vous que la hauteur de la ligne est égale à la hauteur du conteneur pour un défilement régulier */
  animation: scrollText 10s linear infinite; /* Ajustez la durée selon vos besoins */
}

@keyframes scrollText {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100%);
  }
}
  </style>
  