import mongoose from 'mongoose';
import Expense from "../models/Expense.js";

/**
 * Ajoute une dépense dans la base de données.
 * @param {string} groupId - L'identifiant du groupe auquel la dépense est associée.
 * @param {string} authorId - L'identifiant de l'auteur de la dépense.
 * @param {number} amount - Le montant de la dépense.
 * @param {string} description - La description de la dépense.
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

export const getAllSpends = async (groupId) => {
    try {
      const spends = await Expense.find({groupId}).populate('payingMember membersInvolveds.member');
      return spends;
    } catch (error) {
      throw error;
    }
};

/**
 * Récupère une dépense de l'utilisateur
 *
 * @param {string} spendId - L'identifiant du depense.
 * @returns {Promise<object|null>} - Une promesse résolue avec la justification de depense, ou null si le groupe n'est pas trouvé.
 * @throws {Error} - Une erreur si la récupération du groupe échoue.
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

export const search = async (searchTerm) => {
    try {
      const spends = await Expense.find({ 'receipts': { $regex: searchTerm, $options: 'i' } });
      return spends;
    } catch (error) {
      throw error;
    }
};
  