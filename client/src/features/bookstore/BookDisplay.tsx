import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";
import { Book } from "../../app/models/book";
import { Link } from "react-router-dom";
import agent from "../../app/agent";
import { currencyDisplay } from "../../app/utility/utility";
import { useAppDispatch } from "../../app/store/configureStore";
import { addItemToCartAsync, setShoppingCart } from "../shoppingCart/shoppingCartSlice";

interface Props {
    book: Book;
}

export default function BookDisplay({book}: Props) {
    const dispatch = useAppDispatch();

    function addItemToCart(bookId: number) {
        agent.ShoppingCart.addItem(bookId)
            .then(cart => dispatch(setShoppingCart(cart)))
            .catch(error => console.log(error));
    }

    return (
        <Card sx={{ height: 470}}>
        <CardMedia
            component="img"
            alt={book.name}
            height="300"
            image={book.pictureUrl}
            sx={{objectFit: 'contain', pt: 2}}
        />
        <CardContent>
            <Typography variant="h4" sx={{textAlign: 'center', fontSize: '1em'}}>
            {book.name}
            </Typography>
            <Typography variant="h6" sx={{fontWeight: 'normal', fontSize: '0.7em', textAlign: 'center'}}>
            {book.author}
            </Typography>
            <Typography variant="h6" sx={{textAlign: 'center', pt: 2}}>
            {currencyDisplay(book.price)}
            </Typography>
        </CardContent>
        <CardActions sx={{mt: -1, justifyContent: 'center'}}>
            <Button size="small" onClick={() => dispatch(addItemToCartAsync({bookId: book.id}))}>Add To Cart</Button>
            <Button size="small" component={Link} to={`/shop/${book.id}`}>Details</Button>
        </CardActions>
        </Card>
    );
}