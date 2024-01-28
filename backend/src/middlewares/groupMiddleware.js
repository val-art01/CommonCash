import {getGroupById} from './../services/groupService.js';


/**
 * Middleware pour vérifier si le nom du groupe est renseigné dans le corps de la requête.
 *
 * @param {Object} req - L'objet de la requête Express.
 * @param {Object} res - L'objet de la réponse Express.
 * @param {function} next - La fonction pour passer au middleware suivant.
 * @returns {void}
 */
const validateGroupName = (req, res, next) => {
  const { name } = req.body;
  
  if (!name || name.trim() === '') {
     return res.status(400).json({ error: 'Le nom du groupe est requis.' });
  }
  
   next();
};

/**
 * Middleware pour vérifier si la description du groupe est renseigné dans le corps de la requête.
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
 * Middleware pour vérifier si le nom du groupe est renseigné dans le corps de la requête.
 *
 * @param {Object} req - L'objet de la requête Express.
 * @param {Object} res - L'objet de la réponse Express.
 * @param {function} next - La fonction pour passer au middleware suivant.
 * @returns {void}
 */
const existGroup = async (req, res, next) => {
  const { id } = req.params
  const { newMembers } = req.body

  const group = await getGroupById(id);

  if (!group) {
    return res.status(404).json({ error: 'Le groupe n\existe pas.' });
  }

   next();
};


  
export {validateGroupName, validateGroupChamps, existGroup};
  