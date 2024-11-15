import { configureStore } from "@reduxjs/toolkit";
import CartReducer, { loadCart, saveCartMiddleware } from "./CartReducer";
import WishListReducer from './WishListReducer';
import OrderReducer from './OrderReducer';

const Store = configureStore({
    reducer: {
        cart: CartReducer,
        wishlist: WishListReducer,
        order: OrderReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(saveCartMiddleware),
});

Store.dispatch(loadCart());

export default Store;
