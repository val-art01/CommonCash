package com.example.commoncash.domain.model

data class Group(
    val id : String,
    var name:String,
    var description: String,
    var members:List<User>,
    var admins  : User? = null,
    val expenses : List<Expense> = emptyList(),
)