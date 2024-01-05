import jwt from 'jsonwebtoken';
import User from "../models/Users.js"

export const checkSession = (req, res, next) => {
  const userId = req.user.id;
  if(!activeSessions[userId]){
      return res.status(401).json({ message: 'Session expirée ou invalide' });
  }

  next();
}

export const authentification = async(req, res, next) => {
  try{
    const authToken = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(authToken, process.env.JWT_SEC);

    const user = await User.findOne({
      _id: decodedToken.id, 
      'authTokens.authToken': authToken
    })

    if (!user){
      return res.status(403).json('Token is not valid');
    }
    req.authToken = authToken;
    req.user = user;
    next();

  }catch(error){
    return res.status(401).json("Vous n'êtes pas authentifié !")
  }
}