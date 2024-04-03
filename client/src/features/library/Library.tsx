import { useEffect, useState } from "react";
import { Book } from "../../app/models/book";
import BookDisplay from "./BookDisplay";
import { Grid } from "@mui/material";
import agent from "../../app/agent";

export default function Library()
{
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        agent.Library.list().then(books => setBooks(books))
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