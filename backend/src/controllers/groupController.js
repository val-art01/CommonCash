import User from './../models/Users.js';
import {registerGroup, getAllGroup, getGroupById, editGroup, deleteGroup, addMembersToGroup} from './../services/groupService.js';

/**
 * Contrôleur pour la création d'un nouveau groupe.
 * @param {Object} req - L'objet de la requête Express.
 * @param {Object} res - L'objet de la réponse Express.
 * @returns {void}
 */
export const createGroup = async (req, res) => {
    const { name, description, members} = req.body;
    const admin = req.user._id;

    try {    
        // Vérifier l'existence des utilisateurs
        // const { existingUsers, nonExistingUsers } = await checkUsersExistence([...members]);

        // console.log(nonExistingUsers)

        // if (nonExistingUsers.length > 0) {
        //     return res.status(404).json({
        //         error: 'Certains membres n\'existent pas dans la base de données.',
        //         nonExistingUsersDetails: await findUsersWithoutAccount(nonExistingUsers),
        //     });
        // }

        // Utilisation du service pour créer le groupe
        const group = await registerGroup(name, description, admin);

        res.status(201).json({ message: 'Groupe créé avec succès', group });
    } catch (err) {
        console.error('Erreur lors de la création :', err.message);
        res.status(500).json({ response: 'Erreur de serveur interne' });
    }
};

/**
 * Contrôleur pour obtenir tous les Groupes.
 * @param {Object} req - L'objet de la requête Express.
 * @param {Object} res - L'objet de la réponse Express.
 * @returns {void}
 */
export const getAllGroups = async (req, res) => {
    try {
        const allGroups = await getAllGroup();
        res.status(200).json(allGroups)
    } catch(err) {
        console.error('Erreur lors de la récupération des groupes :', err.message);
        res.status(500).json({ response: 'Internal server error' })
    }
};

/**
 * Contrôleur pour obtenir un groupe specifique.
 * @param {Object} req - L'objet de la requête Express.
 * @param {Object} res - L'objet de la réponse Express.
 * @returns {void}
 */
export const getGroupByIds = async (req, res) => {
    const { id } = req.params;
    try {        
        const group = await getGroupById(id);
        // if (!group) {
        //     return res.status(404).json({ error: 'groupe introuvable' })
        // }
        res.status(200).json({ group });
    } catch (error) {
        console.error('Erreur lors de la récupération du groupe :', error.message);
        res.status(500).json({ response: 'Erreur de serveur interne' });
    }
};

/**
 * Contrôleur pour àjouter un/des nouveaux membres au groupe.
 * @param {Object} req - L'objet de la requête Express.
 * @param {Object} res - L'objet de la réponse Express.
 * @returns {void}
 */
export const addMembers = async (req, res) => {
    const { id } = req.params;
    const { members } = req.body
    // Supposons que vous avez un middleware d'authentification qui ajoute l'utilisateur à req.user
    // const loggedInUser = req.user; 

    try {
        const updatedGroup = addMembersToGroup(id, members);

        res.status(201).json({ message: 'Membres ajoutés avec succès', updatedGroup });
    } catch (error) {
        console.error('Erreur lors de l\'ajout de membres au groupe :', error.message);
        res.status(500).json({ response: 'Erreur de serveur interne' });
    }
}

/**
 * Contrôleur pour inviter un utilisateur.
 * @param {Object} req - L'objet de la requête Express.
 * @param {Object} res - L'objet de la réponse Express.
 * @returns {void}
 */
export const inviteUsers = async (req, res) => {
    const { guestId, invitation } = req.body
    try {
        const updatedUser = await User.findByIdAndUpdate(guestId)

        if (!updatedUser) {
            return res.status(404).json({ error: 'Utilisateur introuvable' })
        }

        updatedUser.invitations = updatedUser.invitations.concat(invitation)

        res.status(201).json({ message: 'Invitation envoyée avec succès' });
    } catch (err) {
        console.error('Erreur lors de l\'envoie de l\'invitation à l\'utilisateur :', err.message);
        res.status(500).json({ response: 'Erreur de serveur interne '})
    }
}

/**
 * Contrôleur pour modifier un groupe.
 * @param {Object} req - L'objet de la requête Express.
 * @param {Object} res - L'objet de la réponse Express.
 * @returns {void}
 */
export const updateGroups = async (req, res) => {
    const { id } = req.params;
    const updatedDetails = req.body;

    try {
        const updatedGroup = await editGroup(id, updatedDetails);
        // if (!updatedGroup) {
        //     return res.status(404).json({ error: 'groupe introuvable' })
        // }
        res.status(204).json({ message: 'Groupe mis à jour avec succès', updatedGroup });
    } catch (error) {

      console.error('Erreur lors de la modification du groupe :', error.message);
      res.status(500).json({ response: 'Erreur de serveur interne' });
    }
};

/**
 * Contrôleur pour supprimer un groupe.
 * @param {Object} req - L'objet de la requête Express.
 * @param {Object} res - L'objet de la réponse Express.
 * @returns {void}
 */
export const deleteGroups = async (req, res) => {
    const { id }  = req.params
    try {
        await deleteGroup(id);
        res.status(20).json({ message: 'Groupe supprimé avec succés'})
    } catch(err) {
        res.status(500).json({ response: 'Erreur de serveur interne ' + err.message})
    }
}

// vérifier l'existence des utilisateurs
const checkUsersExistence = async (userIds) => {
    try {
        const existingUsers = await User.find({ _id: { $in: userIds } });

        const nonExistingUsers = userIds.filter(userId => !existingUsers.some(user => user._id.equals(userId)));

        return { existingUsers, nonExistingUsers };
    } catch (error) {
        console.error('Erreur lors de la vérification de l\'existence des utilisateurs :', error.message);
        throw new Error('Erreur interne du serveur lors de la vérification de l\'existence des utilisateurs.');
    }
};

//trouver des utilisateurs sans compte 
const findUsersWithoutAccount = async (userIds) => {
    try {
        const usersWithoutAccount = await User.find({
            _id: { $in: userIds },
            compte: { $exists: false },
        });

        return usersWithoutAccount;
    } catch (error) {
        console.error('Erreur lors de la recherche des utilisateurs sans compte :', error.message);
        throw new Error('Erreur interne du serveur lors de la recherche des utilisateurs sans compte.');
    }
};