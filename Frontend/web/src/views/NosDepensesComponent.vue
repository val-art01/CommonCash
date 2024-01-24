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
  <v-list-item-title color="black">
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
      <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="headline">Déclaration de Dépense</v-card-title>
          <v-card-text>

  <v-form @submit.prevent="submitExpense">
    <!-- Champ pour le titre de la dépense -->
    <v-text-field v-model="expense.title" label="Titre de la Dépense" required></v-text-field>

    <!-- Champ pour le montant de la dépense -->
    <v-text-field v-model="expense.amount" label="Montant" type="number" required></v-text-field>

    <!-- Sélection de la catégorie de la dépense -->
    <v-select v-model="expense.category" :items="categories" label="Catégorie" required></v-select>

    <v-file-input v-model="expense.receipt" label="Justificatif de la Dépense"></v-file-input>

     <!-- Sélection du groupe de la dépense -->
     <v-select v-model="expense.group" :items="groups" label="Groupe" required></v-select>

     <v-chip v-for="(member, index) in expense.members" :key="index" class="mr-2" label color="primary">
      {{ member }}
    </v-chip>
    <v-autocomplete
  v-model="newMember"
  :items="groupMembers"
  label="Ajouter un membre"
  item-text="name"
  item-value="id"
  @change="addMember"
></v-autocomplete>

 <!-- Pondérations des membres -->
 <v-card>
      <v-card-title>Pondération des Membres :</v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item-group>
            <v-list-item v-for="(member, index) in expense.members" :key="index">
              <v-list-item-content>
                <v-list-item-title>
                  {{ member }} (Pondération : {{ expense.weights[index] }}%)
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>

    <!-- Date de la dépense -->
    <v-date-picker v-model="expense.date" label="Date de la Dépense" required></v-date-picker>



    <!-- Autres champs de collecte d'informations (ajoutez autant que nécessaire) -->

    <!-- Bouton pour soumettre la dépense -->
    <v-btn type="submit" color="primary">
  {{ isEditing ? 'Modifier la Dépense' : 'Soumettre la Dépense' }}
</v-btn>

  </v-form>
</v-card-text>
        </v-card>

  <!-- Affichage des informations de la dépense -->
  <v-card v-if="expense.members ||expense.group ||expense.title || expense.amount || expense.category || expense.date || expense.receipt">
    <v-card-title>Informations de la Dépense</v-card-title>
    <v-card-text>
      <p><strong>Groupe :</strong> {{ expense.group }}</p>
      <p><strong>Titre :</strong> {{ expense.title }}</p>
      <p><strong>Montant :</strong> {{ expense.amount }}</p>
      <p><strong>Catégorie :</strong> {{ expense.category }}</p>
      <p><strong>Liste des membres :</strong> {{ expense.members }}</p>
      <p><strong>Date :</strong> {{ expense.date }}</p>
      <p><strong>Justificatif :</strong> {{ expense.receipt }}</p>
      <!-- Ajoutez d'autres champs au besoin -->
    </v-card-text>
  </v-card>

  <v-card>
    <v-card-title>Tableau des Dépenses de Groupe</v-card-title>
    <v-card-text>
      <!-- Tableau des dépenses enregistrées -->
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Groupe</th>
              <th class="text-left">Titre</th>
              <th class="text-left">Montant (€)</th>
              <th class="text-left">Catégorie</th>
              <th class="text-left">Liste des membres</th>
              <th class="text-left">Date</th>
              <th class="text-left">Justificatif</th>
              <th class="text-left">Actions</th> 
            </tr>
          </thead>
          <tbody>
            <tr v-for="(savedExpense, index) in savedExpenses" :key="index">
              <td>{{ savedExpense.group }}</td>
              <td>{{ savedExpense.title }}</td>
              <td>{{ formatCurrency(savedExpense.amount) }}</td>
              <td>{{ savedExpense.category }}</td>
              <td>{{ savedExpense.date }}</td>
              <td>{{ savedExpense.members }}</td>
              <td>{{ savedExpense.receipt }}</td>
              <td>
                <!-- Boutons d'édition -->
                <v-icon @click="editExpense(index)">mdi-pencil</v-icon> <!-- Bouton de modification -->
                <v-icon @click="deleteExpense(index)">mdi-delete</v-icon> <!-- Bouton de suppression -->
              </td>

            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card-text>
  </v-card>

      </v-col>
    </v-row>
  </v-container>
  
</v-sheet>


    <Login @login-success="handleLoginSuccess" />
  </v-app>
</template>

<script setup>

import { ref } from 'vue';


const groups = ['Groupe 1', 'Groupe 2', 'Groupe 3'];


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
drawer.value = !drawer.value; 
};

const expense = ref({
  group:'',
  title: '',
  amount: 0,
  members: [], // Nouvelle propriété pour les membres concernés
  weights: [], // Nouvelle propriété pour les pondérations des membres
  category: null,
  date: null,
  receipt: null,
});

const categories = ['Alimentation', 'Transport', 'Logement', 'Divertissement', 'Autre'];

const savedExpenses = ref([]);

const isEditing = ref(false);

const editedExpenseIndex = ref(null);

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);
};

const submitExpense = () => {
  if (isEditing.value) {
    savedExpenses.value.splice(editedExpenseIndex, 1, { ...expense.value });
    isEditing.value = false;
    editedExpenseIndex.value = null;
  } else {
    savedExpenses.value.push({ ...expense.value });
  }
  expense.value = {
    group:'',
    title: '',
    amount: 0,
    members: [], // Nouvelle propriété pour les membres concernés
  weights: [], // Nouvelle propriété pour les pondérations des membres
    category: null,
    date: null,
    receipt: null,
  };
};

const editExpense = (index) => {
  const selectedExpense = savedExpenses.value[index];
  expense.value = { ...selectedExpense };
  isEditing.value = true;
};

const deleteExpense = (index) => {
  savedExpenses.value.splice(index, 1);
};

const newMember = ref(''); // Nouveau membre à ajouter
const groupMembers = ['Alice', 'Bob', 'Charlie', 'David']; // Remplacez cela par les membres réels du groupe

// Méthode pour ajouter un nouveau membre
const addMember = () => {
  if (newMember.value && !expense.members.includes(newMember.value)) {
    expense.members.push(newMember.value);
    expense.weights.push(0); // Ajoutez une pondération initiale (vous pouvez ajuster cela selon vos besoins)
    newMember.value = ''; // Réinitialisez le champ pour le prochain ajout
  }
};

// Méthode pour supprimer un membre
const removeMember = (index) => {
  expense.members.splice(index, 1);
  expense.weights.splice(index, 1);
};


</script>


