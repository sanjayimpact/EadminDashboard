import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
    name:'auth',
    initialState:{
        accessToken:null,
        isLoggedIn:false,
        isAuthChecked:false,
        twostep:false,
        admindata:{
            name:null,
            email:null
        }
    },
    reducers:{
        setCredentials:(state, action)=>{
     
            state.accessToken = action.payload.token;
            state.isLoggedIn = false;
            state.isAuthChecked = true;
            state.twostep = action.payload.twostep
            
        },
        logout:(state)=>{
            state.accessToken = null;
            state.isLoggedIn = false;
            state.isAuthChecked = true;
            state.twostep=false;
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