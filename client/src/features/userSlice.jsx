import { createSlice } from '@reduxjs/toolkit'

const userSlice=createSlice({
    name:'user',
    initialState:{
        isLoading:false,
        currentUser:null,
        error:null
    },
    reducers:{
        GET_REQUEST:(state)=>{
            state.isLoading=true
        },
        GET_REQUEST_SUCCESS:(state,action)=>{
            state.isLoading=false,
            state.currentUser=action.payload,
            state.error=null
        },
        GET_REQUEST_FAILED:(state,action)=>{
            state.isLoading=false,
            state.currentUser=null,
            state.error=action.payload
        },
        SIGN_OUT_SUCCESS:(state)=>{
            state.isLoading=false,
            state.currentUser=null,
            state.error=null
        },
        SIGN_OUT_FAILED:(state,action)=>{
            state.isLoading=false,
            state.currentUser=null,
            state.error=action.payload
        },
        UPDATE_REQUEST:(state)=>{
            state.isLoading=true
        },
        UPDATE_REQUEST_SUCCESS:(state,action)=>{
            state.isLoading=false,
            state.currentUser=action.payload
            state.error=null
        },
        UPDATE_REQUEST_FAILED:(state,action)=>{
            state.isLoading=false,
            state.currentUser=currentUser,
            state.error=action.payload
        },
    }
})

export const{GET_REQUEST,GET_REQUEST_SUCCESS,GET_REQUEST_FAILED,SIGN_OUT_SUCCESS,SIGN_OUT_FAILED,UPDATE_REQUEST,UPDATE_REQUEST_SUCCESS,UPDATE_REQUEST_FAILED}=userSlice.actions;

export default userSlice.reducer;

