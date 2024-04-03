import { Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <Container>
            <Typography variant='h3'>
                Welcome to the Online Bookstore.
            </Typography>
            <Button component={Link} to={'/shop'}>
                Check out the shop 
            </Button>
        </Container>
    );
}