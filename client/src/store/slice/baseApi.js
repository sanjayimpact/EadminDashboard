import {createApi ,fetchBaseQuery} from '@reduxjs/toolkit/query/react';




export const baseapi = createApi({
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
    endpoints:()=>({}),
    
})
