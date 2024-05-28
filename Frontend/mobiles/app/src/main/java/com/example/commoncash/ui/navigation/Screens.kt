package com.example.cuisine.ui.navigation

sealed class Screens(val iteneraire: String) {
    object HomeScreen : Screens("home")
    object GroupScreen : Screens("group/{groupId}")

}