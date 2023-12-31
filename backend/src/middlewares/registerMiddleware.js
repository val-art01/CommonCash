import User from '../models/Users.js';
import validator from 'validator';

// Middleware de validation des donnees de l'utilisateur
const validateRegistration = async (req, res, next) => {
    const {name, email, password} = req.body;


        if (!isValidName(name)){
            return res.status(400).json({ message: 'Le nom doit contenir au moins 3 caractères' });
        }

    
    if(!validator.isEmpty(email)){
        if (isValidEmail(email)) {
            // vérification si l'email est deja enregistré
            try {
                const existingEmail = await User.findOne({ email });
                if(existingEmail){
                    return res.status(400).json({message: `Cet email est déjà enregistré`})
                }

            } catch (error) {
                return res.status(500).json({response: 'Erreur lors de la vérification de l\'email enregistré: '+ error})
            }
        }else{
            return res.status(400).json({ message: 'L\'email n\'est pas valide' });
        }
    }else{
        return res.status(400).json({ message: 'Le champ email est vide' });
    }

    
    if (!isValidPassword(password)) {
        return res.status(400).json({
            message: 'Le mot de passe doit contenir au moins 7 caractères avec au moins un caractère spécial et un chiffre'
        });
    }
    

    next();        
};

// Fonction de validation du nom
const isValidName = (name) => {
    return name.length >= 3;
};

// Fonction de validation de l'email
const isValidEmail = (email) => {
    // expression régulière d'email pour des vérifications plus approfondies
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Fonction de validation du mot de passe
const isValidPassword = (password) => {
    // expression régulière pour imposer des conditions spécifiques au mot de passe
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,}$/;
    return passwordRegex.test(password);
};

export {validateRegistration}