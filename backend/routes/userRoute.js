import express from 'express';
import {register} from '../src/controllers/userController.js'
import {validateRegistration} from '../src/middlewares/registerMiddleware.js'

const router = express.Router()

// Route d'inscription avec le middleware de validation
router.post('/register', validateRegistration, register);

export default router