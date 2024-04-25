/**
 * Calcule les soldes individuels des membres du groupe en fonction des dépenses.
 * @param {Array} expenses - Les dépenses effectuées comprenant les membres impliqués et les montants.
 * @returns {Object} Un objet contenant les soldes individuels de chaque membre du groupe.
*/
export const calculateBalance = async(expenses) => {
    //objet pour stoker les soldes individuels
    const balances = {};

    expenses.forEach(expense => {
        const paidById = expense.payingMember.toString();
        const members = expense.membersmembersInvolveds;
        // calcule de la ponderation total
        const totalWeight = members.reduce((acc, {pond}) => acc+pond, 0);
        // calcule du montant par uniter de ponderation
        const perWeightAmount = expense.amount / totalWeight;

        // repartion des contribution entre les membres consernes par la depense
        members.forEach(({member, pond}) =>{
            const memberId = member.toString();
            const contribution = pond * perWeightAmount;

            balances[memberId] = (balances[memberId] || 0) - contribution;
        })
        // update le solde de celui qui a paye la depense
        balances[paidById] = (balances[paidById] || 0) + expense.amount;        
    });

    return balances;
}






