package com.example.commoncash.data.repository


import com.example.commoncash.data.datasource.remote.UserApi
import com.example.commoncash.domain.model.User
import com.example.cuisine.util.Result
import kotlinx.coroutines.flow.catch
import kotlinx.coroutines.flow.flow
import javax.inject.Inject

class UserRepository @Inject constructor(private val api: UserApi){

    fun getUser(id :String) = flow {
        emit(Result.Loading())
        val expense= api.getUser(id).body()
        emit(Result.Success(expense))
    }.catch { cause->
        emit(Result.Error(null, cause.message!!))
    }

    fun getAllUser() = flow {
        emit(Result.Loading())
        val expense= api.getAllUsers().body()
        emit(Result.Success(expense))
    }.catch { cause->
        emit(Result.Error(null, cause.message!!))
    }

    fun addUser(user: User) = flow {
        emit(Result.Loading())
        val addedUser= api.addUser(user)
        emit(Result.Success(addedUser))
    }.catch { cause->
        emit(Result.Error(null, cause.message!!))
    }

    fun updateUser(id: String,user: User) = flow {
        emit(Result.Loading())
        val updatedUser= api.updateUser(id,user)
        emit(Result.Success(updatedUser))
    }.catch { cause->
        emit(Result.Error(null, cause.message!!))
    }

    fun deleteUser(id: String) = flow {
        emit(Result.Loading())
        val message= api.deleteUser(id)
        emit(Result.Success(message))
    }.catch { cause->
        emit(Result.Error(null, cause.message!!))
    }
}