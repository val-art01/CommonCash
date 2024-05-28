package com.example.commoncash.domain.model

data class User(
    var accountId: String,
    var name: String,
    var email: String,
    var password: String,
    var provider: String,
    var iv: String,
    var authTokens: String,
    var invitations: Invitation? = null
)
