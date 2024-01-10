import Group from '../models/Groups.js';


/**
 * Contrôleur pour obtenir tous les Groupes.
 * @param {Object} req - L'objet de la requête Express.
 * @param {Object} res - L'objet de la réponse Express.
 * @returns {void}
 */
export const getAllGroups = async (req, res) => {
    try {
        const groups = await Group.find().lean()
        res.status(200).json(groups)
    } catch(err) {
        console.error('Erreur lors de la récupération des groupes :', err.message);
        res.status(500).json({ response: 'Internal server error' })
    }
};


/**
 * Contrôleur pour la création d'un nouveau groupe.
 * @param {Object} req - L'objet de la requête Express.
 * @param {Object} res - L'objet de la réponse Express.
 * @returns {void}
 */
export const register = async (req, res) =>{
    const { name } = req.body
    try{
        const newGroup = new Group({
            name,
            membersId: [req.id]
        });


        res.status(201).json({ message: 'Groupe créé avec succès', newGroup});
    }catch(err){
        console.error('Erreur lors de la création :', err.message);
        res.status(500).json({ response: 'Erreur de serveur interne: '})
    }
}

/**
 * Contrôleur pour àjouter un/des nouveaux membres au groupe.
 * @param {Object} req - L'objet de la requête Express.
 * @param {Object} res - L'objet de la réponse Express.
 * @returns {void}
 */
export const addMembers = async (req, res) => {
    const { id } = req.params
    const { newMembers } = req.body
    try {
        const updatedGroup = await Group.findByIdAndUpdate(id)

        if (!updatedGroup) {
            return res.status(404).json({ error: 'Groupe introuvable' })
        }

        updatedGroup.membersId = updatedGroup.membersId.concat(newMembers);

        res.status(200).json({ message: 'Groupe mis à jour avec succès' });
    } catch (err) {
        console.error('Erreur lors de la mise a jour du groupe :', err.message);
        res.status(500).json({ response: 'Erreur de serveur interne '})
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

        res.status(200).json({ message: 'Invitation envoyée avec succès' });
    } catch (err) {
        console.error('Erreur lors de l\'envoie de l\'invitation à l\'utilisateur :', err.message);
        res.status(500).json({ response: 'Erreur de serveur interne '})
    }
}


/**
 * Contrôleur pour supprimer un groupe.
 * @param {Object} req - L'objet de la requête Express.
 * @param {Object} res - L'objet de la réponse Express.
 * @returns {void}
 */
export const deleteGroup = async (req, res) => {
    const { id }  = req.params
    try {
        const deletedGroup = await Group.findByIdAndDelete(id)

        if (!deletedGroup) {
            return res.status(404).json({ error: 'Utilisateur introuvable' })
        }

        res.status(200).json({ message: 'Groupe supprimé avec succés'})
    } catch(err) {
        res.status(500).json({ response: 'Erreur de serveur interne ' + err.message})
    }
}
