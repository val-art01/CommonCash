import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from "crypto";
import User from "./../models/Users.js";

const ivValue = crypto.randomBytes(16).toString('hex');

/**
 * Fonction pour générer le token d'un utilisateur et le sauvegarde.
 * @param {Object} user
 *@return {token}
 */
const generateTokenAndSave = async (user) => {
    const _id = user._id || user.accountId
    const authToken = jwt.sign(
        { id: _id}, 
        process.env.JWT_SEC, 
        { expiresIn: '3h' }
    );
    user.authTokens.push({authToken});
    await user.save();
    return authToken;
};

/**
 * Fonction générique pour gérer l'authentification OAuth.
 * @param {Object} plainPassword - mot de passe donnee par l'utilisateur.
 * @param {string} hashedPassword - mot de passe recupere dans dans la BD.
 * @return {Boolean} true 
 */
const verifyPassword = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
};

/**
 * Fonction générique pour gérer l'authentification OAuth.
 * @param {Object} profile - Le profil d'utilisateur récupéré de l'authentification OAuth.
 * @param {string} provider - Le nom du fournisseur OAuth (Google, Facebook, etc.).
 * @param {function} done - Fonction de rappel Passport pour indiquer la fin du processus.
 */
export const handleOAuthAuthentication = async (profile, provider, done) => {
    try {
        const { id, displayName, emails } = profile;

        // Recherche de l'utilisateur dans la base de données
        const user = await User.findOne({
            accountId: id,
            provider: provider,
        });

        if (!user) {
            // Création d'un nouvel utilisateur s'il n'existe pas
            const newUser = new User({
                accountId: id,
                name: displayName,
                email: emails[0].value,
                provider: provider,
                iv: ivValue
            });

            const authToken = await generateTokenAndSave(newUser);
            done(null, profile);
        } else {
            // Utilisateur existant, génération d'un nouveau jeton
            const authToken = await generateTokenAndSave(user);
            done(null, profile);
        }
    } catch (error) {
        // Gestion des erreurs
        console.error(`Erreur lors de l'authentification via ${provider}:`, error.message);
        done(error, null);
    }
};

export {generateTokenAndSave, verifyPassword, ivValue}