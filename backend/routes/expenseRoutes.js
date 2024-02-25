import express from 'express';
import {createExpense} from './../src/controllers/expenseController.js';
import { authentificationWithoutId } from '../src/middlewares/authMiddleware.js';
import {validateAmountDesc} from './../src/middlewares/expenseMiddleware.js';
import {existGroup} from '../src/middlewares/groupMiddleware.js';

/**
 * @swagger
 * tags:
 *   name: Expense
 *   description: API operations related to expense
*/

const router = express.Router();

/**
 * @swagger
 * /expense/create:
 *   post:
 *     summary: Create a new expense
 *     description: Create a new expense with the provided details.
 *     tags:
 *       - Expense
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             expense: Example Expense
 *           schema:
 *             type: object
 *             
 *     responses:
 *       201:
 *         description: Group created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Group created successfully
 *               data:
 *                 group: {
 *                   _id: "group_id",
 *                   groupName: "Example Group",
 *                   description: "Example Group",
 *                   "members": [],
 *                   "admins": [],
 *                 }
*/

router.post('/create', authentificationWithoutId, existGroup, validateAmountDesc, createExpense);


/**
 * @swagger
 * components:
 *   schemas:
 *     Expense:
 *       type: object
 *       properties:
 *         groupId:
 *           type: object
 *         authorId:
 *           type: object
 *         amount:
 *           type: Number
 *         description:
 *           type: string
 *       required:
 *         - groupId
 *         - authorId
 *         - amount
*/
export default router