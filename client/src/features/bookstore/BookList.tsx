import { Grid } from "@mui/material";
import { Book } from "../../app/models/book";
import BookDisplay from "./BookDisplay";

interface Props{
    books: Book[];
}

export default function BookList({books}: Props){
    return (
        <Grid container rowSpacing={1} columnSpacing={1}>
            {books.map((book, index) => (
                <Grid item xs={3}>
                    <BookDisplay key={index} book={book} />
                </Grid>
            ))}
        </Grid>
    );
}