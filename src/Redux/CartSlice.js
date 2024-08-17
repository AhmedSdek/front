import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    SelectedProducts: localStorage.getItem('SelectedProducts') ? JSON.parse(localStorage.getItem('SelectedProducts')) : [],
    SelectedProductsID: localStorage.getItem('SelectedProductsID') ? JSON.parse(localStorage.getItem('SelectedProductsID')) : []
}

export const counterSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const productwithQuantity = { ...action.payload, 'quantity': 1 }
            state.SelectedProducts.push(productwithQuantity);
            state.SelectedProductsID.push(action.payload.id);
            localStorage.setItem('SelectedProducts', JSON.stringify(state.SelectedProducts));
            localStorage.setItem('SelectedProductsID', JSON.stringify(state.SelectedProductsID));
        },

        increaseQuantity: (state, action) => {
            const increaseProduct = state.SelectedProducts.find((item) => {
                return item.id == action.payload.id
            });
            increaseProduct.quantity += 1;
            localStorage.setItem('SelectedProducts', JSON.stringify(state.SelectedProducts));

        },
        decreaseQuantity: (state, action) => {
            const decreaseProduct = state.SelectedProducts.find((item) => {
                return item.id == action.payload.id
            });
            decreaseProduct.quantity -= 1;

            if (decreaseProduct.quantity === 0) {
                const newArry = state.SelectedProducts.filter((item) => {
                    return item.id !== action.payload.id
                })
                const newArry2 = state.SelectedProductsID.filter((item) => {
                    return item !== action.payload.id
                })
                state.SelectedProducts = newArry;
                // localStorage.removeItem('SelectedProducts');
                // localStorage.removeItem('SelectedProductsID');
                state.SelectedProductsID = newArry2
                localStorage.setItem('SelectedProductsID', JSON.stringify(state.SelectedProductsID));

            }
            localStorage.setItem('SelectedProducts', JSON.stringify(state.SelectedProducts));

        },
        deleteProduct: (state, action) => {
            const newArry = state.SelectedProducts.filter((item) => {
                return item.id !== action.payload.id
            })
            const newArry2 = state.SelectedProductsID.filter((item) => {
                return item !== action.payload.id
            })
            state.SelectedProducts = newArry;
            state.SelectedProductsID = newArry2
            localStorage.setItem('SelectedProducts', JSON.stringify(state.SelectedProducts));
            localStorage.setItem('SelectedProductsID', JSON.stringify(state.SelectedProductsID));


        },
    },
})

// Action creators are generated for each case reducer function
export const { addToCart, increaseQuantity, decreaseQuantity, deleteProduct } = counterSlice.actions

export default counterSlice.reducer