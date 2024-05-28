package com.example.commoncash.data.datasource.remote

import com.example.commoncash.domain.model.Group
import com.example.commoncash.domain.model.User
import retrofit2.Call
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.PUT
import retrofit2.http.Path

interface GroupApi {
    /**
     * tags:
     *   name: Group
     *   description: API operations related to Goups
     */

    /**
     * /group/create:
     *   post:
     *     summary: Create a new group
     *     description: Create a new group with the provided details.
     *     tags:
     *       - Group
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           example:
     *             groupName: Example Group
     *           schema:
     *             type: object
     *             properties:
     *               groupName:
     *                 type: string
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
    @POST("group/create")
    suspend fun createGroup(@Body groupData: Group): Group

    /**
     * @swagger
     * /group/:
     *   get:
     *     summary: Get all groups
     *     description: Retrieve a list of all groups.
     *     tags:
     *       - Group
     *     responses:
     *       200:
     *         description: Successful response
     *         content:
     *           application/json:
     *             example:
     *               message: Successfully retrieved groups
     *               data:
     *                 group: {
     *                   _id: "group_id",
     *                   groupName: "Example Group",
     *                   description: "Example Group",
     *                   "members": [],
     *                   "admins": [],
     *                 }
     */
    @GET("group")
    suspend fun getAllGroups() : List<Group>


    /**
     * @swagger
     * /group/{id}:
     *   get:
     *     summary: Get a specific group
     *     description: Retrieve information about a specific group.
     *     tags:
     *       - Group
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID of the group to retrieve
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Successful response
     *         content:
     *           application/json:
     *             example:
     *               message: Successfully retrieved group
     *               data:
     *                 group: { ... }
     */
    @GET("inviteUsers/{id}")
    suspend fun getGroup(@Path("id") id: String) : Group

// route pour inviter un joueur dans un groupe
// router.put('/inviteUsers/:id', inviteUsers);

    //@PUT("group/{id}")
    //fun inviteUser(@Path("id") id: String,@Body body: User): Call<User>

    /**
     * @swagger
     * /group/add-members/{id}:
     *   put:
     *     summary: Add members to a group
     *     description: Add members to a specific group.
     *     tags:
     *       - Group
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID of the group to update
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           example:
     *             members: ["user1_id", "user2_id"]
     *     responses:
     *       200:
     *         description: Members added to the group successfully
     *         content:
     *           application/json:
     *             example:
     *               message: Members added to the group successfully
     *               data:
     *                 group: { ... }
     */
    @PUT("group/ad-members/{id}")
    suspend fun addMembers(@Path("id") id: String,@Body usersId: List<String>): Group

    /**
     * @swagger
     * /group/{id}:
     *   put:
     *     summary: Update group information
     *     description: Update the information of a specific group.
     *     tags:
     *       - Group
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID of the group to update
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           example:
     *             groupName: Updated Group Name
     *           schema:
     *             type: object
     *             properties:
     *               groupName:
     *                 type: string
     *     responses:
     *       200:
     *         description: Group information updated successfully
     *         content:
     *           application/json:
     *             example:
     *               message: Group information updated successfully
     *               data:
     *                 group: { ... }
     */
    @PUT("group/{id}")
    suspend fun updateGroup(@Path("id") id: String,@Body body: Group): Group

    /**
     * @swagger
     * /group/{id}:
     *   delete:
     *     summary: Delete group
     *     description: Delete a specific group.
     *     tags:
     *       - Group
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID of the group to delete
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Group deleted successfully
     *         content:
     *           application/json:
     *             example:
     *               message: Group deleted successfully
     */
    @DELETE("group/{id}")
    suspend fun deleteGroup(@Path("id") id: String): String

    /**
     * @swagger
     * components:
     *   schemas:
     *     Group:
     *       type: object
     *       properties:
     *         name:
     *           type: string
     *         description:
     *           type: string
     *         members:
     *           type: array
     *           items:
     *             type: string
     *           description: Array of User IDs representing members
     *         admins:
     *           type: array
     *           items:
     *             type: string
     *           description: Array of User IDs representing admins (required)
     *       required:
     *         - name
     *         - admins
     */
}