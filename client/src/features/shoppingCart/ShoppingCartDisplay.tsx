import { useEffect, useState } from "react";
import agent from "../../app/agent";
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { ShoppingCart } from "../../app/models/shoppingCart";
import { Delete } from "@mui/icons-material";

export default function ShoppingCartDisplay() {
    const [cart, setCart] = useState<ShoppingCart | null>(null);

    useEffect(() => {
        agent.ShoppingCart.get()
            .then(cart => setCart(cart))
            .catch(error => console.log(error));
    }, []);

    if(!cart) return <Typography variant="h3">Shopping cart is empty</Typography>
    
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 850 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                            <TableCell align="right">Subtotal</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cart.items.map((item) => (
                            <TableRow key={item.bookId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">{item.name}</TableCell>
                                <TableCell align="right">${(item.price / 100).toFixed(2)}</TableCell>
                                <TableCell align="right">{item.quantity}</TableCell>
                                <TableCell align="right">${((item.price / 100) * item.quantity).toFixed(2)}</TableCell>
                                <TableCell align="right">
                                    <IconButton color="error">
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}