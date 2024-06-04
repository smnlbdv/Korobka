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
    name: 'prefabricatedGift',
    initialState: {
        product: [],
        postcards: [],
        typesBox: [],
        titlaGifts: "",
        imageUrl: ""
    },
    reducers: {
        addBoxTypeGift (state, action) {
            state.typesBox.push(action.payload)
        },
        addProductGift (state, action) {
            state.product.push(action.payload)
        },
        addPostCardGift (state, action) {
            state.postcards.push(action.payload)
        },
        incBoxTypeGift (state, action) {
            console.log(action.payload);
            const index = state.typesBox.findIndex(item => item._id === action.payload._id);
            if(index !== -1) {
                state.typesBox[index]['count'] = state.typesBox[index]['count'] + 1
            }
        },
        incProductGift (state, action) {
            console.log(action.payload);
            const index = state.product.findIndex(item => item._id === action.payload._id);
            if(index !== -1) {
                state.product[index]['count'] = state.product[index]['count'] + 1
            }
        },
        incPostCardGift (state, action) {
            console.log(action.payload);
            const index = state.postcards.findIndex(item => item._id === action.payload._id);
            if(index !== -1) {
                state.postcards[index]['count'] = state.postcards[index]['count'] + 1
            }
        },
        decBoxTypeGift (state, action) {
            const index = state.typesBox.findIndex(item => item._id === action.payload._id);
            if(index !== -1) {
                state.typesBox[index]['count'] -= 1
                if (state.typesBox[index]['count'] === 0) {
                    state.typesBox.splice(index, 1); // Удаляем элемент из массива
                }
            }
        },
        decProductGift (state, action) {
            const index = state.product.findIndex(item => item._id === action.payload._id);
            if(index !== -1) {
                state.product[index]['count'] -= 1
                if (state.product[index]['count'] === 0) {
                    state.product.splice(index, 1); // Удаляем элемент из массива
                }
            }
        },
        decPostCardGift (state, action) {
            const index = state.postcards.findIndex(item => item._id === action.payload._id);
            if(index !== -1) {
                state.postcards[index]['count'] -= 1
                if (state.postcards[index]['count'] === 0) {
                    state.postcards.splice(index, 1); // Удаляем элемент из массива
                }
            }
        }
    },
    extraReducers: builder => {
        // builder
        //     .addCase(addProductFavoriteAsync.fulfilled, (state, action) => {
        //         state.liked.push(action.payload)
        //     })

    }
})

export const {addBoxTypeGift, addProductGift, addPostCardGift, incBoxTypeGift, incProductGift, incPostCardGift, decBoxTypeGift, decProductGift, decPostCardGift} = prefabricatedGiftSlice.actions
export default prefabricatedGiftSlice.reducer