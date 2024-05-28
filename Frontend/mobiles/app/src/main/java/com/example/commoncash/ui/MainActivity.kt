package com.example.commoncash.ui

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Snackbar
import androidx.compose.material3.Text
import androidx.compose.runtime.collectAsState
import androidx.compose.ui.Modifier
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import com.example.commoncash.ui.screens.group.GroupPage
import com.example.commoncash.ui.screens.HomeScreen
import com.example.commoncash.ui.screens.group.GroupScreenState
import com.example.commoncash.ui.screens.group.GroupViewModel
import com.example.commoncash.ui.theme.CommonCashTheme
import com.example.cuisine.ui.navigation.Screens
import com.example.cuisine.util.Result
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            CommonCashTheme {
                val viewModel: MainViewModel = hiltViewModel()

                val navController = rememberNavController()

                NavHost(
                    navController = navController,
                    startDestination = Screens.HomeScreen.iteneraire
                ) {
                    composable(route = Screens.HomeScreen.iteneraire) {
                        HomeScreen(
                            uiState = viewModel.uiState.value,
                            onCreateGroup = {
                                navController.navigate("group/-1")
                            },
                            navController = navController
                        )
                    }
                    composable(
                        route = Screens.GroupScreen.iteneraire,
                        arguments = listOf(navArgument("groupId") {
                            type = NavType.StringType
                            nullable = true
                        })
                    ) {
                        val groupViewModel: GroupViewModel = hiltViewModel()
                        val groupRes = groupViewModel.state.collectAsState().value
                        GroupPage(
                            groupScreenState = groupRes,
                            navController = navController
                        )

                    }
                }

            }
        }
    }
}

