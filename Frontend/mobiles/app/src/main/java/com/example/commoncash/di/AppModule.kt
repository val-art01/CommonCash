package com.example.cuisine.di

import android.content.Context
import androidx.room.Room
import com.example.commoncash.data.datasource.local.GroupDB
import com.example.commoncash.data.datasource.local.GroupDao
import com.example.commoncash.data.datasource.remote.ExpenseApi
import com.example.commoncash.data.datasource.remote.GroupApi
import com.example.commoncash.data.datasource.remote.RefundApi
import com.example.commoncash.data.datasource.remote.UserApi
import com.example.commoncash.data.interceptor.CommonCashInterceptor
import com.squareup.moshi.Moshi
import com.squareup.moshi.kotlin.reflect.KotlinJsonAdapterFactory
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.moshi.MoshiConverterFactory
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object AppModule {
    @Singleton
    @Provides
    fun providesRetrofit(moshi: Moshi): Retrofit {
        return Retrofit
            .Builder()
            .baseUrl("https://apicomoncash")
            .addConverterFactory(MoshiConverterFactory.create(moshi))
            .build()
    }

    @Singleton
    @Provides
    fun provideMoshi() = Moshi.Builder()
        .add(KotlinJsonAdapterFactory())
        .build()

    /**
     * Add interceptor and authenticator in client
     */
    @Singleton
    @Provides
    fun provideOkHttp(
        commonCashInterceptor: CommonCashInterceptor
    ) = OkHttpClient.Builder()
        .addInterceptor(commonCashInterceptor)
        .build()


    @Singleton
    @Provides
    fun providesExpenseApi(retrofit: Retrofit): ExpenseApi {
        return retrofit.create(ExpenseApi::class.java)
    }

    @Singleton
    @Provides
    fun providesGroupApi(retrofit: Retrofit): GroupApi {
        return retrofit.create(GroupApi::class.java)
    }

    @Singleton
    @Provides
    fun providesRefundApi(retrofit: Retrofit): RefundApi {
        return retrofit.create(RefundApi::class.java)
    }

    @Singleton
    @Provides
    fun providesUserApi(retrofit: Retrofit): UserApi {
        return retrofit.create(UserApi::class.java)
    }

    @Provides
    @Singleton
    fun provideAppDatabase(@ApplicationContext appContext: Context): GroupDB {
        return Room.databaseBuilder(
            appContext,
            GroupDB::class.java,
            "room_database"
        ).build()
    }

    @Provides
    @Singleton
    fun provideDao(groupDB: GroupDB): GroupDao {
        return groupDB.GroupDao()
    }
}