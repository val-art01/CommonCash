import express from 'express';
import {login, logoutOne, logoutAll} from '../src/controllers/auth/authController.js';
import {isLoggedIn, passport} from '../src/controllers/auth/authGoogleController.js';
import {authentification} from "../src/middlewares/authMiddleware.js"

const router = express.Router()

router.post('/login', login);

router.post('/logout', authentification, logoutOne);
router.post('/logout/all',authentification, logoutAll);

// route Google
router.get('/', (req, res) =>{
    res.send('<a href = "/auth/google">Authenticate with Google</a>')
})

router.get('/auth/google', 
    passport.authenticate(
        'google',
        {scope: ['email', 'profile']}
    )
);

router.get('/google/callback',
    passport.authenticate(
        'google',
        {
            successRedirect: '/success',
            failureRedirect: '/error'
        }
    )        
)

router.get('/success', isLoggedIn, (req, res) => res.send(req.user));

router.get('/error', (req, res) => res.send("error logging in"));



export default router