package com.example.commoncash.data.repository

import com.example.commoncash.data.datasource.local.GroupDao
import com.example.commoncash.data.datasource.remote.GroupApi
import com.example.commoncash.domain.model.Expense
import com.example.commoncash.domain.model.Group
import com.example.commoncash.domain.model.User
import com.example.cuisine.util.Result
import kotlinx.coroutines.flow.catch
import kotlinx.coroutines.flow.flow
import java.util.Date
import java.util.Random
import javax.inject.Inject

class GroupRepository @Inject constructor(
    private val api: GroupApi,
    private val dao: GroupDao
) {
    private val groupNameList = listOf(
        "Road Trip Ibiza",
        "Vacances entre Copains",
        "Colocation",
        "Mariage de Magalie",
        "Vacances en Suisse",
        "Espagne",
        "Vacances Allemagne",
        "Lune de Miel",
    )

    private val expenseList = listOf(
        "Kebab",
        "Course debut de voyage",
        "Loyer",
        "Réparation du lustre",
        "Transport",
        "Repas de Noêl",
        "Dinner",
        "Essence",
    )

    private val memeberNameList = listOf(
        "Rodrigue",
        "Corentin",
        "Salomé",
        "Paul",
        "Camille",
        "Nicolas",
        "Alexandre",
        "Peter",
    )
    private val users = List(6) {
        User(
            it.toString(),
            memeberNameList.get(it),
            "$it@gmail.com",
            "password$it",
            "provider$it",
            "iv$it",
            "authtokens$it"
        )
    }
    private val expenses = List(5) {
        Expense(expenseList.get(it), it, "", users.random(), null, null, Date())
    }
    private val mockGroups = List(6) {
        Group(
            it.toString(),
            groupNameList.get(it),
            "Description $it",
            users.shuffled().take(4),
            expenses = expenses.shuffled()
        )
    }

    fun getGroup(id: String) = flow {
        emit(Result.Loading())
        //val expense = api.getGroup(id)
        val group = mockGroups.get(id.toInt())
        emit(Result.Success(group))
    }.catch { cause ->
        emit(Result.Error(null, cause.message!!))
    }

    fun getAllGroup() = flow {
        emit(Result.Loading())
        emit(Result.Success(mockGroups))
    }.catch { cause ->
        emit(Result.Error(null, cause.message!!))
    }

    fun createGroup(group: Group) = flow {
        emit(Result.Loading())
        val createGroup = api.createGroup(group)
        emit(Result.Success(createGroup))
    }.catch { cause ->
        emit(Result.Error(null, cause.message!!))
    }

    fun addMembers(id: String, usersId: List<String>) = flow {
        emit(Result.Loading())
        val group = api.addMembers(id, usersId)
        emit(Result.Success(group))
    }.catch { cause ->
        emit(Result.Error(null, cause.message!!))
    }

    fun updateGroup(id: String, group: Group) = flow {
        emit(Result.Loading())
        val group = api.updateGroup(id, group)
        emit(Result.Success(group))
    }.catch { cause ->
        emit(Result.Error(null, cause.message!!))
    }

    fun deleteGroup(id: String) = flow {
        emit(Result.Loading())
        val message = api.deleteGroup(id)
        emit(Result.Success(message))
    }.catch { cause ->
        emit(Result.Error(null, cause.message!!))
    }


}