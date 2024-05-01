import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { ShoppingCartItem } from "../../app/models/shoppingCart";
import { useAppDispatch } from "../../app/store/configureStore";
import { Remove, Add, Delete } from "@mui/icons-material";
import { removeItemFromCartAsync, addItemToCartAsync } from "./shoppingCartSlice";

interface Props {
    items: ShoppingCartItem[];
    isCart?: boolean;
}

export default function ShoppingCartTable({items, isCart}: Props) {
    const dispatch = useAppDispatch();

    return (
        <TableContainer component={Paper} sx={{minHeight: 300}}>
            <Table sx={{ minWidth: 850}}>
                <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="right">Subtotal</TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((item) => (
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
    );
}