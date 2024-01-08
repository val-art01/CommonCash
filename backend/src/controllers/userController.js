import User from './../models/Users.js';
import bcrypt from "bcrypt";
import {generateTokenAndSave, ivValue} from '../services/authService.js'

/**
 * Contrôleur pour l'inscription d'un nouvel utilisateur.
 * @param {Object} req - L'objet de la requête Express.
 * @param {Object} res - L'objet de la réponse Express.
 * @returns {void}
 */
export const register = async (req, res) =>{
    const { name, email, password } = req.body
    try{
        // const ivValue = crypto.randomBytes(16).toString('hex');
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
        console.error('Erreur lors de l\'inscription :', err.message);
        res.status(500).json({ response: 'Erreur de serveur interne: '})
    }
}

/**
 * Contrôleur pour obtenir tous les utilisateurs.
 * @param {Object} req - L'objet de la requête Express.
 * @param {Object} res - L'objet de la réponse Express.
 * @returns {void}
 */
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().lean()
        res.status(200).json(users)
    } catch(err) {
        console.error('Erreur lors de la récupération des utilisateurs :', err.message);
        res.status(500).json({ response: 'Internal server error' })
    }
};

/**
 * Contrôleur pour récupérer les informations d'un utilisateur spécifique.
 * @param {Object} req - L'objet de la requête Express.
 * @param {Object} res - L'objet de la réponse Express.
 * @returns {void}
 */
export const getUserById = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findById(id).lean();
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur introuvable' })
        }
        res.status(200).json(user)
    } catch(err) {
        console.error('Erreur lors de la récupération de l\'utilisateur :', err.message);
        res.status(500).json({ response: 'Erreur de serveur interne ' + err.message})
    }
};

/**
 * Contrôleur pour mettre à jour un utilisateur.
 * @param {Object} req - L'objet de la requête Express.
 * @param {Object} res - L'objet de la réponse Express.
 * @returns {void}
 */
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

        res.status(200).json({ message: 'Utilisateur mis à jour avec succès' });
    } catch (err) {
        console.error('Erreur lors de la mise a jour de l\'utilisateur :', err.message);
        res.status(500).json({ response: 'Erreur de serveur interne '})
    }
}

/**
 * Contrôleur pour supprimer un utilisateur.
 * @param {Object} req - L'objet de la requête Express.
 * @param {Object} res - L'objet de la réponse Express.
 * @returns {void}
 */
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
