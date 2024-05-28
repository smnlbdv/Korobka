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

export const decreaseCartItemAsync = createAsyncThunk(
  'cart/decreaseProductCartAsync',
  async (id) => {
    try {
      const response = await api.post(`/api/cart/decrease/`, {id: id})
      return {
        increase: response.data.increase,
        _id: id
      };
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const updateCountItemAsync = createAsyncThunk(
  'cart/updateCountItemAsync',
  async (obj) => {
    try {
      await api.post(`/api/cart/update-item`, {id: obj._id, count: obj.count})
      return {
        _id: obj._id,
        count: obj.count
      };
    } catch (error) {
      console.log(error.message);
    }
  }
);

// export const fullDeleteCartItemAsync = createAsyncThunk(
//   'cart/fullDeleteCartItemAsync',
//   async () => {
//     try {
//       const response = await api.delete(`/api/cart/full-delete`)
//       return response.data
//     } catch (error) {
//       console.log(error.message);
//     }
//   }
// );

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        checkArray: [],
        cartPrice: 0,
        order: []
        // scroll: false
    },
    reducers: {
        addProductCart (state, action) {
            state.cart.push(action.payload)
        },
        addCheckArray (state, action) {
          state.checkArray.push(action.payload)
        },
        removeCheckArray (state, action) {
          state.checkArray = state.checkArray.filter(item => item !== action.payload);
        },
        checkScroll (state, action) {
          state.scroll = action.payload;
        },
        calculatePrice (state, action) {
          state.cartPrice = state.cart.reduce((accumulator, product) => {
            const subtotal =  product.count * product.price;
            return accumulator + subtotal;
          }, 0);
        },
        calculatePriceCheck (state, action) {
          let productsInCart = state.cart.filter(item => state.checkArray.includes(item._id));
          state.cartPrice = productsInCart.reduce((accumulator, product) => {
            const subtotal =  product.count * product.price;
            return accumulator + subtotal;
          }, 0);
        },
        orderPushItems (state, action) {
          state.order = []
          state.order.push(...action.payload);
        } 
    },
    extraReducers: builder => {
        builder
            .addCase(addProductCartAsync.fulfilled, (state, action) => {
                 if(action.payload.count > 1) {
                    const cartItemIndex = state.cart.findIndex(item => item._id === action.payload._id);
                    state.cart[cartItemIndex].count = action.payload.count;
                  } else {
                    const product = {
                      ...action.payload,
                      count: action.payload.count,
                    };
                    state.cart.push(product)
                  }   
            })
        builder
            .addCase(increaseCartItemAsync.fulfilled, (state, action) => {
                const index = state.cart.findIndex(item => item._id === action.payload._id);
                if(index !== -1) {
                    state.cart[index]['count'] = state.cart[index]['count'] + 1
                }
            });
        builder
            .addCase(decreaseCartItemAsync.fulfilled, (state, action) => {
                const index = state.cart.findIndex(item => item._id === action.payload._id);
                if(index !== -1) {
                  state.cart[index]['count'] -= 1
                }
            });
        builder
            .addCase(updateCountItemAsync.fulfilled, (state, action) => {
                const index = state.cart.findIndex(item => item._id === action.payload._id);
                if(index !== -1) {
                  state.cart[index]['count'] = action.payload.count
                }
            });
        builder
          .addCase(deleteCartItemAsync.fulfilled, (state, action) => {
            if(action.payload.delete === true) {
              state.cart = state.cart.filter(item => item._id !== action.payload._id);

              if(state.checkArray.some((product) => product === action.payload._id)) {
                state.checkArray = state.checkArray.filter(item => item !== action.payload._id);
              }
            }
          });

        // builder
        //   .addCase(fullDeleteCartItemAsync.fulfilled, (state, action) => {
        //     if(action.payload.delete === true) {
        //       state.cart = []
        //     }
        //   });
    }
})

export const {addProductCart, addCheckArray, removeCheckArray, checkScroll, calculatePrice, calculatePriceCheck, orderPushItems} = cartSlice.actions
export default cartSlice.reducer