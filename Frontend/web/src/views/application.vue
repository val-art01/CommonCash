<template>
    <div>
        <div class="explanation-container">
      <h2>Application Mobile</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.
        Proin sodales, turpis id ultrices sagittis, nisi libero dapibus odio, ut
        tristique eros lectus vitae dui. Fusce ac odio eu urna tincidunt
        malesuada.
      </p>
      <!-- Ajoutez d'autres éléments d'explication ici -->
    </div>

      <div class="specific-page">
        <div class="image">
          <img class="logo-img-2" src="@/assets/logo/Capture_d_écran_tel-removebg-preview.png">
       <!-- </div>
        <img class="background" src="@/assets/logo/gettyimages-1201626412.jpg">
      </div>-->
      <!-- ... Autres éléments ... -->
      </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  /* Styles spécifiques à la page d'explication mobile */
  
  .specific-page {
    position: relative; /* Permet le positionnement relatif des éléments enfants */
    
  }
  
  .background {
    width: 100%;
    max-height: 100vh;
    filter: blur(5px);
    left: 100%;
    
  }
  
  .logo-img-2 {
    position: absolute;
    top: 0;
    right: 0;
    width: 22%;
    height: auto;
    z-index: 1;
    margin-right: 400px;
  }

  .explanation-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  /*border: 1px solid #ccc;
  border-radius: 8px;*/
  margin-top: 50px;
}

h2 {
  color: #333;
 margin-top: 20px;
}
  
  /* ... Autres styles ... */
  </style>
  