<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" color="#2A0050" app>
      <v-img height="172" class="pa-4" src="https://fr.pngtree.com/freepng/automatic-floating-bubble-illustration_4701485.html">
        <div class="text-center">
          <h2 class="white--text" color="#4A148C">Donia Laajili</h2>
        </div>
      </v-img>
      <v-divider></v-divider>
      <router-link v-for="[icon, text] in links" :key="icon" :to="{ name: text }">
        <v-list-item :prepend-icon="icon" link class="custom-list-item">
          <v-list-item-title>{{ text }}</v-list-item-title>
        </v-list-item>
      </router-link>
    </v-navigation-drawer>

    <v-app-bar app color="#4A148C" elevate-on-scroll>
      <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title>CommonCash</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="mdi-magnify" label="Recherche" single-line hide-details></v-text-field>
      <v-menu location="bottom right" transition="slide-y-transition">
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
            <template v-slot:prepend>
              <v-avatar size="40" :color="message.color">
                <v-icon color="white">{{ message.icon }}</v-icon>
              </v-avatar>
            </template>
            <template v-slot:append>
              <div class="full-h d-flex align-center">
                <span class="text-body-2 text-grey">{{ message.time }}</span>
              </div>
            </template>
            <div>
              <v-list-item-title class="font-weight-bold text-primary">{{ message.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ message.subtitle }}</v-list-item-subtitle>
            </div>
          </v-list-item>
          <div class="text-center py-5">
            <v-btn size="small" variant="elevated" elevation="1">See all</v-btn>
          </div>
        </v-list>
      </v-menu>

      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-badge dot location="bottom right" offset-x="3" offset-y="3" color="success" bordered>
            <v-avatar class="cursor-pointer" color="primary" variant="tonal">
              <v-icon>mdi-account-circle</v-icon>
            </v-avatar>
          </v-badge>
        </template>
        <v-list>
          <v-list-item v-for="n in 4" :key="n" @click="() => {}" color="#6A1B9A">
            Option {{ n }}
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  
    <v-container>
      <!-- En-tête de la page -->
      <v-row class="mb-6">
        <v-col>
          <h1>Solde de votre compte</h1>
          <p>Bonjour, {{ userName }}</p>
        </v-col>
      </v-row>

      <!-- Solde actuel -->
      <v-row class="mb-6">
        <v-col>
          <v-card>
            <v-card-title>Solde actuel</v-card-title>
            <v-card-text class="display-1">{{ currentBalance }} {{ currency }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Détail des comptes -->
      <v-row class="mb-6">
        <v-col>
          <v-card>
            <v-card-title>Détail des comptes</v-card-title>
            <v-list>
              <v-list-item v-for="account in accounts" :key="account.id" link>
                <v-list-item-content>
                  <v-list-item-title>{{ account.name }}</v-list-item-title>
                  <v-list-item-subtitle>{{ account.balance }} {{ account.currency }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>

      <!-- Transactions récentes -->
      <v-row class="mb-6">
        <v-col>
          <v-card>
            <v-card-title>Transactions récentes</v-card-title>
            <v-data-table :headers="transactionHeaders" :items="transactions" class="elevation-1">
              <template v-slot:item.amount="{ item }">
                <span :class="{'text-red': item.amount < 0, 'text-green': item.amount > 0}">
                  {{ item.amount }} {{ currency }}
                </span>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>

      <!-- Graphiques et visualisations -->
      <v-row class="mb-6">
        <v-col>
          <Test />
        </v-col>
      </v-row>

      <!-- Actions rapides -->
      <v-row class="mb-6">
        <v-col>
          <v-btn color="primary" @click="transferMoney">Transférer de l'argent</v-btn>
          <v-btn color="secondary" @click="depositMoney">Dépôt/Retrait</v-btn>
          <v-btn color="success" @click="exportStatement">Exporter le relevé</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Test from './test.vue';

export default {
  name: 'BalancePage',
  components: {
    Test
  },
  setup() {
    const userName = ref('Utilisateur');
    const currentBalance = ref(0);
    const currency = ref('€');
    const accounts = ref([]);
    const transactions = ref([]);

    const drawer = ref(false);
    const search = ref('');
    const messages = [
      {
        title: "Brunch this weekend?",
        color: "primary",
        icon: "mdi-account-circle",
        subtitle:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint, repudiandae?",
        time: "3 min",
      },
      // other messages
    ];
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

    const transactionHeaders = [
      { text: 'Date', value: 'date' },
      { text: 'Description', value: 'description' },
      { text: 'Montant', value: 'amount' },
    ];

    const fetchBalances = async () => {
      try {
        const response = await axios.get('/api/balances');
        const { balances } = response.data;
        // Assuming balances is an array of account details
        accounts.value = balances;
        currentBalance.value = balances.reduce((sum, account) => sum + account.balance, 0);
      } catch (error) {
        console.error('Erreur lors de la récupération des soldes:', error);
      }
    };

    onMounted(() => {
      fetchBalances();
    });

    const transferMoney = () => {
      // Logique pour transférer de l'argent
    };

    const depositMoney = () => {
      // Logique pour dépôt/retrait
    };

    const exportStatement = () => {
      // Logique pour exporter le relevé
    };

    const toggleDrawer = () => {
      drawer.value = !drawer.value;
    };

    return {
      userName,
      currentBalance,
      currency,
      accounts,
      transactions,
      transactionHeaders,
      transferMoney,
      depositMoney,
      exportStatement,
      drawer,
      toggleDrawer,
      search,
      messages,
      links,
    };
  },
};
</script>

<style scoped>
.text-red {
  color: red;
}
.text-green {
  color: green;
}
#inspire {
  font-family: 'Roboto', sans-serif;
}
/*.custom-list-item {
  color: white;
}
.v-list-item__prepend-icon {
  color: white;
}*/
</style>


