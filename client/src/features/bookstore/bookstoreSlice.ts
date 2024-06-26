import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Book, BookParameters } from "../../app/models/book";
import agent from "../../app/agent";
import { RootState } from "../../app/store/configureStore";
import { MetaData } from "../../app/models/pagination";

interface BookstoreState {
    booksLoaded: boolean;
    filtersLoaded: boolean;
    genres: string[];
    authors: string[];
    bookParameters: BookParameters;
    metaData: MetaData | null;
}

const adapter = createEntityAdapter<Book>();

function getAxiosParameters(bookParameters: BookParameters) {
    const params = new URLSearchParams();
    params.append('pageNumber', bookParameters.pageNumber.toString());
    params.append('pageSize', bookParameters.pageSize.toString());
    params.append('orderBy', bookParameters.orderBy);

    if(bookParameters.search) params.append('search', bookParameters.search);
    if(bookParameters.genres?.length > 0) params.append('genres', bookParameters.genres.toString());
    if(bookParameters.author) params.append('author', bookParameters.author);

    return params;
}

export const getBooksAsync = createAsyncThunk<Book[], void, {state: RootState}>(
    'bookstore/getBooksAsync',
    async(_, thunkAPI) => {
        const params = getAxiosParameters(thunkAPI.getState().bookstore.bookParameters);
        try {
            const response = await agent.Bookstore.list(params);
            thunkAPI.dispatch(setMetaData(response.metaData));
            return response.items;
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

function initialBookParameters() {
    return {
        pageNumber: 1,
        pageSize: 8,
        orderBy: 'name',
        genres: [],
        author: ''
    }
};

export const bookstoreSlice = createSlice({
    name: 'bookstore',
    initialState: adapter.getInitialState<BookstoreState>({
        booksLoaded: false,
        filtersLoaded: false,
        genres: [],
        authors: [],
        bookParameters: initialBookParameters(),
        metaData: null
    }),
    reducers: {
        setBookParameters: (state, action) => {
            state.booksLoaded = false;
            state.bookParameters = {...state.bookParameters, ...action.payload, pageNumber: 1};
        },
        resetBookParameters: (state) => {
            state.bookParameters = initialBookParameters();
        },
        setMetaData: (state, action) => {
            state.metaData = action.payload;
        },
        setPageNumber: (state, action) => {
            state.booksLoaded = false;
            state.bookParameters = {...state.bookParameters, ...action.payload};
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
            state.authors.sort();
            state.authors = ["All", ...state.authors];
            state.filtersLoaded = true;
        });
    })
})

export const bookSelectors = adapter.getSelectors((state: RootState) => state.bookstore);
export const {setBookParameters, resetBookParameters, setMetaData, setPageNumber} = bookstoreSlice.actions;