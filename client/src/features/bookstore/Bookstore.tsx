import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { bookSelectors, getBooksAsync, getFiltersAsync } from "./bookstoreSlice";
import BookList from "./BookList";
import { Box, FormControl, Grid, Pagination, Paper, RadioGroup, TextField, Typography } from "@mui/material";
import BookSearch from "./BookSearch";

export default function Bookstore()
{
    const books = useAppSelector(bookSelectors.selectAll);
    const {booksLoaded, filtersLoaded} = useAppSelector(state => state.bookstore);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(!booksLoaded) dispatch(getBooksAsync());
    }, [booksLoaded, dispatch]);

    useEffect(() => {
        if(!filtersLoaded) dispatch(getFiltersAsync());
    }, [filtersLoaded, dispatch]);

    return (
        <Grid container spacing={4}>
            <Grid item xs={3}>
                <Paper sx={{mb: 2}}>
                    <BookSearch />
                </Paper>
                <Paper sx={{mb: 2, p: 2}}>
                    <FormControl>
                        <RadioGroup>
                            SORT OPTIONS
                        </RadioGroup>
                    </FormControl>
                </Paper>
                <Paper sx={{mb: 2, p: 2}}>
                    GENRES
                </Paper>
                <Paper sx={{mb: 2, p: 2}}>
                    AUTHORS
                </Paper>
            </Grid>
            <Grid item xs={9}>
                <BookList books={books} />
            </Grid>
            <Grid item xs={3} />
            <Grid item xs={9}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography>PAGES</Typography>
                    <Pagination color="secondary" size="large" count={10} page={2} />
                </Box>
            </Grid>
        </Grid>
    );
}