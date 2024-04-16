import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Book } from "../../app/models/book";
import agent from "../../app/agent";
import { RootState } from "../../app/store/configureStore";

const adapter = createEntityAdapter<Book>();

export const getBooksAsync = createAsyncThunk<Book[]>(
    'bookstore/getBooksAsync',
    async() => {
        try {
            return await agent.Bookstore.list();
        } catch (error) {
            console.log(error);
        }
    }
);

export const bookstoreSlice = createSlice({
    name: 'bookstore',
    initialState: adapter.getInitialState({
        booksLoaded: false
    }),
    reducers: {},
    extraReducers: (builder => {
        builder.addCase(getBooksAsync.fulfilled, (state, action) => {
            adapter.setAll(state, action.payload);
            state.booksLoaded = true;
        })
    })
})

export const bookSelectors = adapter.getSelectors((state: RootState) => state.bookstore);