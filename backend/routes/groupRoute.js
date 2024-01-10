import express from 'express';
import {register, getAllGroups, getGroupById, updateGroup, deleteGroup, inviteUsers, addMembers} from '../src/controllers/groupController.js';
import { authentification } from '../src/middlewares/authMiddleware.js';



const router = express.Router()

router.get('/', getAllGroups);

// route pour inviter un joueur dans un groupe
router.put('/inviteUsers/:id', inviteUsers);


// route pour ajouter des membres dans un groupe
router.put('/addMembers/:id', addMembers);


// Route d'e création d'un groupe
router.post('/register',authentification, register);


// route pour supprimer un groupe
router.delete('/:id', deleteGroup);

export default router