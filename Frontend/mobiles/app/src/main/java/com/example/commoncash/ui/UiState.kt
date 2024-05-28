package com.example.commoncash.ui


import com.example.commoncash.domain.model.Expense
import com.example.commoncash.domain.model.Group
import com.example.cuisine.ui.navigation.Screens

data class UiState(
    val screen: Screens = Screens.HomeScreen,
    val isLoading : Boolean = false,
    val groups : List<Group>? = null,
    val actualGroup: Group? = null,
    val search : String? = null,
    val error : String? = null
)
