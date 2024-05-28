package com.example.commoncash.data.interceptor

import okhttp3.Interceptor
import okhttp3.Response
import javax.inject.Inject

class CommonCashInterceptor @Inject constructor() : Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {
        val request = chain.request()
            .newBuilder()
            .header("Authorization", "Basic Z3JlOFY0dHBLTXpBVjg6YiRwSEtAVFlWS1g0bzc=")
            .build()
        return chain.proceed(request)
    }
}