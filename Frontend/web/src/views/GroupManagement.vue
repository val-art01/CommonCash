<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" color="#2A0050">
      <v-img height="172" class="pa-4" src="https://fr.pngtree.com/freepng/automatic-floating-bubble-illustration_4701485.html">
        <div class="text-center">
          <h2 class="white--text" color="#4A148C">Donia Laajili</h2>
        </div>
      </v-img>
      <v-divider></v-divider>
      <router-link v-for="[icon, text] in links" :key="icon" :to="{ name: text }">
        <v-list-item :prepend-icon="icon" link class="custom-list-item">
          <v-list-item-title>{{ text }}</v-list-item-title>
        </v-list-item>
      </router-link>
    </v-navigation-drawer>

    <v-app-bar app color="#4A148C" elevate-on-scroll>
      <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title>CommonCash</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="mdi-magnify" label="Recherche" single-line hide-details></v-text-field>
      <v-menu location="bottom right" transition="slide-y-transition">
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props" class="text-none">
            <v-badge content="2" color="error">
              <v-icon>mdi-bell-outline</v-icon>
            </v-badge>
          </v-btn>
        </template>
        <v-list elevation="1" lines="three" density="compact" max-width="400">
          <v-list-subheader>Notifications</v-list-subheader>
          <v-list-item v-for="(message, i) in messages" :key="i" @click="">
            <template v-slot:prepend>
              <v-avatar size="40" :color="message.color">
                <v-icon color="white">{{ message.icon }}</v-icon>
              </v-avatar>
            </template>
            <template v-slot:append>
              <div class="full-h d-flex align-center">
                <span class="text-body-2 text-grey">{{ message.time }}</span>
              </div>
            </template>
            <div>
              <v-list-item-title class="font-weight-bold text-primary">{{ message.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ message.subtitle }}</v-list-item-subtitle>
            </div>
          </v-list-item>
          <div class="text-center py-5">
            <v-btn size="small" variant="elevated" elevation="1">See all</v-btn>
          </div>
        </v-list>
      </v-menu>

      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-badge dot location="bottom right" offset-x="3" offset-y="3" color="success" bordered>
            <v-avatar class="cursor-pointer" color="primary" variant="tonal">
              <v-icon>mdi-account-circle</v-icon>
              <v-menu activator="parent" width="230" location="bottom end" offset="14px">
                <v-list>
                  <v-list-item>
                    <template #prepend>
                      <v-list-item-action start>
                        <v-badge dot location="bottom right" offset-x="3" offset-y="3" color="success">
                          <v-avatar color="primary" variant="tonal">
                            <v-icon>mdi-account-circle</v-icon>
                          </v-avatar>
                        </v-badge>
                      </v-list-item-action>
                    </template>
                    <v-list-item-title class="font-weight-semibold">Donia Laajili</v-list-item-title>
                    <v-list-item-subtitle>Admin</v-list-item-subtitle>
                  </v-list-item>
                  <v-divider class="my-2" />
                  <v-list-item link>
                    <template #prepend>
                      <v-icon class="me-2" icon="ri-user-line" size="22" />
                    </template>
                    <v-list-item-title>Profile</v-list-item-title>
                  </v-list-item>
                  <v-list-item link>
                    <template #prepend>
                      <v-icon class="me-2" icon="ri-settings-4-line" size="22" />
                    </template>
                    <v-list-item-title>Settings</v-list-item-title>
                  </v-list-item>
                  <v-list-item link>
                    <template #prepend>
                      <v-icon class="me-2" icon="ri-money-dollar-circle-line" size="22" />
                    </template>
                    <v-list-item-title>Pricing</v-list-item-title>
                  </v-list-item>
                  <v-list-item link>
                    <template #prepend>
                      <v-icon class="me-2" icon="ri-question-line" size="22" />
                    </template>
                    <v-list-item-title>FAQ</v-list-item-title>
                  </v-list-item>
                  <v-divider class="my-2" />
                  <v-list-item to="/login">
                    <template #prepend>
                      <v-icon class="me-2" icon="ri-logout-box-r-line" size="22" />
                    </template>
                    <v-list-item-title>Logout</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-avatar>
          </v-badge>
        </template>
      </v-menu>
    </v-app-bar>
    
    

   

    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-card>
            <v-card-title>Group Management</v-card-title>
            <v-card-text>
              <v-text-field v-model="newGroupName" label="New Group Name"></v-text-field>
              <v-btn @click="createGroup" color="primary">Create Group</v-btn>
              <v-list>
                <v-list-item v-for="group in groups" :key="group.id">
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-text-field v-if="editingGroupId === group.id" v-model="group.name" @blur="saveGroup(group)" @keyup.enter="saveGroup(group)"></v-text-field>
                      <span v-else @dblclick="editGroup(group.id)">{{ group.name }}</span>
                    </v-list-item-title>
                    <v-list-item-action>
                      <v-btn icon @click="deleteGroup(group.id)">
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="8">
          <v-card>
            <v-card-title>Group Chat</v-card-title>
            <v-card-text>
              <v-select v-model="selectedGroup" :items="groups" item-text="name" item-value="id" label="Select Group"></v-select>
              <div v-if="selectedGroup">
                <v-text-field v-model="newMessage" label="New Message" @keyup.enter="sendMessage"></v-text-field>
                <v-btn @click="sendMessage" color="primary">Send</v-btn>
                <v-list>
                  <v-list-item v-for="message in groupMessages[selectedGroup]" :key="message.id">
                    <v-list-item-content>
                      <v-list-item-title>{{ message.text }}</v-list-item-title>
                      <v-list-item-subtitle>{{ message.timestamp }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </div>
            </v-card-text>
          </v-card>
          <v-card>
            <v-card-title>Add Member to Group</v-card-title>
            <v-card-text>
              <v-select v-model="selectedMember" :items="members" item-text="name" item-value="id" label="Select Member"></v-select>
              <v-btn @click="addMemberToGroup" color="primary">Add Member</v-btn>
              <div v-if="selectedGroup">
                <v-subheader>Members in Group</v-subheader>
                <v-list>
                  <v-list-item v-for="member in groupMembers[selectedGroup]" :key="member.id">
                    <v-list-item-content>
                      <v-list-item-title>{{ member.name }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </div>
            </v-card-text>
          </v-card>
          <v-card>
            <v-card-title>Group Information</v-card-title>
            <v-card-text>
              <div v-if="selectedGroup">
                <h3>Group: {{ groupInfo.name }}</h3>
                <v-subheader>Members</v-subheader>
                <v-list>
                  <v-list-item v-for="member in groupInfo.members" :key="member.id">
                    <v-list-item-content>
                      <v-list-item-title>{{ member.name }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
                <v-subheader>Expenses</v-subheader>
                <v-list>
                  <v-list-item v-for="expense in groupInfo.expenses" :key="expense.id">
                    <v-list-item-content>
                      <v-list-item-title>{{ expense.description }} - ${{ expense.amount }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>





<script>
import { ref, reactive, computed, onMounted } from 'vue';
import axiosConfig from '@/services/groupService.js'; 

export default {
  setup() {
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

    const drawer = ref(false);
    const search = ref('');
    const menu = ref(false);
    const profileMenu = ref(false);

    const newGroupName = ref('');
    const newMessage = ref('');
    const groups = reactive([]);
    const groupMessages = reactive({});
    const groupMembers = reactive({});
    const groupExpenses = reactive({});
    const selectedGroup = ref(null);
    const editingGroupId = ref(null);

    const members = reactive([]);
    const selectedMember = ref(null);

    const fetchGroups = async () => {
      try {
        const response = await axiosConfig.getAllGroups();
        groups.push(...response.data);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    const createGroup = async () => {
      try {
        const response = await axiosConfig.createGroup({ name: newGroupName.value });
        const newGroup = response.data;
        groups.push(newGroup);
        groupMessages[newGroup.id] = [];
        groupMembers[newGroup.id] = [];
        groupExpenses[newGroup.id] = [];
        newGroupName.value = '';
      } catch (error) {
        console.error('Error creating group:', error);
      }
    };

    const deleteGroup = async (id) => {
      try {
        await axiosConfig.deleteGroup(id);
        const index = groups.findIndex(group => group.id === id);
        if (index !== -1) groups.splice(index, 1);
        delete groupMessages[id];
        delete groupMembers[id];
        delete groupExpenses[id];
      } catch (error) {
        console.error('Error deleting group:', error);
      }
    };

    const editGroup = (id) => {
      editingGroupId.value = id;
    };

    const saveGroup = async (group) => {
      try {
        await axiosConfig.updateGroup(group.id, { name: group.name });
        editingGroupId.value = null;
      } catch (error) {
        console.error('Error saving group:', error);
      }
    };

    const sendMessage = async () => {
      if (selectedGroup.value && newMessage.value.trim()) {
        try {
          const response = await axiosConfig.sendMessage(selectedGroup.value, { text: newMessage.value });
          const newMessageData = response.data;
          groupMessages[selectedGroup.value].push(newMessageData);
          newMessage.value = '';
        } catch (error) {
          console.error('Error sending message:', error);
        }
      }
    };

    const addMemberToGroup = async () => {
      if (selectedGroup.value && selectedMember.value) {
        try {
          const response = await axiosConfig.addMembersToGroup(selectedGroup.value, { memberId: selectedMember.value });
          const member = members.find(member => member.id === selectedMember.value);
          if (member && !groupMembers[selectedGroup.value].some(m => m.id === member.id)) {
            groupMembers[selectedGroup.value].push(member);
          }
          selectedMember.value = null;
        } catch (error) {
          console.error('Error adding member to group:', error);
        }
      }
    };

    const fetchMembers = async () => {
      try {
        const response = await axiosConfig.getAllMembers();
        members.push(...response.data);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    const groupInfo = computed(() => {
      if (selectedGroup.value) {
        const group = groups.find(g => g.id === selectedGroup.value);
        return {
          name: group ? group.name : '',
          members: groupMembers[selectedGroup.value] || [],
          expenses: groupExpenses[selectedGroup.value] || [],
        };
      }
      return {
        name: '',
        members: [],
        expenses: [],
      };
    });

    const toggleDrawer = () => {
      drawer.value = !drawer.value;
    };

    const logout = () => {
      // Logique pour la déconnexion
    };

    const messages = [
      {
        title: "Brunch this weekend?",
        color: "primary",
        icon: "mdi-account-circle",
        subtitle: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint, repudiandae?",
        time: "3 min",
      },
      {
        title: "Summer BBQ",
        color: "success",
        icon: "mdi-email-outline",
        subtitle: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint, repudiandae?",
        time: "3 min",
      },
      {
        title: "Oui oui",
        color: "teal lighten-1",
        icon: "mdi-airplane-landing",
        subtitle: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint, repudiandae?",
        time: "4 min",
      },
      {
        title: "Disk capacity is at maximum",
        color: "teal accent-3",
        icon: "mdi-server",
        subtitle: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint, repudiandae?",
        time: "3 hr",
      },
      {
        title: "Recipe to try",
        color: "blue-grey lighten-2",
        icon: "mdi-noodles",
        subtitle: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint, repudiandae?",
        time: "8 hr",
      },
    ];

    onMounted(() => {
      fetchGroups();
      fetchMembers();
    });

    return {
      links,
      drawer,
      search,
      menu,
      profileMenu,
      newGroupName,
      groups,
      createGroup,
      deleteGroup,
      editGroup,
      saveGroup,
      editingGroupId,
      selectedGroup,
      newMessage,
      groupMessages,
      sendMessage,
      members,
      selectedMember,
      addMemberToGroup,
      groupMembers,
      groupExpenses,
      groupInfo,
      toggleDrawer,
      logout,
      messages,
    };
  },
};
</script>

<style scoped>
#inspire {
  font-family: 'Roboto', sans-serif;
}
.custom-list-item {
  color: white;
}
.v-list-item__prepend-icon {
  color: white;
}
</style>


<style scoped>
#inspire {
  font-family: 'Roboto', sans-serif;
}
.custom-list-item {
  color: white;
}
.v-list-item__prepend-icon {
  color: white;
}
</style>


<style scoped>
#inspire {
  font-family: 'Roboto', sans-serif;
}
.custom-list-item {
  color: white;
}
.v-list-item__prepend-icon {
  color: white;
}
</style>


<style scoped>
</style>
