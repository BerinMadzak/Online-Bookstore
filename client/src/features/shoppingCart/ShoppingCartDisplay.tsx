import { Box, Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import agent from "../../app/agent";
import Summary from "./Summary";
import { Link } from "react-router-dom";
import Checkout from "../checkout/Checkout";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addItemToCartAsync, removeItemFromCartAsync, setShoppingCart } from "./shoppingCartSlice";

export default function ShoppingCartDisplay() {
    const {shoppingCart} = useAppSelector(state => state.shoppingCart);
    const dispatch = useAppDispatch();

    if(!shoppingCart) return <Typography variant="h3">Shopping cart is empty</Typography>
    
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 850 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="right">Subtotal</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {shoppingCart.items.map((item) => (
                            <TableRow key={item.bookId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    <Box display="flex" alignItems="center">
                                        <img src={item.pictureUrl} alt={item.name} style={{height: 50, marginRight: 20}}/>    
                                        {item.name}
                                    </Box>
                                </TableCell>
                                <TableCell align="right">${(item.price / 100).toFixed(2)}</TableCell>
                                <TableCell align="right">{item.quantity}</TableCell>
                                <TableCell align="right">${((item.price / 100) * item.quantity).toFixed(2)}</TableCell>
                                <TableCell align="center">
                                    <IconButton color="error" 
                                        onClick={() => dispatch(removeItemFromCartAsync({bookId: item.bookId, quantity: 1}))}
                                    >
                                        <Remove />
                                    </IconButton>
                                    {item.quantity}
                                    <IconButton color="secondary" 
                                        onClick={() => dispatch(addItemToCartAsync({bookId: item.bookId}))}
                                    >
                                        <Add />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton color="error" 
                                        onClick={() => dispatch(removeItemFromCartAsync({bookId: item.bookId, quantity: item.quantity}))}
                                    >
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid container>
                <Grid item xs={6} />
                <Grid item xs={6} >
                    <Summary />
                </Grid>
                <Grid item xs={6} />
                <Grid item xs={6}>                   
                    <Button
                        component={Link}
                        to='/checkout'
                        variant='contained'
                        size='large'
                        fullWidth
                    >
                        Checkout
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}