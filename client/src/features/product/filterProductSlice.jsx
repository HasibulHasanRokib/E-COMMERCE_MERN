import { createSlice } from '@reduxjs/toolkit'

const initialState = {
filterProducts:[]
}

const filterProductSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    SEARCH_PRODUCT(state,action){
        const{products,search}=action.payload;
        const searchProduct=products?.filter((item)=>item.title.toLowerCase().includes(search))
        state.filterProducts=searchProduct;
    }
  }
});

export const {SEARCH_PRODUCT} = filterProductSlice.actions

export default filterProductSlice.reducer