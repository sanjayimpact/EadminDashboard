import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authslice";
import globalReducer from './slice/globalSlice'
import { baseapi } from "./slice/baseApi";

export const store = configureStore({
    reducer:{
        auth:authReducer,
        global:globalReducer,
        [baseapi.reducerPath]:baseapi.reducer
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(baseapi.middleware)
})
