import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Book } from "../../app/models/book";
import { Button, CardMedia, Divider, Grid, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { Image } from "@mui/icons-material";

export default function BookDetails() {
    const {id} = useParams<{id: string}>();
    const [book, setBook] = useState<Book | null>();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/books/${id}`)
            .then(response => setBook(response.data))
            .catch(error => console.log(error));
    }, [id])

    if(!book) return <h1>Error</h1>

    return (
        <>
            <Grid container spacing={6}>
                <Grid item xs={6}>
                    <img src={book.pictureUrl} alt={book.name} style={{width: '100%', height: '90%'}} />
                </Grid>
                <Grid item xs={6} sx={{mt: 10}}>
                    <Typography variant='h3'>{book.name}</Typography>
                    <Divider sx={{mb: 2}}></Divider>
                    <TableContainer>
                        <TableRow>
                            <TableCell sx={{fontWeight: 'bold'}}>Name</TableCell>
                            <TableCell>{book?.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{fontWeight: 'bold'}}>Author</TableCell>
                            <TableCell>{book?.author}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{fontWeight: 'bold'}}>Description</TableCell>
                            <TableCell>{book?.description}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{fontWeight: 'bold'}}>Genre</TableCell>
                            <TableCell>{book?.genre}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{fontWeight: 'bold'}}>Year Of Release</TableCell>
                            <TableCell>{book?.yearOfRelease}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{fontWeight: 'bold'}}>Number Of Pages</TableCell>
                            <TableCell>{book?.numberOfPages}</TableCell>
                        </TableRow>
                    </TableContainer>
                    <Divider />
                    <Typography variant="h2" fontWeight='bold' color='secondary' sx={{textAlign: 'center', mt: 5}}>
                        ${(book?.price/100)}{(book.price%100===0) ? '.00' : ''}
                    </Typography>
                </Grid>
            </Grid>
            <Button component={Link} to='/shop' sx={{width: '100%', mt: -15}}>
                Back to shop
            </Button>
        </>
    );
}