import fs from 'fs';
import path from 'path';

/**
 * Télécharge un fichier et renvoie le nom de fichier unique.
 * @param {object} file - L'objet de fichier téléchargé.
 * @returns {string} - Le nom de fichier unique.
 * @throws {Error} - Erreur si la validation échoue.
*/
const uploadFile = (file) => {
  try {
    // Ajout d'une validation spécifique du serveur
    const maxSizeInBytes = 10 * 1024 * 1024; // 3MB
    if (file.size > maxSizeInBytes) {
      throw new Error('La taille du document dépasse la limite qui est de 3MB');
    }

    // Verifier si le fichier est au format
    const allowedFileTypes = ['.pdf', '.jpg', '.jpeg', '.png'];
    const fileExtension = path.extname(file.originalname).toLowerCase();
    if (!allowedFileTypes.includes(fileExtension)) {
      throw new Error('Le document doit être au format PDF, JPG, JPEG ou PNG');
    }

    // Générer un nom de fichier unique
    const uniqueFilename = `${Date.now()}-${Math.round(Math.random() * 1E9)}${fileExtension}`;

    // Gérer le document téléchargé
    const filePath = path.join('uploads', uniqueFilename);
    fs.renameSync(file.path, filePath);

    // Retourner le nom de fichier unique
    return uniqueFilename;
  } catch (error) {
    throw error;
  }
};

export default uploadFile;
