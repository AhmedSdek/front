// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
    endpoints: (builder) => ({
        getproductsByName: builder.query({
            query: (name) => `products`,
        }),
    }),
});
export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
    endpoints: (builder) => ({
        getproductById: builder.query({
            query: (id) => `products/${id}`,
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetproductsByNameQuery } = productsApi
export const { useGetproductByIdQuery } = productApi
