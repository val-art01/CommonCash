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
    const sortBalances = Object.entries(balanceCopy).sort((a, b) => a[1] - b[1]);

    // indices pour parcourir les soldes triés
    let i = 0;
    let j = sortBalances.length - 1;

    // console.log(`sortBalances ${JSON.stringify(sortBalances[4], null, 2)}`);
    // console.log(`sortBalances ${sortBalances[0]}`);

    while (i < j){
        // infos sur le débiteur et le créditeur
        const [debtorIndex, debtorIdBalance] = sortBalances[i];
        const [creditorIndex, creditorIdBalance] = sortBalances[j];

        // calcul du montant à rembouser(min entre les soldes absolus des 2)
        const amount = Math.min(Math.abs(debtorIdBalance.amount), Math.abs(creditorIdBalance.amount));

        // ajout du remboussement dans le tableau
        repayments.push({group: debtorIdBalance.group, debtorName: debtorIdBalance.name, creditorName: creditorIdBalance.name, amount});

        // enregistrer chaque renboursement dans la BD
        const newRefund = new Refund({
            groupId: groupId,
            debtorId: debtorIdBalance.idUser,
            creditorId: creditorIdBalance.idUser,
            amount: amount
        });
        await newRefund.save();

        // update des soldes copies
        balanceCopy[debtorIndex].amount += amount;
        balanceCopy[creditorIndex].amount -= amount;

        console.log(`balanceCopy: ${JSON.stringify(balanceCopy, null, 2)}`);

        // verification des soldes nuls
        if(balanceCopy[debtorIndex].amount === 0){
            i++;
        }
        if(balanceCopy[creditorIndex].amount === 0){
            j--;
        }    
    }
    return repayments;
}

