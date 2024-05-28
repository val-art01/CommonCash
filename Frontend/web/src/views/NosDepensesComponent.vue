<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" color="#B39DDB">
      <v-img height="172" class="pa-4" src="https://fr.pngtree.com/freepng/automatic-floating-bubble-illustration_4701485.html">
        <div class="text-center">
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
      <v-text-field v-model="search" append-icon="mdi-magnify" label="Recherche" single-line hide-details></v-text-field>
      <v-btn icon><v-icon>mdi-bell</v-icon></v-btn>
      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-badge dot location="bottom right" offset-x="3" offset-y="3" color="success" bordered>
            <v-avatar class="cursor-pointer" color="primary" variant="tonal">
              <v-icon>mdi-account-circle</v-icon>
            </v-avatar>
          </v-badge>
        </template>
        <v-list>
          <v-list-item v-for="n in 4" :key="n" @click="() => {}" color="#6A1B9A">Option {{ n }}</v-list-item>
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
                  <v-text-field v-model="expense.title" label="Titre de la Dépense" required></v-text-field>
                  <v-text-field v-model="expense.amount" label="Montant" type="number" required></v-text-field>
                  <v-select v-model="expense.category" :items="categories" label="Catégorie" required></v-select>
                  <v-file-input v-model="expense.receipt" label="Justificatif de la Dépense"></v-file-input>
                  <v-select v-model="expense.group" :items="groupNames" label="Groupe" required @change="fetchGroupMembers"></v-select>

                  <v-chip v-for="(member, index) in expense.members" :key="index" class="mr-2" label color="primary">{{ member }}</v-chip>
                  <v-autocomplete v-model="newMember" :items="groupMembers" label="Ajouter un membre" item-text="name" item-value="id" @change="addMember"></v-autocomplete>

                  <v-card>
                    <v-card-title>Pondération des Membres :</v-card-title>
                    <v-card-text>
                      <v-list>
                        <v-list-item-group>
                          <v-list-item v-for="(member, index) in expense.members" :key="index">
                            <v-list-item-content>
                              <v-list-item-title>{{ member }} (Pondération : {{ expense.weights[index] }}%)</v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list-item-group>
                      </v-list>
                    </v-card-text>
                  </v-card>

                  <v-date-picker v-model="expense.date" label="Date de la Dépense" required></v-date-picker>
                  <v-btn @click="submitExpense" type="submit" color="primary">
                    {{ isEditing ? 'Modifier la Dépense' : 'Soumettre la Dépense' }}
                  </v-btn>
                </v-form>
              </v-card-text>
            </v-card>

            <v-card v-if="expense.members || expense.group || expense.title || expense.amount || expense.category || expense.date || expense.receipt">
              <v-card-title>Informations de la Dépense</v-card-title>
              <v-card-text>
                <p><strong>Groupe :</strong> {{ expense.group }}</p>
                <p><strong>Titre :</strong> {{ expense.title }}</p>
                <p><strong>Montant :</strong> {{ expense.amount }}</p>
                <p><strong>Catégorie :</strong> {{ expense.category }}</p>
                <p><strong>Liste des membres :</strong> {{ expense.members }}</p>
                <p><strong>Date :</strong> {{ expense.date }}</p>
                <p><strong>Justificatif :</strong> {{ expense.receipt }}</p>
              </v-card-text>
            </v-card>

            <v-card>
              <v-card-title>Tableau des Dépenses de Groupe</v-card-title>
              <v-card-text>
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
                          <v-icon @click="editExpense(index)">mdi-pencil</v-icon>
                          <v-icon @click="deleteExpense(index)">mdi-delete</v-icon>
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
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axiosAPI from '@/services/expenseService.js'

const drawer = ref(null);
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

const expense = ref({
  group: '',
  title: '',
  amount: 0,
  members: [],
  weights: [],
  category: null,
  date: null,
  receipt: null,
});

const savedExpenses = ref([]);
const search = ref('');
const newMember = ref('');
const groupNames = ref([]);
const groupMembers = ref([]);
const categories = ref(['Alimentation', 'Transport', 'Logement', 'Divertissement', 'Autre']);

const fetchGroups = async () => {
  try {
    const response = await axiosAPI.getAllGroup();
    groupNames.value = response.data.map(group => ({ text: group.name, value: group._id }));
  } catch (error) {
    console.error('Erreur lors de la récupération des groupes :', error);
  }
};

const fetchGroupMembers = async (groupId) => {
  try {
    const response = await axiosAPI.getGroupMembers(groupId);
    groupMembers.value = response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des membres du groupe :', error);
  }
};

const addMember = (member) => {
  if (member && !expense.value.members.includes(member)) {
    expense.value.members.push(member);
  }
};

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

const submitExpense = async () => {
  try {
    const response = await axiosAPI.createSpend(expense.value);
    console.log(response.data);
    expense.value = {
      group: '',
      title: '',
      amount: 0,
      members: [],
      weights: [],
      category: null,
      date: null,
      receipt: null,
    };
    await getSpendDetail(response.data.expenseId);
  } catch (error) {
    console.error('Erreur lors de la création de la dépense :', error);
  }
};

const getSpendDetail = async (expenseId) => {
  try {
    const response = await axiosAPI.getSpendDetail(expenseId);
    console.log(response.data);
  } catch (error) {
    console.error('Erreur lors de la récupération des détails de la dépense :', error);
  }
};

onMounted(() => {
  fetchGroups();
});
</script>

<style>
.custom-list-item {
  color: black;
  transition: color 0.3s ease;
}

.custom-list-item:hover {
  color: white;
}
</style>


