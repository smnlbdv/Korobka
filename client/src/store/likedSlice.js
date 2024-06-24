import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";

export const addProductFavoriteAsync = createAsyncThunk(
    'liked/addProductFavoriteAsync',
    async (id) => {
      try {
        const response = await api.post(`/api/favorite/add/${id}`);
        return response.data.product;
      } catch (error) {
        console.log(error.message);
      }
    }
);

export const delProductFavoriteAsync = createAsyncThunk(
    'liked/delProductFavoriteAsync',
    async (id) => {
      try {
        await api.delete(`/api/favorite/delete/${id}`);
        return {
            delete: true,
            _id: id
        };
      } catch (error) {
        console.log(error.message);
      }
    }
);

const likedSlice = createSlice({
    name: 'liked',
    initialState: {
        liked: []
    },
    reducers: {
        addProductFavorite (state, action) {
          if (!state.liked.some(item => item._id === action.payload._id)) {
              state.liked.push(action.payload)
            }
        },
        delProductFavorite (state, action) {
            state.liked = state.liked.filter(item => item._id !== action.payload);
        },
        resetProductFavorite (state, action) {
          state.liked = []
        }
    },
    extraReducers: builder => {
        builder
            .addCase(addProductFavoriteAsync.fulfilled, (state, action) => {
                state.liked.push(action.payload)
            })
        builder
            .addCase(delProductFavoriteAsync.fulfilled, (state, action) => {
                state.liked = state.liked.filter(item => item._id !== action.payload._id);
            });
    }
})

export const {addProductFavorite, delProductFavorite, resetProductFavorite} = likedSlice.actions
export default likedSlice.reducer