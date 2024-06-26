import { TextField, debounce } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { setBookParameters } from "./bookstoreSlice";

export default function BookSearch() {
    const {bookParameters} = useAppSelector(state => state.bookstore);
    const dispatch = useAppDispatch();

    const debouncedSearch = debounce((event: any) => {
        dispatch(setBookParameters({search: event.target.value}))
    }, 1000);

    return (
        <TextField label="Search books" variant="outlined" fullWidth value={bookParameters.search || ''}
            onChange={
                (event: any) => {dispatch(setBookParameters({search: event.target.value}));
                debouncedSearch(event);
            }} />
    );
}