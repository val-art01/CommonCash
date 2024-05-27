<template>
  <Navbar />
  <v-container>
    <v-row class="mb-6">
      <v-col>
        <h1>Détails du Remboursement</h1>
        <p>{{ utilisateur.nom }} vous doit {{ remboursement.montant }} {{ remboursement.devise }}</p>
        <v-btn color="primary" @click="envoyerRappel">Envoyer un Rappel</v-btn>
        <v-btn color="success" @click="payer">Payer</v-btn>
      </v-col>
    </v-row>

    <v-row class="mb-6">
      <v-col>
        <h2>Liste des Transactions</h2>
        <v-data-table :headers="transactionHeaders" :items="transactions" class="elevation-1">
          <template v-slot:item.amount="{ item }">
            <span :class="{'text-red': item.amount < 0, 'text-green': item.amount > 0}">
              {{ item.amount }} {{ remboursement.devise }}
            </span>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <v-row class="mb-6">
      <v-col>
        <h2>État du Remboursement</h2>
        <p>Statut: {{ remboursement.statut }}</p>
      </v-col>
    </v-row>

    <v-row class="mb-6">
      <v-col>
        <v-btn color="primary" @click="modifierRemboursement">Modifier Remboursement</v-btn>
        <v-btn color="error" @click="annulerRemboursement">Annuler Remboursement</v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <!-- Autres éléments ou actions -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Navbar from './navbar.vue';

export default {
  components: {
    Navbar
  },
  data() {
    return {
      remboursement: {
        montant: 50,
        devise: '€',
        statut: 'En Attente'
      },
      utilisateur: {
        nom: 'Utilisateur1'
      },
      transactions: [
        { id: 1, date: '2024-05-24', description: 'groupe1', amount: -50 },
        { id: 2, date: '2024-05-24', description: 'Remboursement', amount: 50 },
      ],
      transactionHeaders: [
        { text: 'Date', value: 'date' },
        { text: 'Description', value: 'description' },
        { text: 'Montant', value: 'amount' },
      ]
    };
  },
  methods: {
    envoyerRappel() {
      // Logique pour envoyer un rappel à l'utilisateur
    },
    payer() {
      // Logique pour effectuer le paiement à l'utilisateur
    },
    modifierRemboursement() {
      // Logique pour modifier le remboursement
    },
    annulerRemboursement() {
      // Logique pour annuler le remboursement
    }
  }
};
</script>

<style scoped>
.text-red {
  color: red;
}
.text-green {
  color: green;
}
</style>
