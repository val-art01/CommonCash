import User from './../models/Users.js';
import bcrypt from "bcrypt";
import crypto from "crypto";

// Inscription d'un nouvel utilisateur
export const register = async (req, res) =>{
    const { name, email, password } = req.body
    try{
        // Generate a value for the 'iv' field
        const ivValue = crypto.randomBytes(16).toString('hex');
        const passwordAxe = await bcrypt.hash(password, 10);

        // Créer un nouvel utilisateur
        const newUser = new User({
            name,
            email,
            password: passwordAxe,
            iv: ivValue
        });

        // Enregistrer l'utilisateur dans la base de données
        const savedUser = await newUser.save();
        res.status(201).json({ message: `Compte utilisateur créé avec succès ${savedUser}` });
    }catch(err){
        res.status(500).json({ response: 'Internal server error: ' + err.message })
    }
}