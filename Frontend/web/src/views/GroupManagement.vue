<template>
    <v-app id="inspire">
      <v-system-bar>
        <v-spacer></v-spacer>
        <v-icon>mdi-square</v-icon>
        <v-icon>mdi-circle</v-icon>
        <v-icon>mdi-triangle</v-icon>
      </v-system-bar>
  
      <v-navigation-drawer v-model="drawer">
        <v-sheet color="#6A1B9A" class="pa-4">
          <v-avatar class="mb-4" color="white" size="64"></v-avatar>
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
  
      <v-app-bar app color="#4A148C" elevate-on-scroll>
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
            <v-list-item v-for="n in 4" :key="n" @click="() => {}" color="#6A1B9A">
              Option {{ n }}
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
    <v-sheet color="#6A1B9A" class="pa-4">
      <v-container fluid fill-height>
        <v-row align="center" justify="end" style="height: 80vh; align-items: center;">
         
    
  
          <!-- Carte pour inviter un membre -->
          <v-col lg="4" cols="12" class="ml-3">
            <v-card elevation="2" class="rounded-lg mb-3">
              <v-card-title>
                Inviter un Nouveau Membre
              </v-card-title>
              <v-card-text>
                <v-form @submit.prevent="inviteMember">
                  <v-select
                    v-model="selectedGroup"
                    :items="groups"
                    item-text="name"
                    label="Sélectionnez un Groupe"
                  ></v-select>
                  <v-text-field v-model="newMemberName" label="Nom du Membre"></v-text-field>
                  <v-btn type="submit">Inviter</v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
  
          <!-- Liste des groupes -->
          <v-col lg="6" cols="12">
            <v-data-table
              :headers="tableHeaders"
              :items="groups"
              :items-per-page="5"
              class="elevation-1"
            >
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>Liste des groupes</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                  <v-dialog v-model="dialog" max-width="600px">
  <template v-slot:activator="{ on, attrs }">
    <v-form @submit.prevent="createGroup">
      <v-text-field v-model="newGroupName" label="Nom du Groupe"></v-text-field>
      <v-btn type="submit" class="mt-2 ml-9">Créer</v-btn>
    </v-form>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <v-text-field v-model="editedItem.name" class="mt-2 ml-0" label="Nom du Groupe"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">Annuler</v-btn>
        <v-btn color="blue darken-1" text @click="save">Enregistrer</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
                </v-toolbar>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
                <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
    </v-app>
  </template>
  
  <script setup>
  import { ref, reactive, onMounted } from 'vue';
  
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
  
 
  
  const groups = ref([
    { id: 1, name: 'Groupe 1', members: [{ name: 'Membre 1' }, { name: 'Membre 2' }] },
    { id: 2, name: 'Groupe 2', members: [{ name: 'Membre 3' }, { name: 'Membre 4' }] },
    // ... Ajoutez d'autres groupes si nécessaire
  ]);
  
  const headers = [
    { text: 'Nom du Groupe', align: 'start', value: 'name' },
    { text: 'Actions', value: 'actions', sortable: false },
  ];
  
  const editedItem = ref(null);
  const dialog = ref(false);
  
  const formTitle = ref('');
  const tableHeaders = reactive(headers);
  
  const editItem = (item) => {
    editedItem.value = Object.assign({}, item);
    formTitle.value = 'Modifier le Groupe';
    dialog.value = true;
  };
  
  const deleteItem = (item) => {
    const index = groups.value.indexOf(item);
    groups.value.splice(index, 1);
  };
  
  const close = () => {
    editedItem.value = {};
    dialog.value = false;
  };
  
  const save = () => {
    if (editedItem.value.id === undefined) {
      // Nouveau groupe
      groups.value.push(editedItem.value);
    } else {
      // Modifier le groupe existant
      const index = groups.value.findIndex((g) => g.id === editedItem.value.id);
      groups.value.splice(index, 1, editedItem.value);
    }
  
    close();
  };
  
  onMounted(() => {
    // Assurez-vous de modifier ces valeurs pour refléter vos données réelles
    groups.value.forEach((group) => {
      group.actions = true;
    });
  });
  
  const inviteMember = () => {
  if (selectedGroup.value && newMemberName.value) {
    const group = groups.value.find(g => g.id === selectedGroup.value);
    if (group) {
      group.members = group.members || [];
      group.members.push({ name: newMemberName.value });
      newMemberName.value = '';
      selectedGroup.value = null;
    }
  }
};
  const newGroupName = ref('');
  const selectedGroup = ref(null);
  const newMemberName = ref('');

  const createGroup = () => {
  if (newGroupName.value) {
    const newGroup = { id: groups.length + 1, name: newGroupName.value, members: [] };
    groups.value.push(newGroup);
    newGroupName.value = '';
  }
};
  </script>
  
  <style scoped>
  /* Ajoutez vos styles ici si nécessaire */
  </style>
  