import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Book, BookParameters } from "../../app/models/book";
import agent from "../../app/agent";
import { RootState } from "../../app/store/configureStore";

interface BookstoreState {
    booksLoaded: boolean;
    filtersLoaded: boolean;
    genres: string[];
    authors: string[];
    bookParameters: BookParameters;
}

const adapter = createEntityAdapter<Book>();

function getAxiosParameters(bookParameters: BookParameters) {
    const params = new URLSearchParams();
    params.append('pageNumber', bookParameters.pageNumber.toString());
    params.append('pageSize', bookParameters.pageSize.toString());
    params.append('orderBy', bookParameters.orderBy);

    if(bookParameters.search) params.append('search', bookParameters.search);
    if(bookParameters.genres) params.append('genres', bookParameters.genres.toString());
    if(bookParameters.author) params.append('author', bookParameters.author);

    return params;
}

export const getBooksAsync = createAsyncThunk<Book[], void, {state: RootState}>(
    'bookstore/getBooksAsync',
    async(_, thunkAPI) => {
        const params = getAxiosParameters(thunkAPI.getState().bookstore.bookParameters);
        try {
            return await agent.Bookstore.list(params);
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

export const getFiltersAsync = createAsyncThunk(
    'bookstore/getFiltersAsync',
    async(_, thunkAPI) => {
        try {
            return await agent.Bookstore.filters();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
)

export const bookstoreSlice = createSlice({
    name: 'bookstore',
    initialState: adapter.getInitialState<BookstoreState>({
        booksLoaded: false,
        filtersLoaded: false,
        genres: [],
        authors: [],
        bookParameters: {
            pageNumber: 1,
            pageSize: 6,
            orderBy: 'name'
        }
    }),
    reducers: {
        setBookParameters: (state, action) => {
            state.booksLoaded = false;
            state.bookParameters = {...state.bookParameters, ...action.payload};
        },
        resetBookParameters: (state) => {
            state.bookParameters = {
                pageNumber: 1,
                pageSize: 6,
                orderBy: 'name'
            };
        }
    },
    extraReducers: (builder => {
        builder.addCase(getBooksAsync.fulfilled, (state, action) => {
            adapter.setAll(state, action.payload);
            state.booksLoaded = true;
        });
        builder.addCase(getBookAsync.fulfilled, (state, action) => {
            adapter.upsertOne(state, action.payload);
        });
        builder.addCase(getFiltersAsync.fulfilled, (state, action) => {
            state.genres = action.payload.genres;
            state.authors = action.payload.authors;
            state.filtersLoaded = true;
        });
    })
})

export const bookSelectors = adapter.getSelectors((state: RootState) => state.bookstore);
export const {setBookParameters, resetBookParameters} = bookstoreSlice.actions;