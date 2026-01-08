import {createApi ,fetchBaseQuery} from '@reduxjs/toolkit/query/react';




export const api = createApi({
    reducerPath:'api',

    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:3001/api',credentials:'include',
   prepareHeaders:(headers,{getState})=>{
    
    const token = getState().auth.accessToken;
    
    if(token){
        headers.set('authorization',`Bearer ${token}`);
    }
   
    return headers;
   }



    }),
    // tagTypes:['Users'],
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
        }),
        twoStepVerify:builder.mutation({
            query:()=>({
                url:'/twofactor',
                method:'POST',
            })
        }),
       twoStepCheck:builder.mutation({
        query:(otp)=>({
        
            url:'/verify',
            method:'POST',
            body:otp,
        })
       }),
       checkTwoStep:builder.query({
        query:()=>({
            url:'/check2fa'
        })
       })



    })
})
export const { useLoginUserMutation ,useRefreshTokenQuery, useLogoutUserMutation, useGetMyInfoQuery, useTwoStepVerifyMutation, useTwoStepCheckMutation, useCheckTwoStepQuery } = api