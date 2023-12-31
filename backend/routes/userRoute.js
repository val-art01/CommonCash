import express from 'express';
import {register} from './../src/controllres/userController.js'
import {validateRegistration} from './../src/middlewares/insciptionMiddleware.js'

// Route d'inscription avec le middleware de validation
router.post('/register', validateRegistration, register);

export default router