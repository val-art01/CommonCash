package com.example.commoncash.data.datasource.local

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
@Dao
interface GroupDao {
    @Insert(onConflict = OnConflictStrategy.IGNORE)
    suspend fun addGroup(groupEntity: GroupEntity)

    @Query("SELECT * FROM group_entity ORDER BY RANDOM() LIMIT 1")
    fun getGroup() : GroupEntity
}