import { createSlice } from "@reduxjs/toolkit";


const initialState={modularCode:null}

const modularRoute=createSlice({
    name:'modularRouter',
    initialState,

    reducers:{
        changeModuleRoute:(state,action)=>{
            console.log("action",action.payload)
                state.modularCode=action.payload
        }
    }

}) 


export const {changeModuleRoute} = modularRoute.actions;
export default modularRoute.reducer 