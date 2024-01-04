<template>
    <div>
      <!-- En-tête du tableau de bord -->
      <div class="dashboard-header">
        <h1>Bienvenue dans votre Tableau de Bord</h1>
        <button @click="logout">Déconnexion</button>
      </div>
  
      <!-- Widgets du tableau de bord -->
      <div class="dashboard-widgets">
        <!-- Widget 1 : Liste des dépenses récentes -->
        <div class="dashboard-widget">
          <h2>Dépenses Récentes</h2>
          <!-- Contenu du widget (liste des dépenses récentes) -->
        </div>
  
        <!-- Widget 2 : Graphique des revenus et dépenses -->
        <div class="dashboard-widget">
          <h2>Graphique des Revenus et Dépenses</h2>
          <!-- Contenu du widget (graphique) -->
        </div>
  
        <!-- Ajoutez autant de widgets que nécessaire -->
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      logout() {
        // Ajoutez ici la logique de déconnexion (par exemple, redirigez vers la page de connexion)
        // this.$router.push('/login');
        this.$router.push('/login');
      },
    },
  };
  </script>
  
  <style scoped>
  /* Styles spécifiques au tableau de bord */
  .dashboard-header {
    background-color: #3498db;
    color: #fff;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .dashboard-widgets {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
  }
  
  .dashboard-widget {
    background-color: #ecf0f1;
    padding: 20px;
    margin: 10px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  button {
    background-color: #e74c3c;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }
  
  button:hover {
    background-color: #c0392b;
  }
  </style>
  
  