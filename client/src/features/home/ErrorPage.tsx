import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function ErrorPage() {
    return (
        <>
            <Typography variant="h3">Page does not exist!</Typography>
            <Button component={Link} to='/'>Go Back</Button>
        </>
    );
}