import axios from 'axios';

const baseURL = 'http://localhost:8080/'; 

export default {
  // Méthode pour récupérer tous les groupes
  getAllGroups() {
    return axios.get(`${baseURL}/group/all`);
  },

  // Méthode pour créer un nouveau groupe
  createGroup(groupData) {
    return axios.post(`${baseURL}/group/create`, groupData);
  },

  // Méthode pour récupérer un groupe par son ID
  getGroupById(groupId) {
    return axios.get(`${baseURL}/group/${groupId}`);
  },

  // Méthode pour ajouter des membres à un groupe
  addMembersToGroup(groupId, membersData) {
    return axios.post(`${baseURL}/group/${groupId}/addMembers`, membersData);
  },

  // Méthode pour supprimer un groupe
  deleteGroup(groupId) {
    return axios.delete(`${baseURL}/group/${groupId}`);
  }

  
};
