import axios from "axios";
import { useEffect, useState } from "react";
import { Book } from "../../app/models/book";
import BookDisplay from "./BookDisplay";

export default function Library()
{
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
      axios.get('http://localhost:5000/api/books')
           .then(response => setBooks(response.data))
           .catch(error => console.log(error));
    }, []);

    return (
        <ul>
            {books.map((book, index) => (
                <BookDisplay key={index} book={book} />
            ))}
        </ul>
    );
}