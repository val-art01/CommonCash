package com.example.commoncash.data.datasource.remote

import com.example.commoncash.domain.model.Refund
import com.example.commoncash.domain.model.User
import okhttp3.ResponseBody
import retrofit2.Response
import retrofit2.http.GET
import retrofit2.http.Path

interface RefundApi {


    /**

     * tags:
     *   name: BalanceRepayment
     *   description: API operations related to Balance and Repayment
     */
    /**
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
    @GET("balances/{id}")
    suspend fun getBalance(@Path("id") id: String) : Response<ResponseBody>

    /**
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
    @GET("repayment/{id}")
    suspend fun getRepay(@Path("id") id: String) : Response<Refund>

    /**
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
}