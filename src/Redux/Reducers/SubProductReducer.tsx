import { createSlice } from "@reduxjs/toolkit";

type initialStateType = {
    subProductList: any[];
}

const initialState: initialStateType = {
    subProductList: []
}

export const subProductSlice = createSlice({
    name: 'eCommerceSubProduct',
    initialState,
    reducers: {
        addNewSubProduct(state, action) {
            state.subProductList = [...state.subProductList, action.payload];
        },
        updateSubProduct(state, action) {
            const subProductIndex = state.subProductList.findIndex((i: any) => i.id === action.payload.id);
            state.subProductList[subProductIndex] = action.payload;
        },
        updateSubProductOnProduct(state, action) {
            state.subProductList = state.subProductList.filter((i: any) => {
                if (i.productId === action.payload.id) {
                    i.category = action.payload.title
                }
                return i;
            });
        },
        deleteSubProduct(state, action) {
            state.subProductList = state.subProductList.filter((i: any) => i.id !== action.payload.id);
        },
        deleteSubProductOnProduct(state, action) {
           state.subProductList = state.subProductList.filter((i: any) => i.category !== action.payload);
        },
    },
});
  
export const { 
    addNewSubProduct,
    updateSubProduct,
    updateSubProductOnProduct,
    deleteSubProduct,
    deleteSubProductOnProduct,
} = subProductSlice.actions;
  
export default subProductSlice.reducer;