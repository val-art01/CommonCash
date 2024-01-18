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
        <v-container>
      <h2>Liste des Groupes</h2>
  
      <v-list-item-group v-if="groups.length > 0">
        <v-list-item v-for="group in groups" :key="group.id">
          <v-list-item-content>
            <v-list-item-title>{{ group.name }}</v-list-item-title>
            <!-- Affichez la liste des membres -->
            <v-list-item-subtitle v-for="member in group.members" :key="member.name">
              {{ member.name }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <!-- Ajoutez des boutons pour modifier ou supprimer un groupe -->
          <v-list-item-action>
            <v-btn @click="editGroup(group)">Modifier</v-btn>
            <v-btn @click="deleteGroup(group)">Supprimer</v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list-item-group>
  
      <h2>Créer un Nouveau Groupe</h2>
  
      <!-- Formulaire de création de groupe -->
      <v-form @submit.prevent="createGroup">
        <v-text-field v-model="newGroupName" label="Nom du Groupe"></v-text-field>
        <v-btn type="submit">Créer</v-btn>
      </v-form>
  
      <h2>Inviter des Membres</h2>
  
      <!-- Formulaire d'invitation de membres -->
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

const groups = ref([
    { id: 1, name: 'Groupe 1', members: [{ name: 'Membre 1' }, { name: 'Membre 2' }] },
    { id: 2, name: 'Groupe 2', members: [{ name: 'Membre 3' }, { name: 'Membre 4' }] },
    // ... Ajoutez d'autres groupes si nécessaire
  ]);
  
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
  
  const editGroup = (group) => {
    // Ajoutez la logique pour modifier un groupe
    console.log('Modifier le groupe :', group);
  };
  
  const deleteGroup = (group) => {
    // Ajoutez la logique pour supprimer un groupe
    console.log('Supprimer le groupe :', group);
  };
  </script>
  
  <style scoped>
.custom-list-item .v-list-item__title {
  text-decoration: none; /* Pour supprimer le soulignement du texte */
  color: violet; /* Changer la couleur du texte en violet (ou la couleur souhaitée) */
}
</style>



