import express from 'express';
import {getBalances} from '../src/controllers/balanceController.js'
import {getRepayments} from '../src/controllers/RepaymentController.js';

/**
 * @swagger
 * tags:
 *   name: BalanceRepayment
 *   description: API operations related to Balance and Repayment
*/
const router = express.Router();

/**
 * @swagger
 * /balanRepay/balances/{groupId}:
 *   get:
 *     summary: Get individual balances for a group
 *     description: Retrieve individual balances for members of a specific group.
 *     tags:
 *       - BalanceRepayment
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         description: ID of the group to retrieve balances for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Individual balances retrieved successfully
 *               balances: { ... }
*/
router.get('/balances/:groupId', getBalances);

/**
 * @swagger
 * /balanRepay/repayments/{groupId}:
 *   get:
 *     summary: Get repayment list for a group
 *     description: Retrieve a list of repayments needed for members of a specific group.
 *     tags:
 *       - BalanceRepayment
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         description: ID of the group to retrieve repayment list for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Repayment list retrieved successfully
 *               repayments:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Refund'
*/
router.get('/repayments/:groupId', getRepayments);

/**
 * @swagger
 * components:
 *   schemas:
 *     Refund:
 *       type: object
 *       properties:
 *         groupId:
 *           type: string
 *           description: ID of the group associated with the refund
 *         debtorId:
 *           type: string
 *           description: ID of the debtor user
 *         creditorId:
 *           type: string
 *           description: ID of the creditor user
 *         amount:
 *           type: number
 *           default: 0
 *           description: Amount of the refund
 *       required:
 *         - groupId
 *         - debtorId
 *         - creditorId
*/
export default router;