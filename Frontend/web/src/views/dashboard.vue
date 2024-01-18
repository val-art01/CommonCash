<template>
    <v-app id="inspire">
      <v-system-bar>
        <v-spacer></v-spacer>
        <v-icon>mdi-square</v-icon>
        <v-icon>mdi-circle</v-icon>
        <v-icon>mdi-triangle</v-icon>
      </v-system-bar>
  
      <v-navigation-drawer v-model="drawer">
        <v-sheet color="#6A1B9A" class="pa-4">
          <v-avatar class="mb-4" color="white" size="64"></v-avatar>
          <div>{{ currentUser }}</div>
        </v-sheet>
        <v-divider></v-divider>
        <router-link v-for="[icon, text] in links" :key="icon" :to="{ name: text }">
  <v-list-item :prepend-icon="icon" link class="custom-list-item">
    <v-list-item-title>
      {{ text }}
    </v-list-item-title>
  </v-list-item>
</router-link>

      </v-navigation-drawer>
  
      <v-app-bar app color="#4A148C" elevate-on-scroll>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>CommonCash</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon><v-icon>mdi-heart</v-icon></v-btn>
        <v-btn icon><v-icon>mdi-magnify</v-icon></v-btn>
        <v-menu left bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="n in 4" :key="n" @click="() => {}" color="#6A1B9A">
              Option {{ n }}
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>

      <v-sheet color="gray" class="pa-4">
    <v-container fluid fill-height>
      <v-row align="center" justify="end" style="height: 80vh; align-items: center;">
        <v-col lg="4" cols="12" class="ml-auto">
          <v-card elevation="2" class="rounded-lg mb-3">
            <v-card-text class="d-flex justify-space-between align-center">
              <div>
                <strong>Total Revenue</strong> <br>
                <span>
                  
                 
<v-icon>
                    mdi-currency-usd
                  </v-icon>
                  {{ totalRevenue.amount }}
                </span>
              </div>
              <v-avatar size="60" :color="totalRevenue.color" style="border: 3px solid #444">
                <span style="color: white">{{ totalRevenue.amount }} +</span>
              </v-avatar>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text class="d-flex justify-space-between align-center">
              <div>
                <strong>Total Expense</strong> <br>
                <span>
                  <v-icon>
                    mdi-ticket
                  </v-icon>
                  {{ totalExpense.amount }}
                </span>
              </div>
              <v-avatar size="60" :color="totalExpense.color" style="border: 3px solid #444">
                <span style="color: white">{{ totalExpense.amount }} +</span>
              </v-avatar>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text class="d-flex justify-space-between align-center">
              <div>
                <strong>Remboursement</strong> <br>
                <span>
                  <v-icon>
                    mdi-account-group
                  </v-icon>
                  {{ remboursement.amount }}
                </span>
              </div>
              <v-avatar size="60" :color="remboursement.color" style="border: 3px solid #444">
                <span style="color: white">{{ remboursement.amount }} +</span>
              </v-avatar>
            </v-card-text>
            <v-card-actions class="d-flex justify-space-between">
              <!-- Ajoutez du contenu ici si nécessaire -->
            </v-card-actions>
          </v-card>
        </v-col>
         <!-- Liste des alertes -->
         <v-col lg="6" cols="12" style="max-height: 600px;;">
          <v-card elevation="2" class="rounded-lg" style=" max-height:600px;">
            <v-card-title>
              Alertes Récentes
            </v-card-title>
            <v-list dense>
              <v-list-item-group v-model="activeAlert">
                <v-list-item v-for="(alert, index) in alerts" :key="index">
                  <v-list-item-content>
                    <v-list-item-title>{{ alert.title }}</v-list-item-title>
                    <v-list-item-subtitle>{{ alert.date }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
        <!-- Section des statistiques globales -->
    <v-row align="center" justify="center">
      <!-- Carte pour les statistiques globales -->
      <v-col lg="6" cols="12">
        <v-card elevation="2" class="rounded-lg">
          <v-card-title>
            Statistiques Globales
          </v-card-title>
          <v-card-text>
            <!-- Graphique en ligne pour les dépenses mensuelles -->
            <v-line-chart
              :chart-data="monthlyExpenses"
              :options="chartOptions"
            ></v-line-chart>

            <!-- Chiffres -->
            <v-row>
              <v-col>
                <v-chip>
                  <v-avatar color="primary" left>
                    <v-icon>mdi-currency-usd</v-icon>
                  </v-avatar>
                  Total des dépenses : 2000€
                </v-chip>
              </v-col>
              <v-col>
                <v-chip>
                  <v-avatar color="success" left>
                    <v-icon>mdi-currency-usd</v-icon>
                  </v-avatar>
                  Total des revenus : 10000€
                </v-chip>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Liste des alertes -->
      <v-col lg="4" cols="12">
        <!-- ... (le reste de votre code) ... -->
      </v-col>
      </v-row>
    </v-container>
  </v-sheet>
 

      <Login @login-success="handleLoginSuccess" />
    </v-app>
  </template>
  
  <script setup>
  import { ref } from 'vue';

  const monthlyExpenses = ref({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  datasets: [
    {
      label: 'Dépenses mensuelles',
      data: [200, 150, 300, 100, 250],
      fill: false,
      borderColor: 'primary',
      borderWidth: 2,
    },
  ],
});

const chartOptions = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};


  
  const links = [
    ['mdi-cash-multiple', 'Nos Depenses'],
    ['mdi-account-group', 'GroupManagement'],
    ['mdi-cash-refund', 'Remboursement'],
    ['mdi-currency-usd', 'Solde'],
    ['mdi-email', 'Messagerie'],
    ['mdi-chart-bar', 'Statistique'],
    ['mdi-account-circle', 'Mon profil'],
    ['mdi-logout', 'Deconnection'],
  ];
  
  const drawer = ref(null);
  const totalRevenue = { amount: 10000, color: 'black' };
const totalExpense = { amount: 2000, color: 'black' };
const remboursement = { amount: 500, color: 'black' };

const alerts = [
  { title: 'Alerte 1', date: '2022-05-01' },
  { title: 'Alerte 2', date: '2022-05-02' },
  { title: 'Alerte 3', date: '2022-05-03' },
];

let activeAlert = null; // Pour la gestion de la sélection des alertes

    // Ajoutez d'autres éléments si nécessaire//
  
  const logout = () => {
    // Logique pour la déconnexion
  };
  const currentUser = ref(''); // Initialisez avec une valeur par défaut

const handleLogin = (username) => {
  // Mettez à jour le nom de l'utilisateur lorsqu'il se connecte
  currentUser.value = username;
};
  </script>
  
  <style scoped>
.custom-list-item .v-list-item__title {
  text-decoration: none; /* Pour supprimer le soulignement du texte */
  color: violet; /* Changer la couleur du texte en violet (ou la couleur souhaitée) */
}
</style>