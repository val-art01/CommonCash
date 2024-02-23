import jwt from 'jsonwebtoken';
import User from "../models/Users.js"

/**
 * Middleware d'authentification base sur les tokens JWT
 * 
 * @param {Object} req - Objet de requete Express.
 * @param {Object} res - Objet de reponse Express
 * @param {Function} next - Fonction middleware suivant
 * @returns {void}
 * @throws {objet} - Renvoie une erreur si l'authentification echoue
 */

export const authentification = async(req, res, next) => {
  try{

    const authToken = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(authToken, process.env.JWT_SEC);

    // Vérifier si l'utilisateur existe avec le token donné
    const user = await User.findOne({
      _id: decodedToken.id, 
      'authTokens.authToken': authToken
    })

    if (!user){
      return res.status(403).json('Token invalide ou utilisateur non trove');
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