import path from 'path'
import {addSpend, getAllSpends, getSpendById, search} from '../services/expenseService.js'
// import uploadFile from './uploadFileController.js'

/**
 * Crée une nouvelle dépense à partir des données de la requête et l'ajoute à la base de données.
 * @param {object} req - L'objet de requête contenant les données de la dépense (groupId, amount, description) et l'utilisateur connecté (req.user._id).
 * @param {object} res - L'objet de réponse à renvoyer une fois la dépense créée.
 * @returns {Promise<void>} - Ne renvoie aucune valeur directement, mais envoie une réponse JSON avec un message et la nouvelle dépense en cas de succès.
 * @throws {Error} - Une erreur est capturée et renvoie une réponse avec un message d'erreur en cas d'échec.
*/
export const createSpend = async (req, res) =>{
    try{
        const { title, amount, category, groupId, membersInvolved} = req.body;
        const payingMember = req.user._id; 
        // const file = req.file

        // console.log(`payingMember: ${payingMember}, \n membersInvolved: ${membersInvolved}`)

        // Gérer la pondération par défaut
        const membersWithDefaultPond = membersInvolved.map(member => ({
            member: member.member,
            ponderation: member.ponderation
        }));

        // uploadFile pour gérer le téléchargement du fichier
        // const receiptFilename = uploadFile(file);

        // service pour ajouter la dépense avec le nom de fichier du justificatif
        const newExpense = await addSpend (title, amount, /*receiptFilename,*/ category, payingMember, groupId, membersWithDefaultPond)

        res.status(201).json({message: 'Dépense créée avec succès', newExpense})
                
    } catch (error) {
        console.error('Erreur lors de la création de la dépense: ' + error);
        res.status(500).json({ response: 'Erreur de serveur interne' });
    }
}

/**
 * Récupère les dépenses d'un groupe spécifique.
 * @param {object} req - L'objet de requête contenant les paramètres.
 * @param {object} res - L'objet de réponse pour renvoyer les dépenses.
 * @returns {Promise<void>} - Une promesse qui ne renvoie aucune valeur explicite.
*/
export const getGroupSpends = async (req, res) => {
    try {
        const { groupId } = req.params;
        const expenses = await getAllSpends(groupId)
        res.status(200).json({ expenses });
    } catch (error) {
        console.error('Erreur lors de la récupération des dépenses :', error);
        res.status(500).json({ response: 'Erreur de serveur interne' });
    }
}

/**
 * Récupère les détails d'une dépense spécifique.
 * @param {object} req - L'objet de requête contenant l'identifiant de la dépense.
 * @param {object} res - L'objet de réponse pour renvoyer les détails de la dépense.
 * @returns {Promise<void>} - Une promesse qui ne renvoie aucune valeur explicite.
*/
export const getSpendDetail = async (req, res) =>{
    try {
        const { id } = req.params;
        const expense  = await getSpendById(id);
        res.status(200).json({ expense });
    } catch (error) {
        console.error('Erreur lors de la récupération des détails de la dépense :', error);
        res.status(500).json({ response: 'Erreur de serveur interne' });
    }
}

/**
 * Recherche les justificatifs en fonction d'un terme de recherche.
 * @param {object} req - L'objet de requête contenant le terme de recherche.
 * @param {object} res - L'objet de réponse pour renvoyer les justificatifs correspondants.
 * @returns {Promise<void>} - Une promesse qui ne renvoie aucune valeur explicite.
*/
export const searchReceipts = async (req, res) => {
    try {
        const searchTerm = req.body.searchTerm; 
        const receipts = await search(searchTerm);
        res.json(receipts);
    } catch (error) {
        console.error('Erreur lors de la recherche de justificatifs :', error);
        res.status(500).json({ message: 'Erreur de serveur interne' });
    }
};

/**
 * Trie les dépenses en fonction d'un critère de tri spécifié.
 * @param {object} req - L'objet de requête contenant le critère de tri.
 * @param {object} res - L'objet de réponse pour renvoyer les dépenses triées.
 * @returns {Promise<void>} - Une promesse qui ne renvoie aucune valeur explicite.
*/
export const sortExpenses = async (req, res) => {
    try {
        const sortBy = req.query.sortBy;
        const sortedExpenses = await Spend.find().sort(sortBy);
        res.json(sortedExpenses);
    } catch (error) {
        console.error('Erreur lors du tri des dépenses :', error);
        res.status(500).json({ message: 'Erreur de serveur interne' });
    }
};

// export const downloadReceipt = async (req, res) =>{
//     try {        
//         const {id} = req.params;
//         const expense  = await getExpenseById(id);

//         const filePath = path.join(__dirname, './../../uploads', expense.receipts[0]);

//         res.status(200).json({ filePath });
//     } catch (error) {
//         console.error('Erreur lors de la récupération du justificatif :', error.message);
//         res.status(500).json('Erreur de serveur interne');
//     }
// }
