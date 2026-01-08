import { createSlice } from "@reduxjs/toolkit";

export const globalSlicer = createSlice({
    name:'global',
    initialState:{
        twostep:false,
        
    },
    reducers:{
        check2step:(state,action)=>{
            state.twostep=action.payload
        },
        
    },
  
})

export const {check2step} = globalSlicer.actions;
export default globalSlicer.reducer;