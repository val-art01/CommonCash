import User from "./models/Users";
import bcrypt from "bcrypt";
import crypto from "crypto";

export const registerUser = async (userData) => {
    const { name, email, password } = userData;

    try {
        // Générer une valeur pour le champ 'iv'
        const ivValue = crypto.randomBytes(16).toString('hex');
        const passwordHash = await bcrypt.hash(password, 10);

        // Créer un nouvel utilisateur
        const newUser = new User({
            name,
            email,
            password: passwordHash,
            iv: ivValue,
        });

        // Enregistrer l'utilisateur dans la base de données
        const savedUser = await newUser.save();

        return savedUser;
    } catch (error) {
        throw error;
    }
};