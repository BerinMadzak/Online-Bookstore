import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { bookSelectors, getBooksAsync, getFiltersAsync, setBookParameters } from "./bookstoreSlice";
import BookList from "./BookList";
import { Box, FormControl, FormControlLabel, Grid, Pagination, Paper, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import BookSearch from "./BookSearch";
import FilterCheckbox from "./FilterCheckbox";
import FilterDropdown from "./FilterDropdown";

export default function Bookstore()
{
    const books = useAppSelector(bookSelectors.selectAll);
    const {booksLoaded, filtersLoaded, genres, authors, bookParameters} = useAppSelector(state => state.bookstore);
    const dispatch = useAppDispatch();

    const sortOptions = [
        {value: 'name', label: 'Alphabetical'},
        {value: 'priceDesc', label: 'Price - High to low'},
        {value: 'price', label: 'Price - Low to high'}
    ];

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
                        <RadioGroup value={bookParameters.orderBy} 
                            onChange={(e) => dispatch(setBookParameters({orderBy: e.target.value}))}
                        >
                            {sortOptions.map(({value, label}) => (
                                <FormControlLabel value={value} control={<Radio />} label={label} key={value} />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Paper>
                <Paper sx={{mb: 2, p: 2}}>
                    <FilterCheckbox items={genres} checked={bookParameters.genres} 
                        onChange={(items: string[]) => dispatch(setBookParameters({genres: items}))}
                    />
                </Paper>
                <Paper sx={{mb: 2, p: 2}}>
                    <FilterDropdown items={authors} selectedValue={bookParameters.author ? bookParameters.author : "All"}
                        onChange={(e) => {
                            let author = e.target.value;
                            if(author === "All") author = undefined;
                            dispatch(setBookParameters({author}))}
                        }
                    />
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