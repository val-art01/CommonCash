/**
 * Fonction de validation du nom.
 * @param {string} name - Le nom à valider.
 * @returns {boolean} - True si le nom est valide, sinon false.
 */
const isValidName = (name) => {
    return name.length >= 3;
};

/**
 * Fonction de validation de l'email.
 * @param {string} email - L'email à valider.
 * @returns {boolean} - True si l'email est valide, sinon false.
 */
const isValidEmail = (email) => {
    // expression régulière d'email pour des vérifications plus approfondies
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

/**
 * Fonction de validation du mot de passe.
 * @param {string} password - Le mot de passe à valider.
 * @returns {boolean} - True si le mot de passe est valide, sinon false.
 */
const isValidPassword = (password) => {
    // expression régulière pour imposer des conditions spécifiques au mot de passe
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,}$/;
    return passwordRegex.test(password);
};

export {isValidName, isValidEmail, isValidPassword}