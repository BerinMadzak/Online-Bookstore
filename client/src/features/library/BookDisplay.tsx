import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";
import { Book } from "../../app/models/book";
import { Link } from "react-router-dom";

interface Props {
    book: Book;
}

export default function BookDisplay({book}: Props) {
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
            <Typography variant="h4" sx={{textAlign: 'center', fontSize: '1.5em'}}>
            {book.name}
            </Typography>
            <Typography variant="h6" sx={{fontWeight: 'normal', fontSize: '1em', textAlign: 'center'}}>
            {book.author}
            </Typography>
            <Typography variant="h6" sx={{textAlign: 'center', pt: 2}}>
            ${(book.price/100)}{(book.price%100 === 0) ? '.00' : ''} 
            </Typography>
        </CardContent>
        <CardActions sx={{mt: -1, justifyContent: 'center'}}>
            <Button size="small">Add To Cart</Button>
            <Button size="small" component={Link} to={`/shop/${book.id}`}>Details</Button>
        </CardActions>
        </Card>
    );
}