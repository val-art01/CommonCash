<template>
    <v-app id="inspire">
      <v-system-bar>
        <v-spacer></v-spacer>
        <v-icon>mdi-square</v-icon>
        <v-icon>mdi-circle</v-icon>
        <v-icon>mdi-triangle</v-icon>
      </v-system-bar>
  
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
    <v-list-item-title color="">
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
    
  </v-sheet>
 

      <Login @login-success="handleLoginSuccess" />
    </v-app>
  </template>
  
  <script setup>

  import { ref } from 'vue';




  
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



const toggleDrawer = () => {
  drawer.value = !drawer.value; // Inverse la valeur actuelle (true devient false, et vice versa)
};
  </script>
  
  <style scoped>
.custom-list-item .v-list-item__title {
  text-decoration: none; /* Pour supprimer le soulignement du texte */
  color: violet; /* Changer la couleur du texte en violet (ou la couleur souhaitée) */
}
</style>