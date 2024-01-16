<template>
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
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
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
  
  