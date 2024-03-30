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
  <VCard title="Transactions">
    <template #append>
      <div class="me-n3 mt-n2">
        <MoreBtn :menu-list="moreList" />
      </div>
    </template>

    <VCardText>
      <VList class="card-list">
        <VListItem
          v-for="item in transactions"
          :key="item.paymentMethod"
        >
          <template #prepend>
            <VAvatar
              rounded
              variant="tonal"
              :color="item.color"
              :image="item.icon"
              class="me-3"
            />
          </template>

          <VListItemSubtitle class="text-disabled mb-1">
            {{ item.paymentMethod }}
          </VListItemSubtitle>
          <VListItemTitle>
            {{ item.description }}
          </VListItemTitle>

          <template #append>
            <VListItemAction>
              <span class="me-1">{{ item.amount > 0 ? `+$${Math.abs(item.amount)}` : `-$${Math.abs(item.amount)}` }}</span>
              <span class="text-disabled">USD</span>
            </VListItemAction>
          </template>
        </VListItem>
      </VList>
    </VCardText>
  </VCard>
  <!--order statistique-->
  <VCard>
    <VCardItem class="pb-3">
      <VCardTitle class="mb-1">
        Order Statistics
      </VCardTitle>
      <VCardSubtitle>42.82k Total Sales</VCardSubtitle>

      <template #append>
        <div class="me-n3 mt-n8">
          <MoreBtn :menu-list="moreList" />
        </div>
      </template>
    </VCardItem>

    <VCardText>
      <div class="d-flex align-center justify-space-between mb-3">
        <div class="flex-grow-1">
          <h4 class="text-h4 mb-1">
            8,258
          </h4>
          <span>Total Orders</span>
        </div>

        <div>
          <VueApexCharts
            type="donut"
            :height="125"
            width="105"
            :options="chartOptions"
            :series="series"
          />
        </div>
      </div>

      <VList class="card-list mt-7">
        <VListItem
          v-for="order in orders"
          :key="order.title"
        >
          <template #prepend>
            <VAvatar
              rounded
              variant="tonal"
              :color="order.avatarColor"
            >
              <VIcon :icon="order.avatarIcon" />
            </VAvatar>
          </template>

          <VListItemTitle class="mb-1">
            {{ order.title }}
          </VListItemTitle>
          <VListItemSubtitle class="text-disabled">
            {{ order.subtitle }}
          </VListItemSubtitle>

          <template #append>
            <span>{{ order.amount }}</span>
          </template>
        </VListItem>
      </VList>
    </VCardText>
  </VCard>

    </v-row>
    
      <!-- Section des statistiques globales -->
  <v-row align="center" justify="center">
    <!-- Carte pour les statistiques globales -->
   
    <!--card total statistique-->
   <div>
    <Card />
   </div>
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
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'
import { computed } from 'vue';
import { ref } from 'vue';
import Alerte from './Alerte.vue';
import Card from './Card.vue';










/*const chartOptions = {
scales: {
  y: {
    beginAtZero: true,
  },
},
};*/



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
/*const orders = [
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
];*/
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

/*transaction*/
const transactions = [
  {
    amount: +82.6,
    paymentMethod: 'Paypal',
    description: 'Send money',
    icon: 'mdi-paypal',
    color: 'error',
  },
  {
    paymentMethod: 'Wallet',
    amount: +270.69,
    description: 'Mac\'D',
    icon: 'mdi-wallet',
    color: 'primary',
  },
  {
    amount: +637.91,
    paymentMethod: 'Transfer',
    description: 'Refund',
    icon: 'mdi-chart-line',
    color: 'info',
  },
  {
    paymentMethod: 'Credit Card',
    amount: -838.71,
    description: 'Ordered Food',
    icon: 'mdi-credit-card-plus',
    color: 'success',
  },
  {
    paymentMethod: 'Wallet',
    amount: +203.33,
    description: 'Starbucks',
    icon: 'mdi-wallet',
    color: 'primary',
  },
  {
    paymentMethod: 'Mastercard',
    amount: -92.45,
    description: 'Ordered Food',
    icon: 'mdi-credit-card-alert',
    color: 'warning',
  },
]



/*total revenu*/

function hexToRgb(hex) {
    // Enlevez le # du début s'il est présent
    hex = hex.replace(/^#/, '');

    // Divisez la chaîne hexadécimale en deux valeurs de couleur
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    // Retourne les valeurs RGB sous forme d'objet
    return { r, g, b };
}


const vuetifyTheme = useTheme()

const series = [
  45,
  80,
  20,
  40,
]

const chartOptions = computed(() => {
  const currentTheme = vuetifyTheme.current.value.colors
  const variableTheme = vuetifyTheme.current.value.variables
  const disabledTextColor = `rgba(${ hexToRgb(String(currentTheme['on-surface'])) },${ variableTheme['disabled-opacity'] })`
  const primaryTextColor = `rgba(${ hexToRgb(String(currentTheme['on-surface'])) },${ variableTheme['high-emphasis-opacity'] })`
  
  return {
    chart: {
      sparkline: { enabled: true },
      animations: { enabled: false },
    },
    stroke: {
      width: 6,
      colors: [currentTheme.surface],
    },
    legend: { show: false },
    tooltip: { enabled: false },
    dataLabels: { enabled: false },
    labels: [
      'Fashion',
      'Electronic',
      'Sports',
      'Decor',
    ],
    colors: [
      currentTheme.success,
      currentTheme.primary,
      currentTheme.secondary,
      currentTheme.info,
    ],
    grid: {
      padding: {
        top: -7,
        bottom: 5,
      },
    },
    states: {
      hover: { filter: { type: 'none' } },
      active: { filter: { type: 'none' } },
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: '75%',
          labels: {
            show: true,
            name: {
              offsetY: 17,
              fontSize: '14px',
              color: disabledTextColor,
              fontFamily: 'Public Sans',
            },
            value: {
              offsetY: -17,
              fontSize: '24px',
              color: primaryTextColor,
              fontFamily: 'Public Sans',
            },
            total: {
              show: true,
              label: 'Weekly',
              fontSize: '14px',
              formatter: () => '38%',
              color: disabledTextColor,
              fontFamily: 'Public Sans',
            },
          },
        },
      },
    },
  }
})

const orders = [
  {
    amount: '82.5k',
    title: 'Electronic',
    avatarColor: 'primary',
    subtitle: 'Mobile, Earbuds, TV',
    avatarIcon: 'bx-mobile-alt',
  },
  {
    amount: '23.8k',
    title: 'Fashion',
    avatarColor: 'success',
    subtitle: 'Tshirt, Jeans, Shoes',
    avatarIcon: 'bx-closet',
  },
  {
    amount: 849,
    title: 'Decor',
    avatarColor: 'info',
    subtitle: 'Fine Art, Dining',
    avatarIcon: 'bx-home',
  },
  {
    amount: 99,
    title: 'Sports',
    avatarColor: 'secondary',
    subtitle: 'Football, Cricket Kit',
    avatarIcon: 'bx-football',
  },
]

const moreList = [
  {
    title: 'Share',
    value: 'Share',
  },
  {
    title: 'Refresh',
    value: 'Refresh',
  },
  {
    title: 'Update',
    value: 'Update',
  },
]
/* statistique revenu */


/*const series = [
  {
    name: `${ new Date().getFullYear() - 1 }`,
    data: [
      18,
      7,
      15,
      29,
      18,
      12,
      9,
    ],
  },
  {
    name: `${ new Date().getFullYear() - 2 }`,
    data: [
      -13,
      -18,
      -9,
      -14,
      -5,
      -17,
      -15,
    ],
  },
]

const chartOptions = computed(() => {
  const currentTheme = vuetifyTheme.current.value.colors
  const variableTheme = vuetifyTheme.current.value.variables
  const disabledTextColor = `rgba(${ hexToRgb(String(currentTheme['on-surface'])) },${ variableTheme['disabled-opacity'] })`
  const primaryTextColor = `rgba(${ hexToRgb(String(currentTheme['on-surface'])) },${ variableTheme['high-emphasis-opacity'] })`
  const borderColor = `rgba(${ hexToRgb(String(variableTheme['border-color'])) },${ variableTheme['border-opacity'] })`
  
  return {
    bar: {
      chart: {
        stacked: true,
        parentHeightOffset: 0,
        toolbar: { show: false },
      },
      dataLabels: { enabled: false },
      stroke: {
        width: 6,
        lineCap: 'round',
        colors: [currentTheme.surface],
      },
      colors: [
        `rgba(${ hexToRgb(String(currentTheme.primary)) }, 1)`,
        `rgba(${ hexToRgb(String(currentTheme.info)) }, 1)`,
      ],
      legend: {
        offsetX: -10,
        position: 'top',
        fontSize: '14px',
        horizontalAlign: 'left',
        fontFamily: 'Public Sans',
        labels: { colors: currentTheme.secondary },
        itemMargin: {
          vertical: 4,
          horizontal: 10,
        },
        markers: {
          width: 8,
          height: 8,
          radius: 10,
          offsetX: -4,
        },
      },
      states: {
        hover: { filter: { type: 'none' } },
        active: { filter: { type: 'none' } },
      },
      grid: {
        borderColor,
        padding: { bottom: 5 },
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          columnWidth: '30%',
          endingShape: 'rounded',
          startingShape: 'rounded',
        },
      },
      xaxis: {
        axisTicks: { show: false },
        crosshairs: { opacity: 0 },
        axisBorder: { show: false },
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
        ],
        labels: {
          style: {
            fontSize: '14px',
            colors: disabledTextColor,
            fontFamily: 'Public Sans',
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            fontSize: '14px',
            colors: disabledTextColor,
            fontFamily: 'Public Sans',
          },
        },
      },
      responsive: [
        {
          breakpoint: display.thresholds.value.xl,
          options: { plotOptions: { bar: { columnWidth: '43%' } } },
        },
        {
          breakpoint: display.thresholds.value.lg,
          options: { plotOptions: { bar: { columnWidth: '50%' } } },
        },
        {
          breakpoint: display.thresholds.value.md,
          options: { plotOptions: { bar: { columnWidth: '42%' } } },
        },
        {
          breakpoint: display.thresholds.value.sm,
          options: { plotOptions: { bar: { columnWidth: '45%' } } },
        },
      ],
    },
    radial: {
      chart: { sparkline: { enabled: true } },
      labels: ['Growth'],
      stroke: { dashArray: 5 },
      colors: [`rgba(${ hexToRgb(String(currentTheme.primary)) }, 1)`],
      states: {
        hover: { filter: { type: 'none' } },
        active: { filter: { type: 'none' } },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          opacityTo: 0.6,
          opacityFrom: 1,
          shadeIntensity: 0.5,
          stops: [
            30,
            70,
            100,
          ],
          inverseColors: false,
          gradientToColors: [currentTheme.primary],
        },
      },
      plotOptions: {
        radialBar: {
          endAngle: 150,
          startAngle: -140,
          hollow: { size: '55%' },
          track: { background: 'transparent' },
          dataLabels: {
            name: {
              offsetY: 25,
              fontWeight: 600,
              fontSize: '16px',
              color: currentTheme.secondary,
              fontFamily: 'Public Sans',
            },
            value: {
              offsetY: -15,
              fontWeight: 500,
              fontSize: '24px',
              color: primaryTextColor,
              fontFamily: 'Public Sans',
            },
          },
        },
      },
      responsive: [
        {
          breakpoint: 900,
          options: { chart: { height: 200 } },
        },
        {
          breakpoint: 735,
          options: { chart: { height: 200 } },
        },
        {
          breakpoint: 660,
          options: { chart: { height: 200 } },
        },
        {
          breakpoint: 600,
          options: { chart: { height: 280 } },
        },
      ],
    },
  }
})

const balanceData = [
  {
    icon: 'bx-dollar',
    amount: '$32.5k',
    year: '2023',
    color: 'primary',
  },
  {
    icon: 'bx-wallet',
    amount: '$41.2k',
    year: '2022',
    color: 'info',
  },
]*/
</script>