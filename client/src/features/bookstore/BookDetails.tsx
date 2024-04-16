import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Book } from "../../app/models/book";
import { Button, Divider, Grid, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import agent from "../../app/agent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addItemToCartAsync, removeItemFromCartAsync } from "../shoppingCart/shoppingCartSlice";

export default function BookDetails() {
    const {shoppingCart} = useAppSelector(state => state.shoppingCart);
    const dispatch = useAppDispatch();

    const {id} = useParams<{id: string}>();
    const [book, setBook] = useState<Book | null>();

    const [quantity, setQuantity] = useState(0);
    const item = shoppingCart?.items.find(i => i.bookId === book?.id);

    useEffect(() => {
        if(item) setQuantity(item.quantity);
        id && 
            agent.Bookstore.details(parseInt(id))
            .then(response => setBook(response))
            .catch(error => console.log(error));
    }, [id, item])

    function handleInputChange(event: any){
        if(event.target.value >= 0){
            setQuantity(parseInt(event.target.value));
        }
    }

    function handleUpdateCart(){
        if(!item || quantity > item.quantity){
            const updatedQuantity = item ? quantity - item.quantity : quantity;
            dispatch(addItemToCartAsync({bookId: book?.id!, quantity: updatedQuantity}));
        } else {
            const updatedQuantity = item.quantity - quantity;
            dispatch(removeItemFromCartAsync({bookId: book?.id!, quantity: updatedQuantity}));
        }
    }

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
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField onChange={handleInputChange} variant="outlined" type="number" label="Quantity" 
                                fullWidth value={quantity} />
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                disabled={item?.quantity === quantity || !item && quantity === 0} 
                                onClick={handleUpdateCart} sx={{height: '55px'}} color='primary'
                                size='large' variant='contained' fullWidth >
                                    {item ? 'Update quantity' : 'Add to cart'}
                            </Button>
                        </Grid>
                    </Grid>
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