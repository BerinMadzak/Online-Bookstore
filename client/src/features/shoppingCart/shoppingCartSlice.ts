import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ShoppingCart } from "../../app/models/shoppingCart";
import agent from "../../app/agent";

interface ShoppingCartState {
    shoppingCart: ShoppingCart | null
}

const initialState: ShoppingCartState = {
    shoppingCart: null
}

export const addItemToCartAsync = createAsyncThunk<ShoppingCart, {bookId: number, quantity?: number}>(
    'shoppingCart/addItemToCartAsync',
    async({bookId, quantity=1}, thunkAPI) => {
        try {
            return await agent.ShoppingCart.addItem(bookId, quantity);
        } catch(error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
)

export const removeItemFromCartAsync = createAsyncThunk<void, {bookId: number, quantity: number}>(
    'shoppingCart/removeItemFromCartAsync',
    async({bookId, quantity}, thunkAPI) => {
        try {
            await agent.ShoppingCart.removeItem(bookId, quantity);
        } catch(error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
);

export const shoppingCartSlice = createSlice({
    name: 'shoppingCart',
    initialState, 
    reducers: {
        setShoppingCart: (state, action) => {
            state.shoppingCart = action.payload
        }
    },
    extraReducers: (builder => {
        builder.addCase(addItemToCartAsync.fulfilled, (state, action) => {
            state.shoppingCart = action.payload
        });
        builder.addCase(removeItemFromCartAsync.fulfilled, (state, action) => {
            const {bookId, quantity} = action.meta.arg;
            const index = state.shoppingCart?.items.findIndex(i => i.bookId === bookId);
            if(index === -1 || index === undefined) return;
            state.shoppingCart!.items[index].quantity -= quantity;
            if(state.shoppingCart?.items[index].quantity === 0) state.shoppingCart.items.splice(index, 1);
        });
    })
})

export const {setShoppingCart} = shoppingCartSlice.actions;