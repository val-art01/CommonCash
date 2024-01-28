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

export const addMembersToGroup = async (memberIds) =>{
    try{
        group.members.push(...memberIds)

        const updatedGroup = await group.save();

        return updatedGroup;
    }catch (error) {
        throw new Error('Erreur lors de l\'ajout de membres au groupe');
    }
};