// Fonction de validation du nom
export const isValidName = (name) => {
    return name.length >= 3;
};

// Fonction de validation de l'email
export const isValidEmail = (email) => {
    // expression régulière d'email pour des vérifications plus approfondies
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Fonction de validation du mot de passe
export const isValidPassword = (password) => {
    // expression régulière pour imposer des conditions spécifiques au mot de passe
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,}$/;
    return passwordRegex.test(password);
};