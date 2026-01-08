import { baseapi } from "../baseApi";

export const authapi = baseapi.injectEndpoints({
    endpoints:(builder)=>({
        loginUser:builder.mutation({
            query:(credentials)=>({
                url:'/login',
                method:'POST',
                body:credentials,
            })
        }),
        RefreshToken:builder.query({
            query:()=>({
                url:'/refresh-token',
            })
        }),
        LogoutUser:builder.mutation({
            query:()=>({
                url:'/logout',
                method:'POST',
            })
        }),
        getMyInfo:builder.query({
            query:()=>({
                url:'/me',
            })
        })
    



     })
})

export const {useLoginUserMutation,useLogoutUserMutation,useRefreshTokenQuery,useGetMyInfoQuery} = authapi;