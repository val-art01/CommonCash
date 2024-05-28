package com.example.commoncash.data.datasource.remote

import com.example.commoncash.domain.model.Expense
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.POST

interface AuthApi {
    @POST("auth/")
    suspend fun login(@Body expenseData: Expense): String
}