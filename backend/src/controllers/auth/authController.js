import User from "../../models/Users.js"
import {generateTokenAndSave, verifyPassword} from '../../services/authService.js'

const activeSessions = {};  // Variable en mémoire pour stocker les sessions actives

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
        activeSessions[user._id] = true;     
        res.status(200).json({ ...others, authToken });

    } catch (error) {
        res.status(500).json({ response: 'Internal server error: ' + error.message });
    }
}

export const logoutOne = async (req, res) => {
    const user = req.user;
    console.log(`user: ${req.body}`)
    try {
        user.authTokens = user.authTokens.filter((authToken) =>{
            return authToken.authToken !== req.authToken;
        });
        delete activeSessions[user.id];
        req.session.destroy();
        await user.save
        res.status(200).json({ message: 'Déconnexion réussie' });
    } catch (error) {
        res.status(500).json({ response: 'Internal server error: ' + error.message });
    }    
};

export const logoutAll = async (req, res) => {
    const user = req.user;
    console.log(`user: ${req.body}`)
    console.log('Decoded Token:', JSON.stringify(req.body));

    try {
        user.authTokens = [];
        delete activeSessions[user.id];
        req.session.destroy();
        await user.save()
        res.status(200).json({ message: 'Déconnexion réussie' });
    } catch (error) {
        res.status(500).json({ response: 'Internal server error: ' + error.message });
    }    
};

export const checkSession = (req, res, next) => {
    const userId = req.user.id;
    if(!activeSessions[userId]){
        return res.status(401).json({ message: 'Session expirée ou invalide' });
    }

    next();
}