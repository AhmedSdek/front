import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { productApi, productsApi } from './Products'
import cartRedducer from './CartSlice'

export const store = configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        [productsApi.reducerPath]: productsApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        cart: cartRedducer
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsApi.middleware).concat(productApi.middleware),


})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)