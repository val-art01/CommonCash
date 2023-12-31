// services/authService.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const generateToken = (userId) => {
    return jwt.sign({ userId }, 'votre_secret_jwt', { expiresIn: '24h' });
};
  
const verifyPassword = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
};

export {generateToken, verifyPassword}