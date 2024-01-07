import validator from 'validator';
import User from '../models/Users.js';
import {isValidName, isValidEmail, isValidPassword} from './../services/checkFields.js';

/**
 * Fonction de validation commune utilisée par les middlewares de l'inscription et de la mise à jour.
 * @param {Object} req - L'objet de la requête Express.
 * @param {Object} res - L'objet de la réponse Express.
 * @param {Function} next - La fonction middleware suivante dans la pile.
 * @returns {void}
 */
const commonValidation = async (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body;

    // Valider le nom
    if (!isValidName(name)) {
        return res.status(400).json({ message: 'Le nom doit contenir au moins 3 caractères' });
    }

    // Valider l'email
    if (!validator.isEmpty(email)) {
        if (!isValidEmail(email)) {
            return res.status(400).json({ message: 'L\'email n\'est pas valide' });
        }

        // Vérification si l'email est déjà enregistré
        try {
            const existingEmail = await User.findOne({ email });
            if (existingEmail) {
                return res.status(400).json({ message: `Cet email est déjà enregistré` });
            }
        } catch (error) {
            return res.status(500).json({ response: 'Erreur lors de la vérification de l\'email enregistré: ' + error });
        }
    } else {
        return res.status(400).json({ message: 'Le champ email est vide' });
    }

    // Valider les mots de passe s'ils sont fournis
    if (isValidPassword(password) && isValidPassword(confirmPassword)) {
        const result = password.localeCompare(confirmPassword);
        if (result !== 0) {
            return res.status(400).json({ message: "les mot de passe ne corespondent pas" });
        }else{
            // Vérification si le mot de passe est déjà enregistré
            try {
                const isUniquePassword  = await User.findOne({ password });
                if (isUniquePassword ) {
                    return res.status(400).json({ message: 'Ce mot de passe est déjà utilisé par un autre utilisateur' });
                }
            } catch (error) {
                console.error('Erreur lors de la vérification de l\'unicité du mot de passe :', error.message);
            }
        }
    } else {
        return res.status(400).json({
            message: 'Le mot de passe doit contenir au moins 7 caractères avec au moins un caractère spécial et un chiffre'
        });
    }

    next();
};

/**
 * Middleware de validation pour l'inscription.
 * @param {Object} req - L'objet de la requête Express.
 * @param {Object} res - L'objet de la réponse Express.
 * @param {Function} next - La fonction middleware suivante dans la pile.
 * @returns {void}
 */
const validateRegister = async (req, res, next) => {
    await commonValidation(req, res, next);
};

/**
 * Middleware de validation pour la mise à jour de l'utilisateur.
 * @param {Object} req - L'objet de la requête Express.
 * @param {Object} res - L'objet de la réponse Express.
 * @param {Function} next - La fonction middleware suivante dans la pile.
 * @returns {void}
 */
const validateUpdate = async (req, res, next) => {
    await commonValidation(req, res, next);
};


export { validateRegister, validateUpdate };
