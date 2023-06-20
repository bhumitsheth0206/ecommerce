import { createSlice } from "@reduxjs/toolkit";

type initialStateType = {
    productList: string[];
}

const initialState: initialStateType = {
    productList: [],
}

export const productSlice = createSlice({
    name: 'eCommerceProduct',
    initialState,
    reducers: {
        addNewProduct(state, action) {
            state.productList = [...state.productList, action.payload];
        },
        updateProduct(state, action) {
            const productIndex = state.productList.findIndex((i: any) => i.id === action.payload.id);
            state.productList[productIndex] = action.payload;
        },
        deleteProduct(state, action) {
            state.productList = state.productList.filter((i: any) => i.id !== action.payload.id);
        }
    },
});
  
export const { 
    addNewProduct,
    updateProduct,
    deleteProduct
} = productSlice.actions;
  
export default productSlice.reducer;