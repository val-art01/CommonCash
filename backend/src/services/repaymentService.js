import Refund from "./../models/Refund.js";

/**
 * Génère la liste des remboursements nécessaires pour équilibrer les comptes en fonction des soldes des membres.
 * @param {Object} balances - Les soldes individuels des membres du groupe.
 * @param {string} groupId - L'identifiant du groupe pour lequel les remboursements sont générés.
 * @returns {Array} La liste des remboursements nécessaires pour équilibrer les comptes.
*/
export const generateReimbursementList = async (balances, groupId) => {

    const repayments = [];
    const balanceCopy = {...balances};
    
    //Trier les soldes de façon croissant
    const sortBalances = Object.entries(balanceCopy).sort((a, b) => a[i] - b[i]);
    
    // indices pour parcourir les soldes triés
    let i = 0;
    let j = sortBalances.length - i;

    while (i < j){
        // infos sur le débiteur et le créditeur
        const [debtorId, debtorIdBalance] = sortBalances[i];
        const [creditorId, creditorIdBalance] = sortBalances[j];

        // calcul du montant à rembouser(min entre les soldes absolus des 2)
        const amount = Math.min(Math.abs(debtorIdBalance), Math.abs(creditorIdBalance));

        // ajout du remboussement dans le tableau
        repayments.push({debtor: debtorId, creditor: creditorId, amount});

        // enregistrer chaque renboursement dans la BD
        const newRefund = new Refund({
            groupId: groupId,
            debtorId: debtorId,
            creditorId: creditorId,
            amount: amount
        });
        await newRefund.save();

        // update des soldes copies
        balanceCopy[debtorId] += amount;
        balanceCopy[creditorId] += amount;

        // verification des soldes nuls
        if(balanceCopy[debtorId] === 0){
            i++;
        }
        if(balanceCopy[creditorId] === 0){
            j--;
        }
    }

    return repayments;
}

