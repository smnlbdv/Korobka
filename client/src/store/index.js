import { configureStore } from "@reduxjs/toolkit";
import likedReducer from './likedSlice.js'
import cartReducer from './cartSlice.js'

// const customizedMiddleware = getDefaultMiddleware({
//     serializableCheck: false
//   });

export const store = configureStore({
    reducer: {
        liked: likedReducer,
        cart: cartReducer,
    },
    // middleware: customizedMiddleware,
})