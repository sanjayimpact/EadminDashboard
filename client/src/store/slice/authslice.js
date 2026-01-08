import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
    name:'auth',
    initialState:{
        accessToken:null,
        isLoggedIn:false,
        isAuthChecked:false,
        admindata:{
            name:null,
            email:null
        }
    },
    reducers:{
        setCredentials:(state, action)=>{
       
            state.accessToken = action.payload;
            state.isLoggedIn = true;
            state.isAuthChecked = true;
        },
        logout:(state)=>{
            state.accessToken = null;
            state.isLoggedIn = false;
            state.isAuthChecked = true;
        },
        setrefresh:(state)=>{
            state.isAuthChecked = true;
        },
        admindata:(state,action)=>{
            
            state.admindata.name = action.payload.name;
            state.admindata.email = action.payload.email;
        }
    }
})

export const {setCredentials, logout, setrefresh,admindata} = authSlice.actions;

export default authSlice.reducer;