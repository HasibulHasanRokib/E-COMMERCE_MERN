import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import {persistor,store} from './features/store'
import { Provider } from 'react-redux'
import ProductsProvider from './context/productContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
    <ProductsProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </ProductsProvider>
    </PersistGate>
  </Provider>
)
