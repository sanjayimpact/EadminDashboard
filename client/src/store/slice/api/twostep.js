import { baseapi } from "../baseApi";

export const twostep = baseapi.injectEndpoints({
    endpoints:(builder)=>({
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

export const {useTwoStepVerifyMutation,useTwoStepCheckMutation,useCheckTwoStepQuery} = twostep