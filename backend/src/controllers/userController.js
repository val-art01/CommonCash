import User from './../models/Users.js';
import bcrypt from "bcrypt";
import crypto from "crypto";
import {generateTokenAndSave} from '../services/authService.js'

// Inscription d'un nouvel utilisateur
export const register = async (req, res) =>{
    const { name, email, password } = req.body
    try{
        const ivValue = crypto.randomBytes(16).toString('hex');
        const passwordAxe = await bcrypt.hash(password, 10);

        // Créer un nouvel utilisateur
        const newUser = new User({
            name,
            email,
            password: passwordAxe,
            iv: ivValue
        });

        const authToken = await generateTokenAndSave(newUser);

        res.status(201).json({ message: 'Compte utilisateur créé avec succès', newUser, authToken});
    }catch(err){
        res.status(500).json({ response: 'Erreur de serveur interne: ' + err.message })
    }
}

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch(err) {
        console.error('Error getting users', err)
        res.status(500).json({ response: 'Internal server error' })
    }
};

// recuperer les informations d'un utilisateut spécifique
export const getUserById = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur introuvable' })
        }
        res.status(200).json(user)
    } catch(err) {
        res.status(500).json({ response: 'Erreur de serveur interne ' + err.message})
    }
};

//mettre à jour un utilisateur
export const updateUser = async (req, res) => {
    const { id } = req.params
    const { name, email, password } = req.body
    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, email, password }
        )

        if (!updatedUser) {
            return res.status(404).json({ error: 'Utilisateur introuvable' })
        }

        res.status(200).json({ message: 'User update successfully'})
    } catch (err) {
        res.status(500).json({ response: 'Erreur de serveur interne ' + err.message})
    }
}

// Supprimer un utilisateur
export const deleteUser = async (req, res) => {
    const { id }  = req.params
    try {
        const deletedUser = await User.findByIdAndDelete(id)

        if (!deletedUser) {
            return res.status(404).json({ error: 'Utilisateur introuvable' })
        }

        res.status(200).json({ message: 'User deleted successfully'})
    } catch(err) {
        res.status(500).json({ response: 'Erreur de serveur interne ' + err.message})
    }
}
