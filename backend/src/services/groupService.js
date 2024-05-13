import mongoose from 'mongoose';
import Group from '../models/Groups.js';

/**
 * Crée un nouveau groupe dans la base de données.
 *
 * @param {string} name - Le nom du groupe.
 * @param {string} description - La description du groupe.
 * @param {string[]} admins - Les identifiants des administrateurs du groupe.
 * @returns {Promise<object>} - Une promesse résolue avec l'objet du groupe créé.
 * @throws {Error} - Une erreur si la création du groupe échoue.
*/
export const registerGroup = async (name, description, admin ) => {
  
  // Créer un groupe
  const newgroup = new Group({
    name,
    description,
    admins: [admin]
  });

  try {
    // Enregistrer le groupe dans la base de données
    const savedGrope = await newgroup.save() 
    return savedGrope;
  } catch (error) {
    console.error(error);
    throw new Error('Erreur lors de la création du groupe');
  }    
};

/**
 * Récupère la liste de tous les groupes.
 *
 * @returns {Promise<object[]>} - Une promesse résolue avec la liste des groupes.
 * @throws {Error} - Une erreur si la récupération des groupes échoue.
*/
export const getAllGroup = async () => {
  try {
    const groups = await Group.find();
    return groups;
  } catch (error) {
    throw new Error('Erreur lors de la récupération des groupes');
  }
};

/**
 * Récupère les détails d'un groupe par son identifiant.
 *
 * @param {string} groupId - L'identifiant du groupe à récupérer.
 * @returns {Promise<object|null>} - Une promesse résolue avec les détails du groupe, ou null si le groupe n'est pas trouvé.
 * @throws {Error} - Une erreur si la récupération du groupe échoue.
*/
export const getGroupById = async (groupId) => {
  try {
    const group = await Group.findById(groupId).lean(); 
    return group;
  } catch (error) {
    throw new Error('Erreur lors de la récupération du groupe');
  }
};

/**
 * Récupère un groupe par son Nom.
 *
 * @param {string} name - L'identifiant du groupe à récupérer.
 * @returns {Promise<object|null>} - Une promesse résolue avec les détails du groupe, ou null si le groupe n'est pas trouvé.
 * @throws {Error} - Une erreur si la récupération du nom de groupe échoue.
*/
export const getGroupByName = async (name) => {
  try {
    const groupName = await Group.findOne({ name }).lean(); 
    return groupName;
  } catch (error) {
    throw new Error('Erreur lors de la récupération du nom de groupe');
  }
};

/**
 * Modifie les détails d'un groupe existant.
 *
 * @param {string} groupId - L'identifiant du groupe à modifier.
 * @param {object} updatedDetails - Les détails mis à jour du groupe.
 * @returns {Promise<object>} - Une promesse résolue avec les détails du groupe mis à jour.
 * @throws {Error} - Une erreur si la modification du groupe échoue.
*/
export const editGroup = async (groupId, updatedDetails) => {
  const {name, description} = updatedDetails
  try {
    const updatedGroup = await Group.findByIdAndUpdate(
      groupId,
      {name, description},
      { new: true, runValidators: true }
    );
    return updatedGroup;
  } catch (error) {
    throw new Error('Erreur lors de la modification du groupe');
  }
};

/**
 * Supprime un groupe par son identifiant.
 *
 * @param {string} groupId - L'identifiant du groupe à supprimer.
 * @returns {Promise<void>} - Une promesse résolue une fois que le groupe est supprimé.
 * @throws {Error} - Une erreur si la suppression du groupe échoue.
*/
export const deleteGroup = async (groupId) => {
  try {
    await Group.findByIdAndDelete(groupId);
  } catch (error) {
    throw new Error('Erreur lors de la suppression du groupe');
  }
};

/**
 * Ajoute des membres à un groupe.
 * @param {string} groupId - L'ID du groupe auquel ajouter les membres.
 * @param {Array.<string>} memberIds - Les IDs des membres à ajouter.
 * @returns {Promise} Une promesse qui se résout avec le groupe mis à jour après l'ajout des membres.
 * @throws {Error} Lance une erreur si une erreur se produit lors de l'ajout des membres au groupe.
*/
export const addMembersToGroup = async (groupId, memberIds) =>{
  try{
    //  Récupérer le groupe
    const group = await Group.findById(groupId);

    const validMemberIds = memberIds.filter(id => mongoose.Types.ObjectId.isValid(id));

    // Convertir les chaînes en objets ObjectId
    // const objectIdMemberIds = validMemberIds.map(id => mongoose.Types.ObjectId(id));

    // Ajouter les membres à la propriété "members" du groupe
    group.members.push(...validMemberIds)

    // Sauvegarder le groupe mis à jour
    const updatedGroup = await group.save();
    return updatedGroup;
  }catch (error) {
    throw new Error('Erreur lors de l\'ajout de membres au groupe');
  }
};