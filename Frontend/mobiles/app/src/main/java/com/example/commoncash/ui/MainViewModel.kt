package com.example.commoncash.ui

import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.commoncash.data.repository.GroupRepository
import com.example.cuisine.util.Result
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class MainViewModel @Inject constructor(
    private val group: GroupRepository
) : ViewModel() {

    val uiState = mutableStateOf(UiState())

    init {
        getAllGroup()
    }

    fun getAllGroup(){
        viewModelScope.launch {
            group.getAllGroup().collect{ressource->
                when (ressource){
                    is Result.Loading->{
                        uiState.value = uiState.value.copy(
                            isLoading = true,
                            error = null
                        )
                    }
                    is Result.Success->{
                        uiState.value = uiState.value.copy(
                            isLoading = false,
                            groups = ressource.data,
                            error = null
                        )
                    }
                    is Result.Error->{
                        uiState.value = uiState.value.copy(
                            isLoading = false,
                            groups = ressource.data,
                            error = ressource.message
                        )
                    }
                }
            }
        }
    }
}