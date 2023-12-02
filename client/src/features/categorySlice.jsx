import { createSlice } from '@reduxjs/toolkit'


const categorySlice=createSlice({
    name:"category",
    initialState:{
        isLoading:false,
        categoryData:[],
        errorMessage:null
    },

    reducers:{
        GET_CATEGORY_REQUEST:(state)=>{
            state.isLoading=true
        },
        GET_CATEGORY_SUCCESS:(state,action)=>{
            state.isLoading=false,
            state.categoryData=action.payload,
            state.errorMessage=null
        },
        GET_CATEGORY_FAILED:(state,action)=>{
            state.isLoading=false,
            state.categoryData=null,
            state.errorMessage=action.payload
        },
        ADD_CATEGORY_REQUEST:(state)=>{
            state.isLoading=true
        },
        ADD_CATEGORY_SUCCESS:(state,action)=>{
            state.isLoading=false;
            if (state.categoryData === null) {
                state.categoryData = [];
            }
            state.categoryData.push(action.payload);
            state.categoryData.push(action.payload);
        },
        ADD_CATEGORY_FAILED:(state,action)=>{
            state.isLoading=false,
            state.errorMessage=action.payload

        },
       DELETE_CATEGORY_REQUEST :(state)=>{
            state.isLoading=true
        },
        DELETE_CATEGORY_SUCCESS:(state,action)=>{
            state.isLoading=false,
            state.categoryData=state.categoryData.filter((category)=>category._id !== action.payload)
        },
        DELETE_CATEGORY_FAILED:(state,action)=>{
            state.isLoading=false,
            state.errorMessage=action.payload

        },
    }

})

export const {GET_CATEGORY_REQUEST,GET_CATEGORY_SUCCESS,GET_CATEGORY_FAILED,ADD_CATEGORY_SUCCESS,ADD_CATEGORY_FAILED,ADD_CATEGORY_REQUEST,DELETE_CATEGORY_FAILED,DELETE_CATEGORY_REQUEST,DELETE_CATEGORY_SUCCESS}=categorySlice.actions

export default categorySlice.reducer;