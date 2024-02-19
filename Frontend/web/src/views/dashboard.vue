<template>
  <v-app id="inspire">

    <v-navigation-drawer v-model="drawer" color="#B39DDB">
      <v-img
    height="172"
    class="pa-4"
    src="https://fr.pngtree.com/freepng/automatic-floating-bubble-illustration_4701485.html"


  >
    <div class="text-center">
      <v-avatar class="mb-4" color="#4A148C" size="64">
          <v-icon size="60">
        mdi-account-circle
      </v-icon>
      </v-avatar>
      <h2 class="white--text" color="#4A148C">Donia laajili</h2>
    </div>
  </v-img>
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
      
      <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title>CommonCash</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Recherche"
      single-line
      hide-details
    ></v-text-field>
      <v-btn icon><v-icon>mdi-bell</v-icon></v-btn>
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

    <v-sheet color="gray" class="pa-4" style="top: 50%;">
  <v-container fluid fill-height>
    <v-row align="center" justify="space-between" style="height: 80vh; align-items: center;">
      <v-col cols="12" sm="4">
              
              <v-card class="cardOr mx-2 rounded-xl mt-n7" elevation="16">
                <v-row>
                  <v-col cols="12" sm="8">
                    <v-list-item three-line>
                      <v-list-item-content>
                        <div class="mb-4">
                          <v-btn tile fab color="purple" elevation="0">
                            <v-icon style="color: #fff;">mdi-currency-try</v-icon>
                          </v-btn>
                        </div>
                        <v-list-item-title class="headline mb-1 white--text">
                          $1200
                        </v-list-item-title>
                        <v-list-item-subtitle class="white--text" style="color:#fff">Total Depense</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-avatar size="100" class="ml-n10 mt-6" tile>
                      <v-icon style="color: rgb(170, 0, 255);">mdi-chart-line</v-icon>

                    </v-avatar>
                  </v-col>
                </v-row>
              </v-card>
           
            </v-col>
            <v-col cols="12" sm="4">
               <v-card class="cardVr mx-2 rounded-xl mt-n7" elevation="16">
                <v-row>
                  <v-col cols="12" sm="8">
                    <v-list-item three-line>
                      <v-list-item-content>
                        <div class="mb-4">
                          <v-btn tile fab color="purple" elevation="0">
                            <v-icon style="color: #fff;">mdi-ethereum</v-icon>
                          
                          </v-btn>
                        </div>
                        <v-list-item-title class="headline mb-1 white--text">
                          $232.40
                        </v-list-item-title>
                        <v-list-item-subtitle class="white--text" style="color:#fff">remboursement</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-avatar size="100" class="ml-n10 mt-6" tile>
                      <v-icon style="color: rgb(170, 0, 255);">mdi-chart-line</v-icon>
                    </v-avatar>
                  </v-col>
                </v-row>
              </v-card>
           
            </v-col>
            <v-col cols="12" sm="4">
               <v-card class="cardR mx-2 rounded-xl mt-n7" elevation="16">
                <v-row>
                  <v-col cols="12" sm="8">
                    <v-list-item three-line>
                      <v-list-item-content>
                        <div class="mb-4">
                          <v-btn tile fab color="purple" elevation="0">
                            <v-icon style="color: #fff;">mdi-cash-refund</v-icon>
                          </v-btn>
                        </div>
      
                        <v-list-item-title class="headline mb-1 white--text">
                          $3000
                        </v-list-item-title>
                        <v-list-item-subtitle class="white--text" style="color:#fff">Total revenu</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-avatar size="100" class="ml-n10 mt-6" tile>
                      <v-icon style="color: rgb(170, 0, 255);">mdi-chart-line</v-icon>
                    </v-avatar>
                  </v-col>
                </v-row>
              </v-card>
           
            </v-col>
     
       <!-- Liste des alertes 
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
      </v-col>-->
      <v-col cols="12" sm="8">
           
           <v-toolbar flat color="rgba(0,0,0,0)" dark>
          <v-toolbar-title>Market Overview</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn outlined >Weekly (2020)
          <v-icon right  class="mr-2" >fas fa-chevron-down</v-icon> 
        </v-btn>
        </v-toolbar>
       <v-sparkline
:value="value"
:smooth="radius || false"
:padding="padding"
:line-width="width"
:stroke-linecap="lineCap"
:fill="fill"
:type="type"
:auto-line-width="autoLineWidth"
auto-draw
color="white"
></v-sparkline>
<v-divider color="white" class="mx-4"></v-divider>
<v-toolbar flat color="rgba(0,0,0,0)" dark>
          <v-toolbar-title>Recent Activities</v-toolbar-title>
        </v-toolbar>
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
import Chartkick from 'chartkick'
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
  ['mdi-view-dashboard', 'Dashboard'],
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

const closeDrawer = () => {
drawer.value = false;
};

const toggleDrawer = () => {
drawer.value = !drawer.value; // Inverse la valeur actuelle (true devient false, et vice versa)
};

const width = 2;
const radius = 10;
const padding = 8;
const lineCap = 'round';
const value = [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0];
const fill = false;
const type = 'trend';
const autoLineWidth = false;
const orders = [
  {
    price: 89.03,
    amount: 0.15,
  },
  {
    price: 94.03,
    amount: 0.18,
  },
  {
    price: 92.03,
    amount: 0.22,
  },
  {
    price: 94.03,
    amount: 0.18,
  },
  {
    price: 33.03,
    amount: 0.19,
  },
];
</script>