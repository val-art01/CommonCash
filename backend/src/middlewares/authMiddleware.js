import mongoose from 'mongoose'
import jwt from 'jsonwebtoken';
import User from "../models/Users.js"

/**
 * Vérifie l'utilisateur.
 *
 * @param {string} decodedId - L'ID décodé de l'utilisateur.
 * @param {string} authToken - Le jeton d'authentification.
 * @param {string} userId - L'ID de l'utilisateur.
 * @returns {Object|null} L'utilisateur ou null si l'utilisateur n'est pas trouvé ou si les IDs ne correspondent pas.
 */
const verifyUser = async (decodedId, authToken, userId) => {
  const user = await User.findOne({
    _id: decodedId,
    'authTokens.authToken': authToken
  });

  if (!user || user._id.toString() !== userId.toString()) {
    return null;
  }

  return user;
};

/**
 * Middleware d'authentification base sur les tokens JWT
 * 
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @param {Function} next - La fonction next de Express.
 * @param {string} [userId] - L'ID de l'utilisateur (optionnel).
 * @returns {Promise<void>} Ne renvoie rien.
 */
const authenticate = async(req, res, next, userId) => {
  try{

    const authToken = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(authToken, process.env.JWT_SEC);

    // Verify if the cartId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(decodedToken.id)) {
      return res.status(400).json("Invalid cart ID!");
    }
    
    // Vérifier si l'utilisateur existe avec le token donné
    const user = await verifyUser(decodedToken.id, authToken, userId || decodedToken.id);

    if (!user){
      return res.status(403).json('Token invalide ou utilisateur non trover');
    }

    req.authToken = authToken;
    req.user = user;

    next();
  }catch(error){
    // Gérer les erreurs liées à la vérification du token
    console.error('Erreur d\'authentification :', error.message);
    return res.status(401).json("Vous n'êtes pas authentifié !")
  }
}


/**
 * Authentifie l'utilisateur avec l'ID envoyé via l'URL.
 *
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @param {Function} next - La fonction next de Express.
 * @returns {Promise<void>} Ne renvoie rien.
 */
export const authentificationWithId = async (req, res, next) => {
  authenticate(req, res, next, req.params.id);
};

/**
 * Authentifie l'utilisateur sans ID envoyé via l'URL.
 *
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @param {Function} next - La fonction next de Express.
 * @returns {Promise<void>} Ne renvoie rien.
 */
export const authentificationWithoutId = async (req, res, next) => {
  authenticate(req, res, next);
};
