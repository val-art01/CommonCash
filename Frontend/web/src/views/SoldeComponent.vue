<template>
  <v-app id="inspire">
    <v-sheet color="gray" class="pa-4" style="top: 50%;">
      <v-card class="chat-room">
        <v-toolbar card dense flat class="white chat-room--toolbar" light>
          <v-btn icon @click="goBack">
            <v-icon color="text--secondary">keyboard_arrow_left</v-icon>
          </v-btn>
          <v-avatar size="32" class="avatar-stack" v-for="(user_id, index) in chat.users" :key="index">
            <img :src="getAvatar(user_id)" alt="">
          </v-avatar>
          <v-spacer></v-spacer>
          <v-toolbar-title><h4>Chat Channel</h4></v-toolbar-title>
          <v-spacer></v-spacer>
          <v-tooltip bottom>
            <v-btn icon slot="activator">
              <v-icon color="text--secondary">add</v-icon>
            </v-btn>
            <span>Add user</span>
          </v-tooltip>
        </v-toolbar>

        <vue-perfect-scrollbar class="chat-room--scrollbar grey lighten-5" v-bind:style="computeHeight">
          <v-card-text class="chat-room--list pa-3">
            <template v-if="chat.messages">
              <div v-for="(item, index) in chat.messages" :key="index" v-bind:class="[ index % 2 == 0 ? 'reverse' : '']" class="messaging-item layout row my-4">
                <v-avatar class="indigo mx-1" size="40">
                  <img v-bind:src="item.user.avatar" alt="">
                </v-avatar>
                <div class="messaging--body layout column mx-2">
                  <p :value="true" v-bind:class="[ index % 2 == 0 ? 'primary white--text' : 'white']" class="pa-2">
                    {{ item.text }}
                  </p>
                  <div class="caption px-2 text--secondary">{{ new Date(item.created_at).toLocaleString() }}</div>
                </div>
                <v-spacer></v-spacer>
              </div>
            </template>
          </v-card-text>
        </vue-perfect-scrollbar>

        <v-card-actions>
          <v-text-field
            full-width
            flat
            clearable
            solo
            append-icon="send"
            label="Type some message here"
          >
            <v-icon slot="append-icon">send</v-icon>
            <v-icon slot="append-icon" class="mx-2">photo</v-icon>
            <v-icon slot="append-icon">face</v-icon>
          </v-text-field>
        </v-card-actions>
      </v-card>
    </v-sheet>
    

    <Login @login-success="handleLoginSuccess" />
  </v-app>
</template>

<script>
import { ref } from 'vue';

export default {
  props: {
    uuid: {
      type: String,
      default: '',
    },
    height: {
      type: String,
      default: null,
    }
  },
  computed: {
    chat() {
      return {
        title: 'Chat',
        users: [],
        messages: [
          { text: 'Hello!', user: { avatar: 'url_de_votre_image_statique' }, created_at: new Date() },
          // Ajoutez d'autres messages simulés
        ]
      };
    },
    computeHeight() {
      return {
        height: this.height || ''
      };
    },
    activity() {
      return [
        { timeString: '09:00 AM', text: 'First activity', color: 'blue' },
        { timeString: '10:30 AM', text: 'Second activity', color: 'green' },
      ];
    }
  },
  methods: {
    getAvatar(uid) {
      // Logique pour récupérer l'avatar en fonction de l'ID de l'utilisateur
    },
    goBack() {
      // Logique pour revenir en arrière
    },
    handleLoginSuccess() {
      // Logique pour gérer la connexion réussie
    }
  }
};
</script>

<style scoped>
  /* Ajoutez vos styles personnalisés ici */
</style>