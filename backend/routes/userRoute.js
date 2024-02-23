import express from 'express';
import {register, getAllUsers, getUserById, updateUser, deleteUser} from '../src/controllers/userController.js';
import {validateRegister, validateUpdate} from '../src/middlewares/checkFieldsMiddleware.js';
import {authentification} from "../src/middlewares/authMiddleware.js"

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API operations related to users
 */

const router = express.Router()

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Successfully retrieved users
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
router.get('/', getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a specific user
 *     description: Retrieve information about a specific user.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Successfully retrieved user
 *               data:
 *                 user: { 
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
 *                 }
 */
router.get('/:id', authentification, getUserById);

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with the provided details.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: john
 *             email: john@example.com
 *             password: example_password
 *             confirmPassword: example_password
 *           schema:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             example:
 *               message: User registered successfully
 *               data:
 *                 user: {                      
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
 *                 }
 */
router.post('/register', validateRegister, register);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user information
 *     description: Update the information of a specific user.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             updatedField: updatedValue
 *     responses:
 *       200:
 *         description: User information updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: User information updated successfully
 *               data:
 *                 user: {
 *                   _id: "generatedId",
 *                   name: "example_user",
 *                   email: "example_user@example.com",
 *                   password: "hashed_password",
 *                   accountId: "account_id",
 *                   provider: "standard",
 *                   iv: "initialization_vector",
 *                   authTokens: [
 *                     { authToken: "auth_token_1" },
 *                     { authToken: "auth_token_2" }
 *                   ],
 *                   invitations: []
 *                 }
 */
router.put('/:id', authentification, updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete user
 *     description: Delete a specific user.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: User deleted successfully
 *               
 */
router.delete('/:id', authentification, deleteUser);


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         accountId:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         provider:
 *           type: string
 *         iv:
 *           type: string
 *         authTokens:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               authToken:
 *                 type: string
 *         invitations:
 *           type: array
 *           items:
 *             type: string
 *       required:
 *         - name
 *         - email
 *         - password
 *         - iv
 *         - authTokens
 */

export default router