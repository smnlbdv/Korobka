import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";

export const deleteOrderItemAsync = createAsyncThunk(
    'liked/deleteOrderItemAsync',
    async (id) => {
      try {
        const response = await api.delete(`/api/profile/delete-order/${id}`)
        return {
            ...response.data,
            _id: id,
        }
      } catch (error) {
        console.log(error.message);
      }
    }
);

export const updateInfoProfileAsync = createAsyncThunk(
    'liked/updateInfoProfileAsync',
    async (changedData) => {
      try {
        await api.patch("/api/profile/update", changedData)
        return {
            data: changedData,
        }
      } catch (error) {
        console.log(error.message);
      }
    }
);

export const placeOrderAsync = createAsyncThunk(
    'liked/placeOrderAsync',
    async (orderObj) => {
      try {
        const response = await api.post(`/api/profile/order`, {order: orderObj.values, cart: orderObj.order, totalAmount: orderObj.price})
        return {
            result: response.data.success,
            message: response.data.message,
            url: response.data.url,
            order: response.data.order,
            success: response.data.success
        }
      } catch (error) {
        console.log(error);
      }
    }
);


const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        profile: {},
        order: []
    },
    reducers: {
        addInfoProfile (state, action) {
            state.profile = { ...action.payload };
        },
        addProductProfile (state, action) {
            state.order.push(action.payload)
        }
    },
    extraReducers: builder => {
        builder
            .addCase(deleteOrderItemAsync.fulfilled, (state, action) => {
                if(action.payload && action.payload.success === true) {
                    state.order = state.order.filter(item => item._id !== action.payload._id);
                } 
            })
        builder
            .addCase(updateInfoProfileAsync.fulfilled, (state, action) => {
                state.profile = {
                    ...state.profile,
                    ...action.payload.data
                };
            })
    }
})

export const {addInfoProfile, addProductProfile, updateInfoProfile} = profileSlice.actions
export default profileSlice.reducer