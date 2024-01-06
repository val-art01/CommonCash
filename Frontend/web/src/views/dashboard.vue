<template>



    <v-app id="inspire">
      <v-system-bar>
        <v-spacer></v-spacer>
  
        <v-icon>mdi-square</v-icon>
  
        <v-icon>mdi-circle</v-icon>
  
        <v-icon>mdi-triangle</v-icon>
      </v-system-bar>
  
      <v-navigation-drawer v-model="drawer">
        <v-sheet
          color="purple"
          class="pa-4"
        >
          <v-avatar
            class="mb-4"
            color="grey-darken-1"
            size="64"
          ></v-avatar>
  
          <div>john@google.com</div>
        </v-sheet>
  
        <v-divider></v-divider>
  
        <v-list>
          <v-list-item
            v-for="[icon, text] in links"
            :key="icon"
            :prepend-icon="icon"
            :title="text"
            link
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar app color="white" elevate-on-scroll>
      <v-app-bar-nav-icon> </v-app-bar-nav-icon>
      <v-toolbar-title>CommonCash</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon> <v-icon> mdi-heart </v-icon> </v-btn>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
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
      <v-container style="height: 1000px"> </v-container>
    </v-sheet>
  
      
    </v-app>
  </template>
  
  <script setup>
    import { ref } from 'vue'
  
    const cards = ['Today', 'Yesterday']
    const links = [
    ['mdi-cash-multiple', 'Nos Depenses'],
          ['mdi-account-group', 'Liste des groupes'],
          ['mdi-cash-refund', 'Remboursement'],
          ['mdi-currency-usd', 'Solde'],
          ['mdi-email', 'Messagerie'],
          ['mdi-chart-bar', 'Statistique'],
          ['mdi-account-circle', 'Mon profil'],
          ['mdi-logout', 'Deconnection'],
    ]     
  
    const drawer = ref(null)

    const handleNavigation = (text) => {
  if (text === 'Deconnexion') {
    // Appeler la méthode logout définie dans le composant
    logout();
  }
}



    
  </script>


  
  <script>
    export default {
      data: () => ({
        cards: ['Today', 'Yesterday'],
        drawer: null,
        links: [
          ['mdi-inbox-arrow-down', 'Nos Depenses'],
          ['mdi-send', 'Liste des groupes'],
          ['mdi-delete', 'Remboursement'],
          ['mdi-alert-octagon', 'Solde'],
          ['mdi-inbox-arrow-down', 'Messagerie'],
          ['mdi-send', 'Statistique'],

        ],
      }),
    }
  </script>