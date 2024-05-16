<template>
  <v-app>
    
 
    <v-navigation-drawer
      color="grey-lighten-3"
      rail
    >
      <v-avatar
        class="d-block text-center mx-auto mt-4"
        color="grey-darken-1"
        size="36"
      ></v-avatar>

      <v-divider class="mx-3 my-5"></v-divider>

      <v-avatar
        v-for="n in 6"
        :key="n"
        class="d-block text-center mx-auto mb-9"
        color="grey-lighten-1"
        size="28"
      ></v-avatar>
    </v-navigation-drawer>

    
<!--
    <v-app-bar
      class="px-3"
      color="grey-lighten-4"
      flat
      height="72"
    >-->
      <v-spacer></v-spacer>

     <!-- <v-responsive max-width="156">
        <v-text-field
          bg-color="grey-lighten-1"
          density="compact"
          flat
          hide-details
          rounded="pill"
          variant="solo-filled"
        ></v-text-field>
      </v-responsive>-->
    

    <v-main>
      <!-- Votre contenu principal ici -->
      <v-content>
        <!-- Barre de navigation de messagerie -->
        <v-app-bar app>
          <v-toolbar-title>Messagerie</v-toolbar-title>
          <v-container>
            
            <v-row>
              <v-col v-if="selectedContact" cols="2">
                <v-divider vertical></v-divider>
              </v-col>
              <v-col v-if="selectedContact" cols="10">
                <v-toolbar color="grey lighten-3">
                  <v-avatar>
                    <v-icon :color="selectedContact.avatarColor">{{ selectedContact.avatar }}</v-icon>
                  </v-avatar>
                  
                  <v-toolbar-title>{{ selectedContact.username }}</v-toolbar-title>
                </v-toolbar>
                
              </v-col>
            </v-row>
          </v-container>
          
          
     
        </v-app-bar>

       <!-- Barre des listes des messages -->
       <v-col :cols="showDiscussion ? 8 : 12">
  <!-- Boutons à l'extérieur de la barre latérale -->
  <v-btn icon @click="closeDrawer" v-if="isDrawerOpen">
    <v-icon>mdi-close</v-icon>
  </v-btn>
  <v-btn icon @click="openDrawer" v-else>
    <v-icon>mdi-format-list-bulleted</v-icon>
  </v-btn>

  <v-navigation-drawer v-model="isDrawerOpen" :width="drawerWidth">
    <v-sheet color="grey-lighten-4" class="pa-4">
      <div>Liste des messages</div>
      <v-responsive max-width="156">
        <v-text-field
          v-model="searchQuery"
          label="Rechercher des messages par contact"
          outlined
          clearable
          @input="searchMessages"
        ></v-text-field>
      </v-responsive>
    </v-sheet>
    <v-divider></v-divider>
    <v-list>
                <v-list-item v-for="contact in filteredContacts" :key="contact.id" @click="openChatWith(contact)" link>
                  <v-list-item-avatar>
                    <v-icon :color="contact.avatarColor">{{ contact.avatar }}</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>{{ contact.username }}</v-list-item-title>
                    <v-list-item-subtitle>{{ contact.lastMessage }}</v-list-item-subtitle>
                    <v-list-item-subtitle>{{ formatDateTime(contact.lastMessageDate) }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-navigation-drawer>
          </v-col>


        <!-- Section de fil de discussion ou messagerie privée -->
        <v-container>
          <!-- Ajoutez ici la logique pour afficher la fenêtre de discussion avec le contact sélectionné -->
        </v-container>
      
       <!-- Section de discussion ou messagerie privée -->
       <v-container v-if="privateMessagesVisible">
  <v-row>
    <v-col v-if="selectedContact" :cols="showDiscussion ? 8 : 0">
      <div v-if="showDiscussion">
        <h2>Discussion avec {{ selectedContact.username }}</h2>
        <div v-for="message in selectedContact.messages" :key="message.id">
          {{ message.sender }}: {{ message.content }}
        </div>
        <v-textarea v-model="newMessage" placeholder="Écrire un message"></v-textarea>
        <v-btn @click="sendMessage">Envoyer</v-btn>
      </div>
    </v-col>
  </v-row>
  <v-dialog v-model="chatDialogOpen" persistent max-width="600">
    <v-card>
      <v-toolbar color="primary" dark>
        <v-btn icon @click="chatDialogOpen = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Discussion avec {{ selectedContact.username }}</v-toolbar-title>
      </v-toolbar>

      <v-card-text>
        <!-- Contenu de la fenêtre de discussion -->
        <div v-for="message in selectedContact.messages" :key="message.id">
          {{ message.sender }}: {{ message.content }}
        </div>
        <v-textarea v-model="newMessage" placeholder="Écrire un message"></v-textarea>
        <v-btn @click="sendMessage">Envoyer</v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>


    </v-container>
    </v-content>
    </v-main>
 
    <v-navigation-drawer location="right">
      <v-list>
        <v-list-item
          v-for="n in 5"
          :key="n"
          :title="`Item ${ n }`"
          link
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-footer app height="72">
      <v-text-field
        bg-color="gray"
        class="overflow-hidden"
        density="compact"
        flat
        hide-details
        rounded="pill"
        variant="solo-filled"
        
      ></v-text-field>
      <v-btn @click="sendMessage">
      <v-icon>mdi-send</v-icon>
    
    </v-btn>
    </v-footer>

 
</v-app>
</template>


<script setup>

import { ref, computed } from 'vue';

const drawer = ref(null);
const currentSection = ref('general');
const privateMessagesVisible = ref(false);





const searchQuery = ref("");
const contacts = ref([
  { id: 1, username: "Bob", messages: [{ sender: "Utilisateur1", content: "Bonjour!" }], avatar:"mdi-account-circle", avatarColor: "blue"},
  { id: 2, username: "Donia", messages: [{ sender: "Utilisateur2", content: "Salut!" }], avatar:"mdi-account-circle", avatarColor: "green" },
  { id: 1, username: "Wary", messages: [{ sender: "Utilisateur3", content: "Hi!" }], avatar:"mdi-account-circle", avatarColor: "purple"},
  { id: 2, username: "Roby", messages: [{ sender: "Utilisateur4", content: "Hiiiiiii" }], avatar:"mdi-account-circle", avatarColor: "red" },

  // ... Ajoutez d'autres contacts ici
]);

contacts.value.forEach(contact => {
  contact.lastMessage = contact.messages.length > 0 ? contact.messages[contact.messages.length - 1].content : "";
});

const selectedContact = ref(null);
const newMessage = ref("");

const filteredContacts = computed(() => {
  // Filtrer les contacts en fonction de la recherche
  return contacts.value.filter((contact) =>
    contact.username.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});


const formatDateTime = (dateTimeString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  return new Date(dateTimeString).toLocaleDateString('fr-FR', options);
};
const toggleSection = (section) => {
  currentSection.value = section;
};

const userInfoPanelOpen = ref(false);

const toggleNotifications = () => {
  // Logique de gestion des notifications
};

const openPrivateMessages = () => {
  privateMessagesVisible.value = true;
};



const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

contacts.value.forEach(contact => {
  contact.lastMessage = contact.messages.length > 0 ? contact.messages[contact.messages.length - 1].content : "";
});



const searchContacts = () => {
  // Logique de recherche ici
  filteredContacts.value = contacts.value;
};

const openChatWith = (contact) => {
  selectedContact.value = contact;
  showDiscussion.value = true;
};

const openDrawer = () => {
  isDrawerOpen.value = true;
};

const closeDrawer = () => {
  isDrawerOpen.value = false;
};

const sendMessage = () => {
  if (selectedContact.value) {
    const message = { sender: "Moi", content: newMessage.value };
    selectedContact.value.messages.push(message);
    showDiscussion.value = true;
    newMessage.value = "";
  }
};



const isDrawerOpen = ref(true);

const drawerWidth = ref(400);

const showDiscussion = ref(false);

const chatDialogOpen = ref(false);


</script>
