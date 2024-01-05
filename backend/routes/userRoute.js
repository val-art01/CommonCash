import express from 'express';
import {register, getAllUsers, getUserById, updateUser, deleteUser} from '../src/controllers/userController.js';
import {validateRegistration} from '../src/middlewares/registerMiddleware.js';
import {authentification} from "../src/middlewares/authMiddleware.js"

const router = express.Router()

router.get('/',authentification, getAllUsers);

// route pour Obtenir un utilisateur spécifique
router.get('/:id', authentification, getUserById);

// Route d'inscription avec le middleware de validation
router.post('/register', validateRegistration, register);

// route pour mettre à jour les informations d'un utilisateur 
router.put('/update/:id', authentification, updateUser);

// route pour supprimer un utilisateur
router.delete('/delete/:id', authentification, deleteUser);

export default router