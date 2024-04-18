import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { User } from "../../app/models/user";
import { FieldValues } from "react-hook-form";
import agent from "../../app/agent";
import { router } from "../../app/router/Routes";
import { setShoppingCart } from "../shoppingCart/shoppingCartSlice";

interface AccountState {
    user: User | null;
}

const initialState: AccountState = {
    user: null
}

export const signIn = createAsyncThunk<User, FieldValues>(
    'account/signIn',
    async(data, thunkAPI) => {
        try {
            const userDto = await agent.Account.login(data);
            const {shoppingCart, ...user} = userDto;
            if(shoppingCart) thunkAPI.dispatch(setShoppingCart(shoppingCart));
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
)

export const getCurrentUser = createAsyncThunk<User>(
    'account/getCurrentUser',
    async(_, thunkAPI) => {
        thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem('user')!)));
        try {
            const userDto = await agent.Account.currentUser();
            const {shoppingCart, ...user} = userDto;
            if(shoppingCart) thunkAPI.dispatch(setShoppingCart(shoppingCart));
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch(error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    },
    {
        condition: () => {
            if(!localStorage.getItem('user')) return false;
        }
    }
)

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        signOut: (state) => {
            state.user = null;
            localStorage.removeItem('user');
            router.navigate('/');
        },
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder => {
        builder.addCase(getCurrentUser.rejected, (state) => {
            state.user = null;
            localStorage.removeItem('user');
            router.navigate('/');
        });
        builder.addMatcher(isAnyOf(signIn.fulfilled, getCurrentUser.fulfilled), (state, action) => {
            state.user = action.payload;
        });
        builder.addMatcher(isAnyOf(signIn.rejected), (state, action) => {
            throw action.payload;
        });
    })
})

export const {signOut, setUser} = accountSlice.actions;