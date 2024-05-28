import axios from 'axios';

const baseURL = 'http://localhost:8080'; // Ensure this matches your backend URL

const axiosInstance = axios.create({
  baseURL: baseURL
});

export default {
  // Method to create a new expense
  createSpend(expenseData) {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    return axiosInstance.post('/spend/create', expenseData, config);
  },

  // Method to get a list of expenses for a group
  getGroupSpends(groupId) {
    return axiosInstance.get(`/spend/list/${groupId}`);
  },

  // Method to get details of a specific expense
  getSpendDetail(expenseId) {
    return axiosInstance.get(`/spend/details/${expenseId}`);
  },

  // Method to search for expenses
  searchReceipts(criteria) {
    return axiosInstance.post('/spend/search', criteria);
  },
  // Method to get all groups
  getAllGroup() {
    return axiosInstance.get('/group/all');
  },
  
  getGroupMembers(groupId) {
    return axiosInstance.get(`/group/members/${groupId}`);
  }
};
