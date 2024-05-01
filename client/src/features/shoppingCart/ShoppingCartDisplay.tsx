import { Button, Grid, Typography } from "@mui/material";
import Summary from "./Summary";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/store/configureStore";
import ShoppingCartTable from "./ShoppingCartTable";

export default function ShoppingCartDisplay() {
    const {shoppingCart} = useAppSelector(state => state.shoppingCart);

    if(!shoppingCart) return <Typography variant="h3">Shopping cart is empty</Typography>
    
    return (
        <>
            <ShoppingCartTable items={shoppingCart.items} />
            <Grid container>
                <Grid item xs={12} >
                    <Summary />
                </Grid>
                <Grid item xs={12}>                   
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