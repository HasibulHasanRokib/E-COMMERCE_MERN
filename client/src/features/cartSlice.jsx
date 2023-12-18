import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

const initialState = {
cartItems:[],
cartTotalQuantity:0,
cartTotalAmount:0
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    ADD_TO_CART:(state,action)=>{
        const existingItem = state.cartItems.find(item => item._id === action.payload._id)
        if (!existingItem) {
          state.cartItems.push(action.payload);
          state.cartTotalQuantity += 1;
        } else {
        toast.warning('Item already exists in the cart.');
        }
        state.cartTotalAmount += action.payload.regularPrice;
        

    },
    DELETE_CART_ITEM:(state,action)=>{
        const deletedItem = state.cartItems.find(item => item._id === action.payload);
      
      if (deletedItem) {
        state.cartItems = state.cartItems.filter(item => item._id !== action.payload);
        state.cartTotalQuantity -= 1;
        state.cartTotalAmount -= deletedItem.regularPrice;
      }
    }
  }
});

export const {ADD_TO_CART,DELETE_CART_ITEM} = cartSlice.actions

export default cartSlice.reducer