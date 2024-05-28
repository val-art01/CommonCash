package com.example.commoncash.ui.screens.group

import androidx.lifecycle.SavedStateHandle
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.commoncash.data.repository.GroupRepository
import com.example.commoncash.domain.model.Group
import com.example.cuisine.util.Result
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class GroupViewModel @Inject constructor(
    private val groupRepository: GroupRepository,
    savedStateHandle: SavedStateHandle
) : ViewModel() {
    private val _state: MutableStateFlow<GroupScreenState> =
        MutableStateFlow(GroupScreenState.GroupDetails(Result.Loading()))
    val state = _state.asStateFlow()

    init {
        savedStateHandle.get<String>("groupId")?.let { groupId ->
            if (groupId != "-1") {
                fetchGroup(groupId)
            } else {
                _state.update {
                    GroupScreenState.EditableGroup
                }
            }
        }
    }

    private fun fetchGroup(groupId: String) {
        viewModelScope.launch {
            groupRepository.getGroup(groupId).collect { res ->
                _state.update {
                    GroupScreenState.GroupDetails(res)
                }
            }
        }
    }
}

sealed class GroupScreenState {
    data class GroupDetails(
        val groupDetails: Result<Group>
    ) : GroupScreenState()

    object EditableGroup : GroupScreenState()
}