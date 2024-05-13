import {calculateBalance} from './../services/balanceService.js';
import {generateReimbursementList} from './../services/repaymentService.js';
import {getAllSpends} from './../services/expenseService.js';

/**
 * Récupère la liste des remboursements nécessaires pour équilibrer les comptes en fonction des dépenses d'un groupe.
 * @param {Object} req - L'objet de requête contenant les paramètres de la requête.
 * @param {Object} res - L'objet de réponse pour renvoyer les résultats.
 * @returns {Object} La liste des remboursements nécessaires pour équilibrer les comptes.
*/
export const getRepayments = async (req, res) =>{
    try {

        const { groupId } = req.params;
        let expensesAll = await getAllSpends(groupId);

        // calcul soldes individuels
        const balances= await calculateBalance(expensesAll);
        
        // generer la liste des remboucements
        const repayments = await generateReimbursementList(balances, groupId);

        console.log(`repayments ${JSON.stringify(repayments, null, 2)}`);

        res.status(200).json({message: 'Liste des remboussement remboussement', repayments})
        
    } catch (error) {
        console.error(`Erreur lors du calcul des remboussements: ${error}`)
        res.status(500).json({message: 'Erreur de serveur interne'})
    }
}