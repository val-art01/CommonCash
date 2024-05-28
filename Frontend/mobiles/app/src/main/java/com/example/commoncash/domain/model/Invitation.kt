package com.example.commoncash.domain.model

data class Invitation(
    var groupId: Group,
    var senderId: User,
    val recipient:String,
    val status: String,
)
