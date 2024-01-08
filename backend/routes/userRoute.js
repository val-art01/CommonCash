import express from 'express';
import {register, getAllUsers, getUserById, updateUser, deleteUser} from '../src/controllers/userController.js';
import {validateRegister, validateUpdate} from '../src/middlewares/checkFieldsMiddleware.js';
import {authentification} from "../src/middlewares/authMiddleware.js"

const router = express.Router()

router.get('/', getAllUsers);

// route pour Obtenir un utilisateur spécifique
router.get('/:id', authentification, getUserById);

// Route d'inscription avec le middleware de validation
router.post('/register', validateRegister, register);

// route pour mettre à jour les informations d'un utilisateur 
router.put('/:id', authentification, updateUser);

// route pour supprimer un utilisateur
router.delete('/:id', authentification, deleteUser);

export default router