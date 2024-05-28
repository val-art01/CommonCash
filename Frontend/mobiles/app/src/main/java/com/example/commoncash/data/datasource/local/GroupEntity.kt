package com.example.commoncash.data.datasource.local

import androidx.room.Entity
import androidx.room.PrimaryKey
import com.example.commoncash.domain.model.Group
import com.example.commoncash.domain.model.User

@Entity(tableName = "group_entity")
class GroupEntity(
    @PrimaryKey
    val id : String,
    var name:String,
    var description: String,
)
