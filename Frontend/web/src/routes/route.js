import express from 'express';
import {
  createGroup,
  getAllGroups,
  getGroupByIds,
  addMembers,
  inviteUsers,
  updateGroups,
  deleteGroups
} from '../controllers/groupController.js';

const router = express.Router();

// Route pour la création d'un nouveau groupe
router.post('/group/create', createGroup);

// Route pour obtenir tous les groupes
router.get('/group/all', getAllGroups);

// Route pour obtenir un groupe spécifique par son ID
router.get('/group/:id', getGroupByIds);

// Route pour ajouter des membres à un groupe
router.post('/group/:id/addMembers', addMembers);

// Route pour inviter des utilisateurs à rejoindre un groupe
router.post('/group/inviteUsers', inviteUsers);

// Route pour modifier un groupe existant
router.put('/group/:id', updateGroups);

// Route pour supprimer un groupe
router.delete('/group/:id', deleteGroups);

export default router;
