package com.example.commoncash.data.repository

import com.example.commoncash.data.datasource.remote.ExpenseApi
import com.example.commoncash.domain.model.Expense
import com.example.cuisine.util.Result
import kotlinx.coroutines.flow.catch
import kotlinx.coroutines.flow.flow
import javax.inject.Inject

class ExpenseRepository @Inject constructor(private val api: ExpenseApi){

    fun getExpense(id :String) = flow {
        emit(Result.Loading())
        val expense= api.getExpense(id).body()
        emit(Result.Success(expense))
    }.catch { cause->
        emit(Result.Error(null, cause.message!!))
    }

    fun getExpenseDetails(id :String) = flow {
        emit(Result.Loading())
        val expense= api.getExpenseDetails(id).body()
        emit(Result.Success(expense))
    }.catch { cause->
        emit(Result.Error(null, cause.message!!))
    }

    fun addExpense(expense: Expense) = flow {
        emit(Result.Loading())
        val expense = api.addExpense(expense)
        emit(Result.Success(expense))
    }.catch { cause->
        emit(Result.Error(null, cause.message!!))
    }

}