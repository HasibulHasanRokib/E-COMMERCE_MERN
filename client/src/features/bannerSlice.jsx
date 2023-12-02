import { createSlice } from '@reduxjs/toolkit'


const bannerSlice=createSlice({
    name:"banner",
    initialState:{
        isLoading:false,
        banner:[],
        error:null
    },

    reducers:{
        GET_BANNER_REQUEST:(state)=>{
            state.isLoading=true;
        },
        GET_BANNER_SUCCESS:(state,action)=>{
            state.isLoading=false;
            state.banner=action.payload;
            state.error=null;
        },
        GET_BANNER_FAILED:(state,action)=>{
            state.isLoading=false;
            state.banner=null;
            state.error=action.payload;
        },
        ADD_BANNER_REQUEST:(state)=>{
            state.isLoading=true;
        },
        ADD_BANNER_SUCCESS:(state,action)=>{
            state.isLoading=false;
            if (state.banner === null) {
                state.banner = [];
            }
            state.banner.push(action.payload);
            state.error=null;

        },
        ADD_BANNER_FAILED:(state,action)=>{
            state.isLoading=false;
            state.error=action.payload;

        },
       DELETE_BANNER_REQUEST :(state)=>{
            state.isLoading=true;
        },
        DELETE_BANNER_SUCCESS:(state,action)=>{
            state.isLoading=false;
            state.banner=state.banner.filter((image)=>image._id !== action.payload);
        },
        DELETE_BANNER_FAILED:(state,action)=>{
            state.isLoading=false;
            state.error=action.payload;

        },
    }

})

export const {GET_BANNER_SUCCESS,GET_BANNER_REQUEST,GET_BANNER_FAILED,ADD_BANNER_FAILED,ADD_BANNER_REQUEST,ADD_BANNER_SUCCESS,DELETE_BANNER_FAILED,DELETE_BANNER_REQUEST,DELETE_BANNER_SUCCESS}=bannerSlice.actions

export default bannerSlice.reducer;