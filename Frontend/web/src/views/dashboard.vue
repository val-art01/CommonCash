<template>
    <v-app id="inspire">
      <v-system-bar>
        <v-spacer></v-spacer>
        <v-icon>mdi-square</v-icon>
        <v-icon>mdi-circle</v-icon>
        <v-icon>mdi-triangle</v-icon>
      </v-system-bar>
  
      <v-navigation-drawer v-model="drawer">
        <v-sheet color="purple" class="pa-4">
          <v-avatar class="mb-4" color="grey-darken-1" size="64"></v-avatar>
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
  
      <v-app-bar app color="white" elevate-on-scroll>
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
            <v-list-item v-for="n in 4" :key="n" @click="() => {}">
              Option {{ n }}
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
  
      <v-sheet>
        <v-container fluid fill-height>
          <v-row align="center" justify="center" style="height: 100vh; align-items: center;">
            <v-col lg="7" cols="12">
              <v-alert dense text type="success" class="mt-16">
                Login Successfully! Welcome to <strong>CommonCash</strong>
              </v-alert>
              <v-row>
                <v-col lg="6" cols="12" v-for="(item, index) in activityLog" :key="index">
                  <v-card elevation="2" class="rounded-lg">
                    <v-card-text class="d-flex justify-space-between align-center">
                      <div>
                        <strong>{{ item.title }}</strong> <br>
                        <span>Last 3 weeks</span>
                      </div>
                      <v-avatar size="60" :color="item.color" style="border: 3px solid #444">
                        <span style="color: white">{{ item.amount }} +</span>
                      </v-avatar>
                    </v-card-text>
                    <v-card-actions class="d-flex justify-space-between">
                      <!-- Ajoutez du contenu ici si nécessaire -->
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
      <Login @login-success="handleLoginSuccess" />
    </v-app>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
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
  const activityLog = ref([
    { title: 'Item 1', amount: 10, color: 'blue' },
    { title: 'Item 2', amount: 15, color: 'green' },
    // Ajoutez d'autres éléments si nécessaire//
  ]);
  
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