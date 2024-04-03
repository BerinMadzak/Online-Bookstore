import axios from "axios";
import { useEffect, useState } from "react";
import { Book } from "../../app/models/book";
import BookDisplay from "./BookDisplay";
import { Grid } from "@mui/material";

export default function Library()
{
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
      axios.get('http://localhost:5000/api/books')
           .then(response => setBooks(response.data))
           .catch(error => console.log(error));
    }, []);

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