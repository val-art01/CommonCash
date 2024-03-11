<template>
  
  <v-app id="inspire">

    <v-navigation-drawer v-model="drawer" color="#2A0050">
      <v-img
    height="172"
    class="pa-4"
    src="https://fr.pngtree.com/freepng/automatic-floating-bubble-illustration_4701485.html"


  >
    <div class="text-center">
      
      <h2 class="white--text" color="#4A148C">Donia Laajili</h2>
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
    <v-menu location="bottom right" transition="slide-y-transition">
    <!-- ---------------------------------------------- -->
    <!-- Activator Btn -->
    <!-- ---------------------------------------------- -->
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props" class="text-none">
        <v-badge content="2" color="error">
          <v-icon>mdi-bell-outline</v-icon>
        </v-badge>
      </v-btn>
    </template>
    <v-list elevation="1" lines="three" density="compact" max-width="400">
      <v-list-subheader>Notifications</v-list-subheader>
      <v-list-item v-for="(message, i) in messages" :key="i" @click="">
        <!-- ---------------------------------------------- -->
        <!-- Prepend-->
        <!-- ---------------------------------------------- -->
        <template v-slot:prepend>
          <v-avatar size="40" :color="message.color">
            <v-icon color="white">{{ message.icon }}</v-icon>
          </v-avatar>
        </template>
        <!-- ---------------------------------------------- -->
        <!-- Append-->
        <!-- ---------------------------------------------- -->
        <template v-slot:append>
          <div class="full-h d-flex align-center">
            <span class="text-body-2 text-grey"> {{ message.time }}</span>
          </div>
        </template>
        <!-- ---------------------------------------------- -->
        <!-- Main Content-->
        <!-- ---------------------------------------------- -->
        <div>
          <v-list-item-title class="font-weight-bold text-primary">{{
            message.title
          }}</v-list-item-title>
          <v-list-item-subtitle>{{ message.subtitle }}</v-list-item-subtitle>
        </div>
      </v-list-item>
      <!-- ---------------------------------------------- -->
      <!-- See all Btn-->
      <!-- ---------------------------------------------- -->
      <div class="text-center py-5">
        <v-btn size="small" variant="elevated" elevation="1"> See all </v-btn>
      </div>
    </v-list>
  </v-menu>

      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <!--<v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          
          </v-btn>-->
        
          <VBadge
    dot
    location="bottom right"
    offset-x="3"
    offset-y="3"
    color="success"
    bordered
  >
    <VAvatar
      class="cursor-pointer"
      color="primary"
      variant="tonal"
    >

    <v-icon>mdi-account-circle</v-icon>
     

      <!-- SECTION Menu -->
      <VMenu
        activator="parent"
        width="230"
        location="bottom end"
        offset="14px"
      >
        <VList>
          <!-- 👉 User Avatar & Name -->
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge
                  dot
                  location="bottom right"
                  offset-x="3"
                  offset-y="3"
                  color="success"
                >
                  <VAvatar
                    color="primary"
                    variant="tonal"
                  >
                  <v-icon>mdi-account-circle</v-icon>
                    
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-semibold">
              Donia Laajili
            </VListItemTitle>
            <VListItemSubtitle>Admin</VListItemSubtitle>
          </VListItem>
          <VDivider class="my-2" />

          <!-- 👉 Profile -->
          <VListItem link>
            <template #prepend>
              <VIcon
                class="me-2"
                icon="ri-user-line"
                size="22"
              />
            </template>

            <VListItemTitle>Profile</VListItemTitle>
          </VListItem>

          <!-- 👉 Settings -->
          <VListItem link>
            <template #prepend>
              <VIcon
                class="me-2"
                icon="ri-settings-4-line"
                size="22"
              />
            </template>

            <VListItemTitle>Settings</VListItemTitle>
          </VListItem>

          <!-- 👉 Pricing -->
          <VListItem link>
            <template #prepend>
              <VIcon
                class="me-2"
                icon="ri-money-dollar-circle-line"
                size="22"
              />
            </template>

            <VListItemTitle>Pricing</VListItemTitle>
          </VListItem>

          <!-- 👉 FAQ -->
          <VListItem link>
            <template #prepend>
              <VIcon
                class="me-2"
                icon="ri-question-line"
                size="22"
              />
            </template>

            <VListItemTitle>FAQ</VListItemTitle>
          </VListItem>

          <!-- Divider -->
          <VDivider class="my-2" />

          <!-- 👉 Logout -->
          <VListItem to="/login">
            <template #prepend>
              <VIcon
                class="me-2"
                icon="ri-logout-box-r-line"
                size="22"
              />
            </template>

            <VListItemTitle>Logout</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
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
import Alerte from './Alerte.vue';






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
const messages = [
  {
    title: "Brunch this weekend?",
    color: "primary",
    icon: "mdi-account-circle",
    subtitle:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint, repudiandae?",
    time: "3 min",
  },
  {
    title: "Summer BBQ",
    color: "success",
    icon: "mdi-email-outline",
    subtitle:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint, repudiandae?",
    time: "3 min",
  },
  {
    title: "Oui oui",
    color: "teal lighten-1",
    icon: "mdi-airplane-landing",
    subtitle:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint, repudiandae?",
    time: "4 min",
  },
  {
    title: "Disk capacity is at maximum",
    color: "teal accent-3",
    icon: "mdi-server",
    subtitle:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint, repudiandae?",
    time: "3 hr",
  },
  {
    title: "Recipe to try",
    color: "blue-grey lighten-2",
    icon: "mdi-noodles",
    subtitle:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint, repudiandae?",
    time: "8 hr",
  },
];
</script>