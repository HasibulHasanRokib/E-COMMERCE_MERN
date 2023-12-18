import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createProduct, deleteProduct, getProducts } from './productService'
import { toast } from 'react-toastify'

const initialState = {
  product: null,
  products: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  totalStoreValue:0,
  outOfStock:0,
  category:[]
}

//create product
export const newProduct = createAsyncThunk('product/create', async (formData, thunkAPI) => {
  try {
    return await createProduct(formData)
  } catch (error) {
    console.log(error.message)
    return thunkAPI.rejectWithValue(error.message)
  }
})
//get all products
export const getAllProducts = createAsyncThunk('products/get', async () => {
  try {
    return await getProducts()
  } catch (error) {
    console.log(error.message)
  }
})

//deleteProduct
export const deleteProductById=createAsyncThunk('product/delete',async(id)=>{
try {
  return deleteProduct(id)
} catch (error) {
  console.log(error.message)
}
})

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
     TOTAL_STORE_VALUE:(state,action)=>{
     const products=action.payload;
     const array=[];
     products.map((item)=>{
      const{regularPrice,stock}=item;
      const productValue=regularPrice*stock;
      return array.push(productValue)
    })
    const totalValue=array.reduce((a,b)=>{
      return a+b
    },0)
    state.totalStoreValue=totalValue;
    },

    OUT_OF_STOCK:(state,action)=>{
    const products=action.payload;
    const array=[];
    products.map((item)=>{
      const{stock}=item;
      return array.push(stock)
    })
    let count=0;
    array.forEach((number)=>{
      if(number===0){
        count +=1;
      }
    })
    state.outOfStock=count;
    },

    TOTAL_CATEGORY:(state,action)=>{
      const products=action.payload;
      const array=[];
      products.map((item)=>{
        const{category}=item;
        return array.push(category)
      }); 
      const uniqueCategory=[...new Set(array)];
      state.category=uniqueCategory;
    }

  },


  extraReducers: (builder) => {
    builder
      .addCase(newProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(newProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log(action.payload)
        state.products.push(action.payload);
        toast.success('Product added successful.')
      })
      .addCase(newProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        toast.error('Product added failed!')
      })
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload.products;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        toast.error('Products not found!')
      })
      .addCase(deleteProductById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

         toast.success('Product delete successful.')
      })
      .addCase(deleteProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        toast.error('Product delete failed.')
      })
  
  }
})

export const {TOTAL_STORE_VALUE,OUT_OF_STOCK,TOTAL_CATEGORY} = productSlice.actions

export default productSlice.reducer
