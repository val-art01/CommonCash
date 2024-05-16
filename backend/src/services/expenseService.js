import Expense from "../models/Expense.js";

/**
 * Ajoute une dépense dans la base de données.
 * @param {string} title - L'intitulé de la dépense.
 * @param {number} amount - Le montant de la dépense.
 * @param {string} receiptFile - Le fichier du justificatif au format pdf ou image.
 * @param {string} category - La catégorie de la dépense.
 * @param {string} payingMember - L'identifiant du membre ayant réglé la dépense.
 * @param {string} groupId - L'identifiant du groupe auquel la dépense est associée.
 * @returns {Promise<object>} - La dépense ajoutée à la base de données.
 * @throws {Error} - Une erreur est levée si l'ajout de la dépense échoue. 
*/
export const addSpend = async (title, amount, /*receiptFile,*/ category, payingMember, groupId, membersInvolved) => {
    try {
        // Convertir payingMember en ObjectId
        // payingMember = mongoose.Types.ObjectId(payingMember);

        // Convertir chaque membre en ObjectId
        // const membersInvolvedObjectIds = membersInvolved.map(({ member, ponderation }) => ({
        //     member: mongoose.Types.ObjectId(member),
        //     ponderation
        // }));
        const newSpend = new Expense({
            title,
            amount,
            // receipts: [receiptFile.filename],
            category,
            payingMember,
            groupId,
            membersInvolveds: membersInvolved
        });

        // Sauvegarder la dépense dans la base de données
        await newSpend.save();
        return newSpend;
    } catch (error) {
        throw error;
    }
}

/**
 * Récupère toutes les dépenses associées à un groupe spécifique.
 * @param {string} groupId - L'identifiant du groupe pour lequel récupérer les dépenses.
 * @returns {Promise<array>} - Une promesse qui se résout avec un tableau contenant toutes les dépenses du groupe si réussie, sinon rejette avec une erreur.
*/
export const getAllSpends = async (groupId) => {
    try {
        const spends = await Expense.find({groupId}).populate('payingMember membersInvolveds.member');
        return spends;
    } catch (error) {
        throw error;
    }
};

/**
 * Récupère une dépense à partir de son identifiant.
 * @param {string} spendId - L'identifiant de la dépense à récupérer.
 * @returns {Promise<object>} - Une promesse qui se résout avec la dépense correspondante si réussie, sinon rejette avec une erreur.
*/
export const getSpendById = async (spendId) => {
    try {
        // const spend = await Spend.findById(spendId).populate('paidBy', 'name').exec();
        const spend = await Expense.findById(spendId).populate('payingMember membersInvolveds.member');
        return spend;
    } catch (error) {
        throw error;
    }
};

/**
 * Recherche les dépenses en fonction d'un terme de recherche dans les reçus.
 * @param {string} searchTerm - Le terme de recherche pour les reçus des dépenses.
 * @returns {Promise<array>} - Une promesse qui se résout avec un tableau contenant les dépenses correspondant au terme de recherche si réussie, sinon rejette avec une erreur.
*/
export const search = async (searchTerm) => {
    try {
      const spends = await Expense.find({ 'receipts': { $regex: searchTerm, $options: 'i' } });
      return spends;
    } catch (error) {
      throw error;
    }
};
  