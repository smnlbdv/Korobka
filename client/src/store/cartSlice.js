import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";

export const addProductCartAsync = createAsyncThunk(
    'cart/addProductCartAsync',
    async (id) => {
      try {
        const response = await api.post(`/api/cart/add/${id}`)
        return response.data;
      } catch (error) {
        console.log(error.message);
      }
    }
);

export const increaseCartItemAsync = createAsyncThunk(
    'cart/increaseProductCartAsync',
    async (id) => {
      try {
        const response = await api.post(`/api/cart/increase/`, {id: id})
        return {
          increase: response.data.increase,
          _id: id
        };
      } catch (error) {
        console.log(error.message);
      }
    }
);

export const deleteCartItemAsync = createAsyncThunk(
  'cart/deleteProductCartAsync',
  async (id) => {
    try {
      const response = await api.delete(`/api/cart/delete/${id}`)
      return {
        delete: response.data.delete,
        _id: id
      };
    } catch (error) {
      console.log(error.message);
    }
  }
);


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: []
    },
    reducers: {
        addProductCart (state, action) {
            state.cart.push(action.payload)
        }
    },
    extraReducers: builder => {
        builder
            .addCase(addProductCartAsync.fulfilled, (state, action) => {
                 if(action.payload.count > 1) {
                    const cartItemIndex = state.cart.findIndex(item => item._id === action.payload._id);
                    state.cart[cartItemIndex].count = action.payload.count;
                    // openNotification('bottomRight', 'Товар успешно добавлен в корзину');
                  } else {
                    const product = {
                      ...action.payload,
                      count: action.payload.count,
                    };
                    state.cart.push(product)
                    // setCart(prevCart => [...prevCart, product]);
                    // openNotification('bottomRight', 'Товар успешно добавлен в корзину');
                  }   
            })
        builder
            .addCase(increaseCartItemAsync.fulfilled, (state, action) => {
                const index = state.cart.findIndex(item => item._id === action.payload._id);
                if(index !== -1) {
                    state.cart[index]['count'] = state.cart[index]['count'] + 1
                }
                // openNotification('bottomRight', 'Товар успешно добавлен в корзину')
            });
        builder
          .addCase(deleteCartItemAsync.fulfilled, (state, action) => {
            if(action.payload.delete === true) {
              state.cart = state.cart.filter(item => item._id !== action.payload._id);
              // openNotificationError('bottomRight', "Товар удален из корзины")
              const existingCart = JSON.parse(localStorage.getItem('checkArray'));
              const updatedCart = existingCart.filter(item => item._id !== action.payload._id);
              localStorage.setItem('checkArray', JSON.stringify(updatedCart));
            }
          });
    }
})

export const {addProductCart} = cartSlice.actions
export default cartSlice.reducer