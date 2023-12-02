import { createSlice } from '@reduxjs/toolkit'


const productSlice=createSlice({
    name:"product",
    initialState:{
        isLoading:false,
        productData:null,
        error:null
    },

    reducers:{
        GET_PRODUCT_REQUEST:(state)=>{
            state.isLoading=true
        },
        GET_PRODUCT_SUCCESS:(state,action)=>{
            state.isLoading=false,
            state.productData=action.payload,
            state.error=null
        },
        GET_PRODUCT_FAILED:(state,action)=>{
            state.isLoading=false,
            state.productData=null,
            state.error=action.payload
        },
        ADD_PRODUCT_REQUEST:(state)=>{
            state.isLoading=true
        },
        ADD_PRODUCT_SUCCESS:(state,action)=>{
            state.isLoading=false,
            state.productData.push(action.payload);
        },
        ADD_PRODUCT_FAILED:(state,action)=>{
            state.isLoading=false,
            state.error=action.payload

        },
        DELETE_PRODUCT_REQUEST :(state)=>{
            state.isLoading=true
        },
        DELETE_PRODUCT_SUCCESS:(state,action)=>{
            state.isLoading=false,
            state.productData=state.productData.filter((product)=>product._id !== action.payload)
        },
        DELETE_PRODUCT_FAILED:(state,action)=>{
            state.isLoading=false,
            state.error=action.payload

        },
    
    }

})

export const {ADD_PRODUCT_SUCCESS,ADD_PRODUCT_FAILED,ADD_PRODUCT_REQUEST,GET_PRODUCT_FAILED,GET_PRODUCT_REQUEST,GET_PRODUCT_SUCCESS,DELETE_PRODUCT_FAILED,DELETE_PRODUCT_REQUEST,DELETE_PRODUCT_SUCCESS}=productSlice.actions

export default productSlice.reducer;