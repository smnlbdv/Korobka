import { configureStore } from "@reduxjs/toolkit";
import todoReducer from './likedClice.js'

export const store = configureStore({
    reducer: {
        liked: todoReducer,
    }
})