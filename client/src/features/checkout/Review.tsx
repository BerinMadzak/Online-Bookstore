import { Grid, Typography } from "@mui/material";
import { useAppSelector } from "../../app/store/configureStore";
import ShoppingCartTable from "../shoppingCart/ShoppingCartTable";
import Summary from "../shoppingCart/Summary";
import UserReview from "./UserReview";

export default function Review() {
  const {shoppingCart} = useAppSelector(state => state.shoppingCart);
  return (
    <>
      <Typography fontSize={30} variant="h6" gutterBottom>
        Order Review
      </Typography>
      <UserReview />
      {shoppingCart && <ShoppingCartTable items={shoppingCart.items} isCart={false} />}
      <Grid container>
        <Grid item xs={12}>
          <Summary />
        </Grid>
      </Grid>
    </>
  );
}