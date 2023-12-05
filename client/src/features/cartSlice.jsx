import { createSlice } from '@reduxjs/toolkit'


const cartSlice=createSlice({
    name:"cart",
    initialState:{
        products:[],
        quantity:0,
        total:0
    },

    reducers:{
  
    }

})

export const {ADD_TO_CART}=cartSlice.actions

export default cartSlice.reducer;