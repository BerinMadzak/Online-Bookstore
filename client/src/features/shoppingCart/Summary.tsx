import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { currencyDisplay } from "../../app/utility/utility";
import { useAppSelector } from "../../app/store/configureStore";

export default function Summary(){
    const {shoppingCart} = useAppSelector(state => state.shoppingCart);
    const subtotal = shoppingCart?.items.reduce((sum, item) => sum + (item.quantity * item.price), 0) ?? 0;
    const deliveryFee = subtotal > 5000 ? 0 : 500;

    return (
        <>
            <TableContainer component={Paper} variant="outlined">
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell align="right">{currencyDisplay(subtotal)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Delivery fee*</TableCell>
                            <TableCell align="right">{currencyDisplay(deliveryFee)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell align="right">{currencyDisplay(subtotal + deliveryFee)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <span style={{fontStyle: 'italic'}}>*Free delivery for orders over 50$</span>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}