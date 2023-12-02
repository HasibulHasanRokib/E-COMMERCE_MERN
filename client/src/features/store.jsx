import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import categoryReducer from './categorySlice'
import productReducer from './productSlice'
import bannerReducer from './bannerSlice'
import storage from 'redux-persist/lib/storage' 
import { persistStore, persistReducer } from 'redux-persist'

const rootReducer=combineReducers(
   {
      user:userReducer,
      category:categoryReducer,
      product:productReducer,
      banner:bannerReducer
   })

const persistConfig={
   key:'root',
   storage,
   version:1
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
     reducer:persistedReducer,
     middleware: (getDefaultMiddleware) => getDefaultMiddleware({
     serializableCheck:false,
     })
 })

 export const persistor=persistStore(store)
