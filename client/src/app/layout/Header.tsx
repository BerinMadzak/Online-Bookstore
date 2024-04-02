import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, Toolbar, Typography } from "@mui/material";

export default function Header()
{
    return (
        <AppBar position="fixed">
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Box display='flex' alignItems='center'>
                        <Typography variant="h3">Online Bookstore</Typography>
                </Box>
                <Box display='flex' alignItems='center'>
                    <IconButton size='large' sx={{mr: 2}}>
                        <Badge badgeContent='0' color='secondary'>
                            <ShoppingCart sx={{color: 'white'}}/>
                        </Badge>
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
}