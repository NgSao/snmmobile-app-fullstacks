import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

export const CartReducer = createSlice({
    name: "cart",
    initialState: {
        cart: [],
        flag: true,
    },
    reducers: {
        addToCart: (state, action) => {
            const itemPresent = state.cart.find(
                (item) => item.colorId === action.payload.colorId
            );
            const stockQuantity = action.payload.quantity;

            if (itemPresent) {
                if (itemPresent.quantity < stockQuantity) {
                    itemPresent.quantity++;
                } else {
                    state.flag = false;
                }
            } else {
                state.cart.push({ ...action.payload, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            const removeItem = state.cart.filter(
                (item) => item.colorId !== action.payload.colorId
            );
            state.cart = removeItem;
        },
        incementQuantity: (state, action) => {
            const itemPresent = state.cart.find(
                (item) => item.colorId === action.payload.colorId
            );
            const stockQuantity = action.payload.quantity;

            if (itemPresent && itemPresent.quantity < stockQuantity) {
                itemPresent.quantity++;
            } else {
                state.flag = false; // Không đủ hàng trong kho
            }
        },
        decrementQuantity: (state, action) => {
            const itemPresent = state.cart.find(
                (item) => item.colorId === action.payload.colorId
            );

            if (itemPresent) {
                if (itemPresent.quantity === 1) {
                    const removeItem = state.cart.filter(
                        (item) => item.colorId !== action.payload.colorId
                    );
                    state.cart = removeItem;
                } else {
                    itemPresent.quantity--;
                }
            }
        },
        cleanCart: (state) => {
            state.cart = [];
        },
        setCart: (state, action) => {
            state.cart = action.payload;
        },
    },
});

export const loadCart = () => async (dispatch) => {
    try {
        const cartData = await AsyncStorage.getItem('cart'); // Đảm bảo gọi await
        if (cartData) {
            dispatch(setCart(JSON.parse(cartData))); // Phân tích cú pháp và lưu vào state
        }
    } catch (error) {
        console.error("Failed to load cart", error);
    }
};

export const saveCart = async (cart) => {
    try {
        await AsyncStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
        console.error("Failed to save cart", error);
    }
};

export const saveCartMiddleware = (store) => (next) => (action) => {
    const result = next(action);

    if (
        action.type === "cart/addToCart" ||
        action.type === "cart/removeFromCart" ||
        action.type === "cart/incementQuantity" ||
        action.type === "cart/decrementQuantity" ||
        action.type === "cart/cleanCart"
    ) {
        saveCart(store.getState().cart.cart);
    }

    return result;
};

export const { addToCart, removeFromCart, incementQuantity, decrementQuantity, cleanCart, setCart } = CartReducer.actions;

export default CartReducer.reducer;
