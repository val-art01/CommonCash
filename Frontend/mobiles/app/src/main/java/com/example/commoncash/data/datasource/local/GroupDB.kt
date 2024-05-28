package com.example.commoncash.data.datasource.local

import androidx.room.Database
import androidx.room.RoomDatabase


@Database(entities = [GroupEntity::class], version = 1)
abstract class GroupDB : RoomDatabase(){
    abstract fun GroupDao() : GroupDao
}