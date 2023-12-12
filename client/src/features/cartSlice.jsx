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

export const {}=cartSlice.actions

export default cartSlice.reducer;