package com.example.commoncash.data.datasource.remote

import com.example.commoncash.domain.model.Expense
import com.example.commoncash.domain.model.User
import retrofit2.Call
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Path

interface ExpenseApi {
    /**
     * tags:
     *   name: Expense
     *   description: API operations related to expense
     */
    /**
     * @swagger
     * /spend/create:
     *   post:
     *     summary: Create a new expense
     *     description: Create a new expense with the provided details.
     *     tags:
     *       - Expense
     *     requestBody:
     *       required: true
     *       content:
     *         multipart/form-data:
     *           schema:
     *             $ref: '#/components/schemas/ExpenseInput'
     *     responses:
     *       201:
     *         description: Expense created successfully
     *         content:
     *           application/json:
     *             example:
     *               message: Expense created successfully
     *               data:
     *                 spend: { ... }
     */
    @POST("spend/create")
    suspend fun addExpense(@Body expenseData: Expense): Expense

    /**
     * @swagger
     * /spend/list/{groupId}:
     *   get:
     *     summary: Get a list of expenses for a group
     *     description: Retrieve a list of expenses for a specific group.
     *     tags:
     *       - Expense
     *     parameters:
     *       - in: path
     *         name: groupId
     *         required: true
     *         description: ID of the group to retrieve expenses for
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Successful response
     *         content:
     *           application/json:
     *             example:
     *               message: Successfully retrieved expenses
     *               data:
     *                 expenses: [{ ... }]
     */
    @GET("spend/list/{id}")
    suspend fun getExpense(@Path("id") id: String) : Response<List<Expense>>

    /**
     * @swagger
     * /spend/details/{id}:
     *   get:
     *     summary: Get details of a specific expense
     *     description: Retrieve details of a specific expense.
     *     tags:
     *       - Expense
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID of the expense to retrieve details for
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Successful response
     *         content:
     *           application/json:
     *             example:
     *               message: Successfully retrieved expense details
     *               data:
     *                 expense: { ... }
     */

    @GET("spend/details/{id}")
    suspend fun getExpenseDetails(@Path("id") id: String) : Response<Expense>

    /**
     * @swagger
     * /spend/search:
     *   post:
     *     summary: Search for expenses
     *     description: Search for expenses based on specified criteria.
     *     tags:
     *       - Expense
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           example:
     *             criteria: { ... }
     *           schema:
     *             $ref: '#/components/schemas/SearchCriteria'
     *     responses:
     *       200:
     *         description: Successful response
     *         content:
     *           application/json:
     *             example:
     *               message: Expenses found successfully
     *               data:
     *                 expenses: [{ ... }]
     */
   // router.post('/search', authentificationWithoutId, searchReceipts);

// router.get('/sort', authentificationWithoutId, sortExpenses);

    /**
     * @swagger
     * components:
     *   schemas:
     *     Expense:
     *       type: object
     *       properties:
     *         title:
     *           type: string
     *         amount:
     *           type: number
     *         category:
     *           type: string
     *         payingMember:
     *           type: string
     *           description: User ID of the member who paid the expense
     *         groupId:
     *           type: string
     *           description: Group ID to which the expense belongs
     *         membersInvolveds:
     *           type: array
     *           items:
     *             type: object
     *             properties:
     *               member:
     *                 type: string
     *                 description: User ID of a member involved in the expense
     *               ponderation:
     *                 type: number
     *                 default: 1
     *
     *           description: Array of members involved in the expense with their contributions
     *         date:
     *           type: string
     *           format: date-time
     *           description: Date and time when the expense was created
     *       required:
     *         - title
     *         - amount
     *         - category
     *         - payingMember
     *         - groupId
     *         - membersInvolveds
     */
}