import axios from 'axios';

const baseURL = 'http://localhost:8080'; // Ensure no trailing slash

const axiosInstance = axios.create({
  baseURL: baseURL
});

export default {
  // Method to get all groups
  getAllGroups() {
    return axiosInstance.get('/group/all');
  },

  // Method to create a new group
  createGroup(groupData) {
    return axiosInstance.post('/group/create', groupData);
  },

  // Method to get a group by its ID
  getGroupById(groupId) {
    return axiosInstance.get(`/group/${groupId}`);
  },

  // Method to add members to a group
  addMembersToGroup(groupId, membersData) {
    return axiosInstance.post(`/group/${groupId}/addMembers`, membersData);
  },

  // Method to delete a group
  deleteGroup(groupId) {
    return axiosInstance.delete(`/group/${groupId}`);
  }
};

