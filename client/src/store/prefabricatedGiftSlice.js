import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";

// export const addProductFavoriteAsync = createAsyncThunk(
//     'liked/addProductFavorite',
//     async (id) => {
//       try {
//         const response = await api.post(`/api/favorite/add/${id}`);
//         return response.data.product;
//       } catch (error) {
//         console.log(error.message);
//       }
//     }
// );

const prefabricatedGiftSlice = createSlice({
  name: "prefabricatedGift",
  initialState: {
    product: [],
    postcards: [],
    typesBox: [],
    styleBox: {},
    titlaGifts: "",
    imageUrl: "",
    itemsPrice: 0,
    totalPrice: 0,
    price: 0,
    promo: null
  },
  reducers: {
    addBoxTypeGift(state, action) {
      state.typesBox.push(action.payload);
    },
    addProductGift(state, action) {
      state.product.push(action.payload);
    },
    addPostCardGift(state, action) {
      state.postcards.push(action.payload);
    },
    setPromoConstructor(state, action) {
      state.promo = {...action.payload}
    },
    setTotalPrice (state, action) {
      state.totalPrice = action.payload;
    },
    setStyleBox(state, action) {
      state.styleBox = {...action.payload}
    }, 
    delStyleBox (state, action) {
      state.styleBox = {}
    },
    calculatePrice (state, action) {
      const productsTotal = state.product.reduce((accumulator, product) => accumulator + (product.count * product.price), 0);
      const postcardsTotal = state.postcards.reduce((accumulator, postcard) => accumulator + (postcard.count * postcard.price), 0);
      const typesBoxTotal = state.typesBox.reduce((accumulator, box) => accumulator + (box.count * box.price), 0);

      if(Object.keys(state.styleBox).length === 0 ) {
        state.itemsPrice = productsTotal + postcardsTotal + typesBoxTotal;
      } else {
        state.itemsPrice = productsTotal + postcardsTotal + typesBoxTotal + (state.styleBox.count * state.styleBox.price);
      }
    },
    incBoxTypeGift(state, action) {
      const index = state.typesBox.findIndex(
        (item) => item._id === action.payload
      );
      if (index !== -1) {
        state.typesBox[index]["count"] = state.typesBox[index]["count"] + 1;
      }
    },
    incProductGift(state, action) {
      const index = state.product.findIndex(
        (item) => item._id === action.payload
      );
      if (index !== -1) {
        state.product[index]["count"] = state.product[index]["count"] + 1;
      }
    },
    incPostCardGift(state, action) {
      const index = state.postcards.findIndex(
        (item) => item._id === action.payload
      );
      if (index !== -1) {
        state.postcards[index]["count"] = state.postcards[index]["count"] + 1;
      }
    },
    decBoxTypeGift(state, action) {
      const index = state.typesBox.findIndex(
        (item) => item._id === action.payload
      );
      if (index !== -1) {
        state.typesBox[index]["count"] -= 1;
        if (state.typesBox[index]["count"] === 0) {
          state.typesBox.splice(index, 1);
        }
      }
    },
    decProductGift(state, action) {
      const index = state.product.findIndex(
        (item) => item._id === action.payload
      );
      if (index !== -1) {
        state.product[index]["count"] -= 1;
        if (state.product[index]["count"] === 0) {
          state.product.splice(index, 1);
        }
      }
    },
    decPostCardGift(state, action) {
      const index = state.postcards.findIndex(
        (item) => item._id === action.payload
      );
      if (index !== -1) {
        state.postcards[index]["count"] -= 1;
        if (state.postcards[index]["count"] === 0) {
          state.postcards.splice(index, 1);
        }
      }
    },
    delBoxTypeGift(state, action) {
        state.typesBox = state.typesBox.filter(item => item._id !== action.payload);
    },
    delProductGift(state, action) {
        state.product = state.product.filter(item => item._id !== action.payload);
    },
    delPostCardGift(state, action) {
        state.postcards = state.postcards.filter(item => item._id !== action.payload);   
    },
    deleteItemConstructor (state, action) {
      const itemToDelete = action.payload;
      state.product = state.product.filter(item => item._id !== itemToDelete);
      state.postcards = state.postcards.filter(item => item._id !== itemToDelete);
      state.typesBox =  state.typesBox.filter(item => item._id !== itemToDelete);
      
      if(state.styleBox._id === itemToDelete) {
        state.styleBox =  {};
      }
    }
  },
  extraReducers: (builder) => {
    // builder
    //     .addCase(addProductFavoriteAsync.fulfilled, (state, action) => {
    //         state.liked.push(action.payload)
    //     })
  },
});

export const {
  addBoxTypeGift,
  addProductGift,
  addPostCardGift,
  incBoxTypeGift,
  incProductGift,
  incPostCardGift,
  decBoxTypeGift,
  decProductGift,
  decPostCardGift,
  delBoxTypeGift,
  delProductGift,
  delPostCardGift,
  setPromoConstructor,
  setTotalPrice,
  calculatePrice,
  setStyleBox,
  delStyleBox,
  deleteItemConstructor

} = prefabricatedGiftSlice.actions;
export default prefabricatedGiftSlice.reducer;
