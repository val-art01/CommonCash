import User from "./../models/Users.js";

export const registerUser = async (name, email, password, ivValue) => {
    try {
        
        // Créer un nouvel utilisateur
        const newUser = new User({
            name,
            email,
            password,
            iv: ivValue,
        });

        // Enregistrer l'utilisateur dans la base de données
        const savedUser = await newUser.save();

        return savedUser;
    } catch (error) {
        throw error;
    }
};