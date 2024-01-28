import express from 'express';
import {createGroup, getAllGroups, getGroupByIds, addMembers, updateGroups, deleteGroups} from '../src/controllers/groupController.js';
import { authentification } from '../src/middlewares/authMiddleware.js';
import {validateGroupName, validateGroupChamps, existGroup} from '../src/middlewares/groupMiddleware.js';

const router = express.Router()

router.get('/', getAllGroups);

// route pour Obtenir un groupe spécifique
router.get('/:id',authentification, existGroup, getGroupByIds);

// route pour inviter un joueur dans un groupe
// router.put('/inviteUsers/:id', inviteUsers);

// route pour ajouter des membres dans un groupe
router.put('/add-members/:id', existGroup, addMembers);

// Route d'e création d'un groupe
router.post('/create', authentification, validateGroupName, createGroup);

// route pour mettre à jour les informations d'un groupe 
router.put('/:id', authentification, validateGroupChamps, updateGroups);

// route pour supprimer un groupe
router.delete('/:id', deleteGroups);

export default router