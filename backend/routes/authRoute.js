import express from 'express';
import {login} from '../src/controllers/auth/authController.js';
import {logout, logoutAll} from '../src/controllers/logoutController.js';
import {passport} from '../src/controllers/auth/authGoogleController.js';
import {passportFace} from '../src/controllers/auth/authFaceboockController.js';
import {authentification} from "../src/middlewares/authMiddleware.js";

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API operations relating to users connection
 */

const router = express.Router()

/**
 * @swagger
 * /auht/login:
 *   post:
 *     summary: User login
 *     description: Log in a user with provided credentials.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             email: example_user@example.com
 *             password: example_password
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             example:
 *               message: User logged in successfully
 *               data:
 *                  user: {
 *                      _id: "generatedId",
 *                      name: "example_user",
 *                      email: "example_user@example.com",
 *                      password: "hashed_password",
 *                      accountId: "account_id",
 *                      provider: "standard",
 *                      iv: "initialization_vector",
 *                      authTokens: [
 *                          { authToken: "auth_token_1" },
 *                          { authToken: "auth_token_2" }
 *                      ],
 *                      invitations: []
 *                  }
 */
router.post('/login', login);

/**
 * @swagger
 * /auht/logout:
 *   post:
 *     summary: User logout
 *     description: Log out the currently authenticated user.
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: User logged out successfully
 *         content:
 *           application/json:
 *             example:
 *               message: User logged out successfully
 */
router.post('/logout',authentification, logout);

/**
 * @swagger
 * /auht/logout/all:
 *   post:
 *     summary: User logout from all devices
 *     description: Log out the user from all devices by invalidating all auth tokens.
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: User logged out from all devices successfully
 *         content:
 *           application/json:
 *             example:
 *               message: User logged out from all devices successfully
 */
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