import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Book } from "../../app/models/book";
import agent from "../../app/agent";
import { RootState } from "../../app/store/configureStore";

const adapter = createEntityAdapter<Book>();

export const getBooksAsync = createAsyncThunk<Book[]>(
    'bookstore/getBooksAsync',
    async(_, thunkAPI) => {
        try {
            return await agent.Bookstore.list();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
);

export const getBookAsync = createAsyncThunk<Book, number>(
    'bookstore/getBookAsync',
    async(bookId, thunkAPI) => {
        try {
            return await agent.Bookstore.details(bookId);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
)

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
        });
        builder.addCase(getBookAsync.fulfilled, (state, action) => {
            adapter.upsertOne(state, action.payload);
        });
    })
})

export const bookSelectors = adapter.getSelectors((state: RootState) => state.bookstore);