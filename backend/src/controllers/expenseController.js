import {addExpense} from './../services/expenseService.js'

/**
 * Crée une nouvelle dépense à partir des données de la requête et l'ajoute à la base de données.
 * @param {object} req - L'objet de requête contenant les données de la dépense (groupId, amount, description) et l'utilisateur connecté (req.user._id).
 * @param {object} res - L'objet de réponse à renvoyer une fois la dépense créée.
 * @returns {Promise<void>} - Ne renvoie aucune valeur directement, mais envoie une réponse JSON avec un message et la nouvelle dépense en cas de succès.
 * @throws {Error} - Une erreur est capturée et renvoie une réponse avec un message d'erreur en cas d'échec.
*/
export const createExpense = async (req, res) =>{
    const {groupId, amount, description} = req.body;
    const loggedInUserId = req.user._id; 
    try {
        // Utiliser le service pour créer la dépense
        const newExpense = await addExpense(groupId, loggedInUserId, amount, description);
    
        res.status(201).json({message: 'Dépense créée avec succès', newExpense})
    } catch (error) {
        console.error('Erreur lors de la création de la dépense: ' + error)
        res.status(500).json({response: 'Erreur de serveur interne: '})
    }
}