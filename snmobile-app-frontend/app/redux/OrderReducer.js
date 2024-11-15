// import { createSlice } from "@reduxjs/toolkit";
// import 'react-native-get-random-values';
// import { v4 as uuidv4 } from 'uuid';

// const generateUniqueOrderCode = () => {
//     return "SN." + uuidv4().replace(/-/g, "").substring(0, 10).toUpperCase();
// };


// export const OrderReducer = createSlice({
//     name: "order",
//     initialState: {
//         order: [],
//         orderInfo: {},
//     },
//     reducers: {
//         createOrderItem: (state, action) => {
//             const orderItem = {
//                 ...action.payload,
//                 orderCode: generateUniqueOrderCode(),
//             };
//             state.order.push(orderItem);
//         },
//         createOrderInfo: (state, action) => {
//             state.orderInfo = action.payload;

//         },
//         clearOrder: (state) => {
//             state.order = [];
//             state.orderInfo = {};
//         }
//     },
// });

// export const { createOrderItem, createOrderInfo, clearOrder } = OrderReducer.actions;

// export default OrderReducer.reducer;

import { createSlice } from "@reduxjs/toolkit";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const generateUniqueOrderCode = () => {
    return "SN." + uuidv4().replace(/-/g, "").substring(0, 10).toUpperCase();
};

export const OrderReducer = createSlice({
    name: "order",
    initialState: {
        order: [],
        orderInfo: {},
    },
    reducers: {
        createOrderItem: (state, action) => {
            state.order = action.payload;
        },
        createOrderInfo: (state, action) => {
            state.orderInfo = {
                ...action.payload,
                orderCode: generateUniqueOrderCode(),
            };
        },
        clearOrder: (state) => {
            state.order = [];
            state.orderInfo = {};
        },
    },
});

export const { createOrderItem, createOrderInfo, clearOrder } = OrderReducer.actions;
export default OrderReducer.reducer;
