import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { shoppingCartSlice } from "../../features/shoppingCart/shoppingCartSlice";
import { bookstoreSlice } from "../../features/bookstore/bookstoreSlice";

export const store = configureStore({
    reducer: {
        shoppingCart: shoppingCartSlice.reducer,
        bookstore: bookstoreSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;