package com.example.commoncash.domain.model

data class Refund(
    var groupId: Group,
    val debtorId: User,
    var creditorId: User,
    var amount:Int,
    // var reason:String,
    // var status: String,
)
