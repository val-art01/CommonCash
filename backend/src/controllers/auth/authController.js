import User from "../../models/Users.js"
import {generateTokenAndSave, verifyPassword} from '../../services/authService.js'

/**
 * Fonction pour gérer le processus d'authentification standard.
 * @param {Object} req - L'objet de la requête Express.
 * @param {Object} res - L'objet de la réponse Express.
 * @returns {void}
 */
export const login = async (req, res)=>{
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({message: 'Email ou mot de passe incorrect'})
        }

        const isPasswordValid = await verifyPassword(password, user.password)
        if(!isPasswordValid){
            return res.status(401).json({message: 'Email ou mot de passe incorrect'})
        }
        
        const authToken = await generateTokenAndSave(user);

        const { password: _, ...others } = user._doc;
        res.status(200).json({ ...others, authToken });

    } catch (error) {
        res.status(500).json({ response: 'Internal server error: ' + error.message });
    }
}