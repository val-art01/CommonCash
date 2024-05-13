import {getGroupById} from './groupService.js';

/**
 * Calcule les soldes individuels des membres du groupe en fonction des dépenses.
 * @param {Array} expenses - Les dépenses effectuées comprenant les membres impliqués et les montants.
 * @returns {Object} Un objet contenant les soldes individuels de chaque membre du groupe.
*/
export const calculateBalance = async(expenses) => {
    //objet pour stoker les soldes individuels
    const balances = {};
    let groupId;
    expenses.forEach(expense => {
        const paidById = expense.payingMember.toString();
        const members = expense.membersInvolveds;
        groupId = expense.groupId.toString();    
        // calcule de la ponderation total
        const totalWeight = members.reduce((acc, {ponderation}) => acc+ponderation, 0);
        // calcule du montant par uniter de ponderation
        const perWeightAmount = expense.amount / totalWeight;

        // repartion des contribution entre les membres consernes par la depense
        members.forEach(({member, ponderation}) =>{
            const memberId = member.toString();
            const contribution = ponderation * perWeightAmount;

            balances[memberId] = (balances[memberId] || 0) - contribution;
        })
        // update le solde de celui qui a paye la depense
        balances[paidById] = (balances[paidById] || 0) + expense.amount;
        balances[groupId] = (balances[groupId]);        
    });

    const balancesInfos = await extractBalanceInfos(balances, groupId);
    return balancesInfos;
}

const extractBalanceInfos  = async (balances, groupId) =>{
    const listInfos = [];
    const groupInfos = await getGroupById(groupId);

    for(const key in balances){
        if (balances.hasOwnProperty(key)) {
            // Extraire les informations de la chaîne de clé
            const regex = /_id: new ObjectId\('([^']*)'\),\s*name: '([^']*)',\s*email: '([^']*)'/;
            const match = key.match(regex);

            if (match) {
                const group = groupInfos.name;
                const name = match[2];
                const email = match[3];
                const amount = balances[key];
                const idUser = match[1];
                listInfos.push({group, name, email, amount, idUser });
            }
        }
    }
    return listInfos
}





