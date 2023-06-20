import { createSlice } from "@reduxjs/toolkit";

type initialStateType = {
    userList: any[];
    isAuthenticated: boolean;
    isAdminAuthenticated: boolean;
    user: {};
    searchTerm: string;
    orders: any[];
}

const initialState: initialStateType = {
    userList: [],
    isAuthenticated: false,
    isAdminAuthenticated: false,
    user: {},
    searchTerm: "",
    orders: []
}

export const userSlice = createSlice({
    name: 'eCommerceUser',
    initialState,
    reducers: {
        addNewUser(state, action) {
            state.userList = [...state.userList, action.payload];
            state.isAuthenticated = true;
        },
        userLoggedIn(state) {
            state.isAuthenticated = true;
        },
        adminUserLoggedIn(state) {
            state.isAdminAuthenticated = true;
        },
        userLoggedOut(state) {
            state.isAuthenticated = false;
        },
        adminUserLoggedOut(state) {
            state.isAdminAuthenticated = false;
        },
        loggedInUser(state, action) {
            state.user = action.payload
        },
        addProductToCart(state, action) {
            const userIndex = state.userList.findIndex((i: any) => i.id === action.payload.userId);
            const productIndex = state.userList[userIndex].cart.findIndex((i: any) => i.productId === action.payload.productId);
            if (productIndex >= 0) {
                const userCart = state.userList[userIndex].cart;
                const data = userCart.map((i: any) => {
                    if (i.productId === action.payload.productId) {
                        return action.payload;
                    }
                    return i;
                });
                state.userList[userIndex].cart = data;
                // state.userList[userIndex].cart = [];
            } else {
                state.userList[userIndex].cart = [...state.userList[userIndex].cart, action.payload];
            }
        },
        deleteCartProduct(state, action) {
            const userIndex = state.userList.findIndex((i: any) => i.id === action.payload.userId);
            const userCart = state.userList[userIndex].cart;
            state.userList[userIndex].cart = userCart.filter((i: any) => i.productId !== action.payload.productId);
        },
        emptyCart(state, action) {
            const userIndex = state.userList.findIndex((i: any) => i.id === action.payload.userId);
            state.userList[userIndex].cart = [];
        },
        setSearchTerm(state, action) {
            state.searchTerm = action.payload;
        },
        orderedItems(state, action) {
            state.orders = [...state.orders, action.payload];
        }
    },
});
  
export const { 
    addNewUser, 
    userLoggedIn,
    adminUserLoggedIn,
    userLoggedOut,
    adminUserLoggedOut,
    loggedInUser,
    addProductToCart,
    deleteCartProduct,
    emptyCart,
    setSearchTerm,
    orderedItems
} = userSlice.actions;
  
export default userSlice.reducer;