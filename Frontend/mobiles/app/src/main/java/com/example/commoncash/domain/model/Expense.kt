package com.example.commoncash.domain.model

import java.util.Date

data class Expense(
    var title: String,
    var amount: Int,
    // var receipts:String,
    var category: String,
    var payingMember: User,
    var groupId: Group? = null,
    var membersInvolveds: List<Pair<User, Int>>? = null,
    var date: Date

)
