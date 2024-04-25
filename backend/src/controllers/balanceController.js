import {calculateBalance} from './../services/balanceService.js';
import {getAllSpends} from './../services/expenseService.js';

/**
 * Récupère les soldes individuels des membres d'un groupe en fonction des dépenses.
 * @param {Object} req - L'objet de requête contenant les paramètres de la requête.
 * @param {Object} res - L'objet de réponse pour renvoyer les résultats.
 * @returns {Object} Les soldes individuels des membres du groupe.
*/
export const getBalances = async (req, res) =>{
    try {
        const { groupId } = req.params;
        expenses = getAllSpends(groupId);

        // calcul soldes individuels
        const balances= calculateBalance(expenses);
      
        res.status(200).json({message: 'solde individuel', balances})
        
    } catch (error) {
        console.error(`Erreur lors du calcul des soldes: ${error}`)
        res.status(500).json({message: 'Erreur de serveur interne'})
    }
}