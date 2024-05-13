import User from "../models/Users.js";
import {getGroupById, getGroupByName} from './../services/groupService.js';

/**
 * Middleware pour vérifier si le nom du groupe est renseigné dans le corps de la requête.
 *
 * @param {Object} req - L'objet de la requête Express.
 * @param {Object} res - L'objet de la réponse Express.
 * @param {function} next - La fonction pour passer au middleware suivant.
 * @returns {void}
*/
const validateGroupName = async (req, res, next) => {
  const { name, members } = req.body;
  
  if (!name || name.trim() === '') {
     return res.status(400).json({ error: 'Le nom du groupe est requis.' });
  }

  // Vérification si l'email est déjà enregistré
  // try {
  //   const existingName = await getGroupByName(name);
  //   if (existingName) {
  //     return res.status(400).json({ message: `Ce nom du groupe est déjà enregistré` });
  //   }
  // } catch (error) {
  //   return res.status(500).json({ response: 'Erreur lors de la vérification du nom enregistré: ' + error });
  // }

  // Vérifier si le champ members est vide
  // if (!members || members.length === 0) {
  //   return res.status(400).json({ error: 'Le champ members est requis.' });
  // }
  next();
};

/**
 * Middleware pour vérifier si le nom ou la description du groupe est renseigné dans le corps de la requête.
 *
 * @param {Object} req - L'objet de la requête Express.
 * @param {Object} res - L'objet de la réponse Express.
 * @param {function} next - La fonction pour passer au middleware suivant.
 * @returns {void}
*/
const validateGroupChamps = (req, res, next) => {
  const {name, description } = req.body;

  if ((!name || name.trim() === '') && (!description || description.trim() === '')) {
    return res.status(400).json({ error: 'La modification d\'un champs(name || description) est requis.' });
  }

  existGroup(req, res, next);

  next();
};

/**
 * Middleware pour vérifier si un groupe existe, si l'utilisateur connecté est un membre du groupe.
 * 
 * @param {Object} req - L'objet de la requête Express.
 * @param {Object} res - L'objet de la réponse Express.
 * @param {function} next - La fonction pour passer au middleware suivant.
 * @returns {void}
*/
const existGroup = async (req, res, next) => {
  const { id } = req.params;
  const loggedInUserId = req.user._id.toString(); 
  const { groupId } = req.body;

  try {  
    // console.log(`groupId: ${groupId}`);
    // Récupérer le groupe par son ID
    const groupIdOK = id || groupId;
    const group = await getGroupById(groupIdOK);
    if (!group) {
      return res.status(404).json({ error: 'Le groupe n\existe pas.' });
    }

    // Vérifier si l'utilisateur connecté est un membres du groupe
    const members = group.members.map(member => member.toString());
    const admins = group.admins.map(admin => admin.toString());

    if(!members.includes(loggedInUserId) && !admins.includes(loggedInUserId)){
      return res.status(403).json({error:'Vous n\'etes pas membres de ce groupe'})
    }

    next();
  } catch (error) {
    console.error('Erreur lors de la vérification: ', error.message);
    res.status(500).json({ response: 'Erreur de serveur interne' });
  }
};

/**
 * Middleware pour vérifier si l'utilisateur connecté est un administrateur du groupe,
 * si les membres à ajouter ne sont pas déjà dans le groupe et si les utilisateurs ont un compte.
 * 
 * @param {Object} req - L'objet de la requête Express.
 * @param {Object} res - L'objet de la réponse Express.
 * @param {function} next - La fonction pour passer au middleware suivant.
 * @returns {void}
*/
const checkGroupManagementauthorisations = async (req, res, next) => {
  const { id } = req.params;
  const { members } = req.body;

  try {  
    const loggedInUserId = req.user._id.toString();
    // Récupérer le groupe par son ID
    const group = await getGroupById(id);
    if (!group) {
      return res.status(404).json({ error: 'Le groupe n\existe pas.' });
    }

    // Vérifier si l'utilisateur connecté est un administrateur du groupe
    const admins = group.admins.map(admin => admin.toString());
    if(!admins.includes(loggedInUserId)){
      return res.status(403).json({error:'Vous n\'avez pas la la permission d\'ajouter des membres à ce groupe'})
    }

    // Vérifier si les membres à ajouter ne sont pas déjà dans le groupe
    const existingMembers = group.members.filter(member => members.includes(member.toString()));
    if (existingMembers.length > 0) {
      return res.status(400).json({ error: 'Certains membres sont déjà dans le groupe.' });
    }

    // Vérifier si les utilisateurs ont un compte
    const usersWithoutAccount = await checkUsersExistence(members);
    if (usersWithoutAccount.length > 0) {
      return res.status(400).json({ error: 'Certains membres n\'ont pas de compte.', usersWithoutAccount });
    }

    next();
  } catch (error) {
    console.error('Erreur lors de la vérification des membres :', error.message);
    res.status(500).json({ response: 'Erreur de serveur interne' });
  }
};

/**
 * Vérifie si les utilisateurs ont un compte.
 * @param {Array} userIds - Les IDs des utilisateurs à vérifier.
 * @returns {Array} Les IDs des utilisateurs qui n'ont pas de compte.
*/
const checkUsersExistence = async (userIds) =>{
  try {
    // Convertir les chaînes en objets ObjectId
    //const objectIdUserIds = userIds.map(id => new mongoose.Types.ObjectId(id));

    // Executer toutes les requetes en prallele avec Promise.all
    const userPromises = userIds.map(userId => User.findById(userId));
    const users = await Promise.all(userPromises);

    // Filtrer les utilisateurs qui n'ont pas de compte
    const usersWithoutAccount = userIds.filter((userId, index) => !users[index]);

    return usersWithoutAccount;
  } catch (error) {
    throw new Error('Erreur lors de la vérification des utilisateurs: ' + error.message);
  }
};

export {validateGroupName, validateGroupChamps, existGroup, checkGroupManagementauthorisations};
  