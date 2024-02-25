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
export const addExpense = async (title, amount, description, receiptFile, category, paidBy, groupId, membersInvolved) =>{
    try {
        const newExpense = new Expense({
            title,
            amount,
            description,
            receipts: [receiptFile.filename],//// Stocker la référence au fichier de justificatif
            category,
            paidBy,
            groupId,
            membersInvolved           
        });

        // Sauvegarder la dépense dans la base de données
        await newExpense.save();
        return newExpense;
    } catch (error) {
        throw new Error('Erreur lors de l\'ajout d\'une dépense');
    }
}