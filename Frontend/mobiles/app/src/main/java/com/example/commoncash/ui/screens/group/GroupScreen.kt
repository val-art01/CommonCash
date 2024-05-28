package com.example.commoncash.ui.screens.group

import android.annotation.SuppressLint
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Snackbar
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.AnnotatedString
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.example.commoncash.domain.model.Expense
import com.example.commoncash.domain.model.Group
import com.example.cuisine.util.Result

@SuppressLint("UnusedMaterial3ScaffoldPaddingParameter")
@Composable
fun GroupPage(
    groupScreenState: GroupScreenState,
    navController: NavController
) {
    when (groupScreenState) {
        GroupScreenState.EditableGroup -> {
            GroupDetailsEditableScreen()
        }

        is GroupScreenState.GroupDetails -> {

            when (val groupRes = groupScreenState.groupDetails) {
                is Result.Error -> Snackbar {
                    Text(text = groupRes.message.toString())
                }

                is Result.Loading -> {
                    Box(modifier = Modifier.fillMaxSize()) {
                        CircularProgressIndicator()
                    }
                }

                is Result.Success -> {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Text(
                            text = groupRes.data?.name ?: "",
                            fontSize = 24.sp,
                            style = MaterialTheme.typography.headlineSmall
                        )
                        Spacer(modifier = Modifier.height(8.dp))
                        Text(
                            text = groupRes.data?.description ?: "",
                            fontSize = 16.sp,
                            style = MaterialTheme.typography.bodySmall
                        )
                        Spacer(modifier = Modifier.height(16.dp))

                        Text(
                            text = "Membres du groupe",
                            fontSize = 20.sp,
                            style = MaterialTheme.typography.labelLarge
                        )
                        Spacer(modifier = Modifier.height(8.dp))
                        LazyColumn {
                            items(groupRes.data?.members!!) { member ->
                                Text(
                                    text = member.name,
                                    fontSize = 16.sp,
                                    style = MaterialTheme.typography.bodySmall
                                )
                                Spacer(modifier = Modifier.height(4.dp))
                            }
                        }

                        Spacer(modifier = Modifier.height(16.dp))

                        Text(
                            text = "Dépenses du groupe",
                            fontSize = 20.sp,
                            style = MaterialTheme.typography.labelMedium
                        )
                        Spacer(modifier = Modifier.height(8.dp))
                        LazyColumn {
                            items(groupRes.data?.expenses!!) { expense ->
                                ExpenseItem(expense = expense, onItemClick = {
                                    navController.navigate("expense_details/$expense")
                                })
                            }
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun GroupDetailsEditableScreen(
) {
    var groupName by remember {
        mutableStateOf("")
    }
    var groupDescription by remember {
        mutableStateOf("")
    }

    Column(modifier = Modifier.padding(16.dp)) {
        OutlinedTextField(
            value = groupName,
            onValueChange = { groupName = it },
            label = { Text("Nom du Groupe") }
        )
        Spacer(modifier = Modifier.height(8.dp))
        OutlinedTextField(
            value = groupDescription,
            onValueChange = { groupDescription = it },
            label = { Text("Description du Groupe") }
        )
        Spacer(modifier = Modifier.height(16.dp))

        Spacer(modifier = Modifier.height(8.dp))

        Button(onClick = {
            // viewModel.addExpense("New Expense", 0.0)
        }) {
            Text("Créer le groupe")
        }
    }
}

@Composable
fun ExpenseItem(expense: Expense, onItemClick: () -> Unit) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 8.dp)
            .clickable(onClick = onItemClick)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Text(
                text = AnnotatedString(expense.title),
                style = MaterialTheme.typography.bodySmall
            )
            Text(
                text = AnnotatedString(expense.amount.toString() + "€"),
                style = MaterialTheme.typography.bodySmall
            )
        }
    }
}