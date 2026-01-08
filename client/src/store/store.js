import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authslice";
import globalReducer from './slice/globalSlice'
import { api } from "./slice/apiSlice";

export const store = configureStore({
    reducer:{
        auth:authReducer,
        global:globalReducer,
        [api.reducerPath]:api.reducer
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(api.middleware)
})
