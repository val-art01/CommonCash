import {getSpendById} from '../services/expenseService.js';

/**
 * Valide le montant de la dépense à partir des données de la requête.
 * @param {object} req - L'objet de requête contenant les données de la dépense (amount, description).
 * @param {object} res - L'objet de réponse à renvoyer en cas de validation échouée.
 * @param {function} next - Le prochain middleware à appeler si la validation réussit.
 * @returns {Promise<void>} - Ne renvoie aucune valeur directement, mais appelle le middleware suivant si la validation réussit, sinon envoie une réponse d'erreur.
*/
const validateAmount = async (req, res, next) => {
    const {title, amount } = req.body;

    // Validation pour le champ description
    if (title && title.length < 4 && title.length > 16) {
      return res.status(400).json({ message: 'Le champ title ne doit etre compris entre 3 et 15  caractères' });
    }

    // Validation pour le champ amount
    if (!/^\d+(\.\d{1,2})?$/.test(amount)) {
      return res.status(400).json({ message: 'Le champ amount doit contenir uniquement des chiffres et au plus 2 chiffres après la virgule' });
    }

    // Si la validation réussit, passez au middleware suivant
    next();
};

const isAvailable = async (req, res, next) => {
  const { id } = req.params;
  try {  
    const expense  = await getSpendById(id);
    if (!expense) {
      return res.status(404).json({ error: 'Dépense non trouvée' });
    }

    // Vérifier si l'utilisateur connecté est un membres du groupe
    // if (!expense.receipts || expense.receipts.length === 0) {
    // return res.status(403).json({error:'Pas de justificatif disponible pour cette dépense'});
    // }

    next();
  } catch (error) {
    console.error('Erreur lors de la vérification: ', error.message);
    res.status(500).json({ response: 'Erreur de serveur interne' });
  }
};

export {validateAmount, isAvailable};