<template>
  <v-app :style="{ background: '#6A1B9A' }">
    <v-row class="my-4">
      <v-col class="mx-auto">
        <v-row align="center">
          <v-icon color="purple">mdi-message-text-outline</v-icon>
          <span class="ml-2 headline">Chat</span>
        </v-row>
      </v-col>
    </v-row>
    <v-container>
      <v-row class="no-gutters elevation-4">
        <v-col cols="12" sm="3" class="flex-grow-1 flex-shrink-0" style="border-right: 1px solid #0000001f;">
          <v-responsive class="overflow-y-auto fill-height" height="400">
            <v-list subheader>
              <v-list-item-group v-model="activeChat">
                <template v-for="(item, index) in parents" :key="index">
                  <v-list-item @click="selectChat(index)">
                    <v-list-item-avatar color="grey lighten-1 white--text">
                      <v-icon>mdi-account-circle</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title v-text="item.title" />
                      <v-list-item-subtitle v-text="'hi'" />
                    </v-list-item-content>
                    <v-list-item-icon>
                      <v-icon :color="item.active ? 'deep-purple accent-4' : 'grey'">mdi-chevron-right</v-icon>
                    </v-list-item-icon>
                  </v-list-item>
                  <v-divider v-if="index < parents.length - 1" class="my-0" />
                </template>
              </v-list-item-group>
            </v-list>
          </v-responsive>
        </v-col>
        <v-col cols="9" class="flex-grow-1 flex-shrink-0">
          <v-responsive v-if="activeChat !== null" class="overflow-y-hidden fill-height" height="500">
            <!-- Fenêtre de discussion -->
            <v-card flat class="d-flex flex-column fill-height">
              <v-card-title>
                {{ parents[activeChat].title }}
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text class="flex-grow-1 overflow-y-auto">
                <template v-for="(msg, i) in parents[activeChat].messages" :key="i">
                  <div :class="{ 'd-flex flex-row-reverse': msg.me }">
                    <v-menu offset-y>
                      <template v-slot:activator="{ on }">
                        <v-hover v-slot:default="{ hover }">
                          <v-chip :color="msg.me ? 'primary' : ''" dark style="height:auto;white-space: normal;" class="pa-4 mb-2" v-on="on">
                            {{ msg.content }}
                            <sub class="ml-2" style="font-size: 0.5rem;">{{ msg.created_at }}</sub>
                            <v-icon v-if="hover" small>expand_more</v-icon>
                          </v-chip>
                        </v-hover>
                      </template>
                      <v-list>
                        <v-list-item @click="deleteMessage(activeChat, i)">
                          <v-list-item-title>Delete</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </div>
                </template>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-text-field v-model="parents[activeChat].newMessage" label="Type your message..." outlined @keyup.enter="sendMessage(activeChat)"></v-text-field>
                <v-btn @click="sendMessage(activeChat)" color="primary">Send</v-btn>
              </v-card-actions>
            </v-card>
          </v-responsive>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    activeChat: null,
    parents: [
      { id: 1, title: "John Doe", active: true, messages: [], newMessage: "" },
      { id: 3, title: "Scarlett", active: false, messages: [], newMessage: "" },
      // ... (autres utilisateurs)
    ],
  }),
  methods: {
    selectChat(index) {
      this.activeChat = index;
    },
    sendMessage(chatIndex) {
      if (chatIndex !== null) {
        const currentUser = this.parents[chatIndex];
        currentUser.messages.push({ content: currentUser.newMessage, me: true, created_at: "now" });
        currentUser.newMessage = "";
      }
    },
    deleteMessage(chatIndex, messageIndex) {
      if (chatIndex !== null) {
        this.parents[chatIndex].messages.splice(messageIndex, 1);
      }
    },
  }
};
</script>

<style>
.fill-height {
  height: 100%;
}
</style>
