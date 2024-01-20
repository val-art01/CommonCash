<template>
  <v-app>
    <v-container class="fill-height pa-0">
      <v-row class="no-gutters elevation-4">
        <v-col cols="12" sm="3" class="flex-grow-1 flex-shrink-0" style="border-right: 1px solid #0000001f;">
          <v-responsive class="overflow-y-auto fill-height" height="500">
            <v-list subheader>
              <v-list-item-group v-model="activeChat">
                <template v-for="(item, index) in parents">
                  <v-list-item v-if:key="`parent${index}`">
                    <v-list-item-avatar color="grey lighten-1 white--text">
                      <v-icon>chat_bubble</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title v-text="item.title" />
                      <v-list-item-subtitle v-text="'hi'" />
                    </v-list-item-content>
                    <v-list-item-icon>
                      <v-icon :color="item.active ? 'deep-purple accent-4' : 'grey'">chat_bubble</v-icon>
                    </v-list-item-icon>
                  </v-list-item>
                  <v-divider v-if:key="`chatDivider${index}`" class="my-0" />
                </template>
              </v-list-item-group>
            </v-list>
          </v-responsive>
        </v-col>
        <v-col cols="9" class="flex-grow-1 flex-shrink-0">
          <v-responsive v-if="activeChat" class="overflow-y-hidden fill-height" height="500">
            <!-- Fenêtre de discussion -->
            <v-card flat class="d-flex flex-column fill-height">
              <v-card-title>
                {{ parents.find(user => user.id === activeChat).title }}
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text class="flex-grow-1 overflow-y-auto">
                <template v-for="(msg, i) in messages">
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
                        <v-list-item>
                          <v-list-item-title>delete</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </div>
                </template>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-text-field v-model="messageForm.content" label="Type your message..." outlined @keyup.enter="sendMessage"></v-text-field>
                <v-btn @click="sendMessage" color="primary">Send</v-btn>
              </v-card-actions>
            </v-card>
          </v-responsive>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import * as Vue from 'vue';

export default {
  data: () => ({
    activeChat: 1,
    parents: [
      { id: 1, title: "john doe", active: true },
      { id: 3, title: "scarlett", active: false },
      // ... (les autres utilisateurs)
    ],
    messages: [
      { content: "lorem ipsum", me: true, created_at: "11:11am" },
      { content: "dolor", me: false, created_at: "11:11am" },
      // ... (les autres messages)
    ],
    messageForm: { content: "", me: true, created_at: "11:11am" }
  }),
  methods: {
    sendMessage() {
      if (this.activeChat) {
        const currentUser = this.parents.find(user => user.id === this.activeChat);
        this.messages.push({ content: this.messageForm.content, me: this.messageForm.me, created_at: "now", user: currentUser });
        this.messageForm.content = "";
      }
    }
  }
};
</script>

<style>
.fill-height {
  height: 100%;
}
</style>



