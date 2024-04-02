import { Card, CardMedia, CardContent, Typography, CardActions, Button, Divider } from "@mui/material";
import { Book } from "../../app/models/book";

interface Props {
    book: Book;
}

export default function BookDisplay({book}: Props) {
    return (
        <Card sx={{ maxWidth: 345, height: 600, mb: 10 }}>
        <CardMedia
            component="img"
            alt={book.name}
            height="300"
            image={book.pictureUrl}
            sx={{objectFit: 'contain', pt: 2}}
        />
        <CardContent>
            <Typography variant="h4" sx={{textAlign: 'center', fontSize: '1.6em'}}>
            {book.name}
            </Typography>
            <Typography variant="h6" sx={{fontWeight: 'normal', fontSize: '1em', textAlign: 'center'}}>
            {book.author}
            </Typography>
            <Typography gutterBottom variant="h6" sx={{textAlign: 'center'}}>
            ${(book.price/100)}
            </Typography>
            <Divider></Divider>
            <Typography variant="body2" color="text.secondary" sx={{height: 110, overflow: 'hidden'}}>
            {book.description}
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small">Add To Cart</Button>
            <Button size="small">Details</Button>
        </CardActions>
        </Card>
    );
}