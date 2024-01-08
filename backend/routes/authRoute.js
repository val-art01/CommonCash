import express from 'express';
import {login} from '../src/controllers/auth/authController.js';
import {logout, logoutAll} from '../src/controllers/logoutController.js';
import {passport} from '../src/controllers/auth/authGoogleController.js';
import {passportFace} from '../src/controllers/auth/authFaceboockController.js';
import {authentification} from "../src/middlewares/authMiddleware.js";

const router = express.Router()

router.post('/login', login);
router.post('/logout',authentification, logout);
router.post('/logout/all', authentification, logoutAll);

router.get('/success', (req, res) => res.send(req.user));
router.get('/error', (req, res) => res.send("error logging in"));

// route Google
router.get('/', (req, res) =>{
    res.send(`<a href = "/auth/google">Authenticate with Google</a> <br/> <a href = "/auth/facebook">Authenticate with Facebook</a>`)
})

router.get('/auth/google', passport.authenticate('google', {scope: ['email', 'profile']}));

router.get('/google/callback',
    passport.authenticate(
        'google',
        {
            successRedirect: '/success',
            failureRedirect: '/error'
        }
    )        
)

// route Facebook
router.get("/auth/facebook", passportFace.authenticate("facebook", {scope: 'email'}));

router.get("/facebook/callback", passportFace.authenticate(
        "facebook", 
        {successRedirect: "/success", failureRedirect: "/error" }
    )
);

export default router