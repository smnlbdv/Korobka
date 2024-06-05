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
    titlaGifts: "",
    imageUrl: "",
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
  delPostCardGift

} = prefabricatedGiftSlice.actions;
export default prefabricatedGiftSlice.reducer;
