import { configureStore } from "@reduxjs/toolkit";
import likedReducer from './likedSlice.js'
import cartReducer from './cartSlice.js'
import profileReducer from './profileSlice.js'

export const store = configureStore({
    reducer: {
        liked: likedReducer,
        cart: cartReducer,
        profile: profileReducer
    },
})