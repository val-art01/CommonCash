
/**
 * Valide le montant et la description de la dépense à partir des données de la requête.
 * @param {object} req - L'objet de requête contenant les données de la dépense (amount, description).
 * @param {object} res - L'objet de réponse à renvoyer en cas de validation échouée.
 * @param {function} next - Le prochain middleware à appeler si la validation réussit.
 * @returns {Promise<void>} - Ne renvoie aucune valeur directement, mais appelle le middleware suivant si la validation réussit, sinon envoie une réponse d'erreur.
*/
const validateAmountDesc = async (req, res, next) => {
    const {title, amount, description } = req.body;

    // Validation pour le champ description
    if (title && title.length < 4 && title.length > 16) {
        return res.status(400).json({ message: 'Le champ title ne doit etre compris entre 3 et 15  caractères' });
    }

    // Validation pour le champ amount
    if (!/^\d+(\.\d{1,2})?$/.test(amount)) {
        return res.status(400).json({ message: 'Le champ amount doit contenir uniquement des chiffres et au plus 2 chiffres après la virgule' });
    }

    // Validation pour le champ description
    if (description && description.length > 50) {
        return res.status(400).json({ message: 'Le champ description ne doit pas dépasser 50 caractères' });
    }

    // Si la validation réussit, passez au middleware suivant
    next();
};

export {validateAmountDesc};