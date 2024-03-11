import fs from 'fs';
import path from 'path'
import {addExpense} from './../services/expenseService.js'
import { updateUser } from './userController.js';

/**
 * Crée une nouvelle dépense à partir des données de la requête et l'ajoute à la base de données.
 * @param {object} req - L'objet de requête contenant les données de la dépense (groupId, amount, description) et l'utilisateur connecté (req.user._id).
 * @param {object} res - L'objet de réponse à renvoyer une fois la dépense créée.
 * @returns {Promise<void>} - Ne renvoie aucune valeur directement, mais envoie une réponse JSON avec un message et la nouvelle dépense en cas de succès.
 * @throws {Error} - Une erreur est capturée et renvoie une réponse avec un message d'erreur en cas d'échec.
*/
export const createExpense = async (req, res) =>{
    try{
        const { title, amount, description, category, groupId, membersInvolved} = req.body;
        const paidBy = req.user._id; 
        const file = req.file
  
        // Utiliser la fonction uploadFile pour gérer le téléchargement du fichier
        uploadFile (file, res, (receiptFilename) => {
            // Utiliser le service pour créer la dépense avec le nom de fichier du justificatif
            addExpense (title, amount, description, receiptFilename, category, paidBy, groupId, membersInvolved)
                .then((newExpense) =>{
                    res.status(201).json({message: 'Dépense créée avec succès', newExpense})
                })
                .catch ((error) =>{
                    console.error('Erreur lors de la création de la dépense: ' + error)
                    res.status(500).json({response: 'Erreur de serveur interne: '})
                });
        });
    } catch (error) {
        console.error('Erreur lors de la création de la dépense: ' + error);
        res.status(500).json({ response: 'Erreur de serveur interne' });
    }
}

const uploadFile = (file, res, callback) =>{

    // Ajout d'une validation spécifique du serveur
    const maxSizeInBytes = 10 * 1024 * 1024 // 3MB
    if(file.size > maxSizeInBytes){
        return res.status(400).json({ message: 'La taille du document dépasse la limite qui est de 3MB' });
    }

    // Générer un nom de fichier unique
    const uniqueFilename = `${Date.now()}-${Math.round(Math.random() * 1E9)}.pdf`;

    // Verifier si le fichier est au format PDF
    if (!file.originalname.toLowerCase().endsWith('.pdf')) {
        return res.status(400).json({ message: 'Le document doit être au format PDF' });
    }
    
    // Gérer le document téléchargé
    const filePath = `upload/${file.originalname}`;

    fs.rename(file.path, filePath, (error) => {
        if (error) {
            return res.status(500).send('Erreur d\'enregistrement du document');
        }

        // Renvoyer le nom de fichier unique à travers le callback
        callback(uniqueFilename);
    });
}