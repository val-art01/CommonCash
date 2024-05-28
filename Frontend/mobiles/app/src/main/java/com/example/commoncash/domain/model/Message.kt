package com.example.commoncash.domain.model

data class Message(
    var groupId: Group,
    var authorId:User,
    var content: String,
)
