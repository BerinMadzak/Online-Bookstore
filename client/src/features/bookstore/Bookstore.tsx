import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { bookSelectors, getBooksAsync } from "./bookstoreSlice";
import BookList from "./BookList";

export default function Bookstore()
{
    const books = useAppSelector(bookSelectors.selectAll);
    const {booksLoaded} = useAppSelector(state => state.bookstore);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(!booksLoaded) dispatch(getBooksAsync());
    }, [booksLoaded, dispatch]);

    return (
        <BookList books={books} />
    );
}