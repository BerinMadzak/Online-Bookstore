import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Link } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";
import SignedInMenu from "./SignedInMenu";

interface Props {
    darkMode: boolean;
    setDarkMode: (value: boolean) => void;
}

export default function Header({darkMode, setDarkMode}: Props)
{
    const {user} = useAppSelector(state => state.account);
    const {shoppingCart} = useAppSelector(state => state.shoppingCart);
    const itemCount = shoppingCart?.items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <AppBar position="fixed">
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Box display='flex' alignItems='center'>
                        <Button component={Link} to={'/'}>
                            <Typography variant="h3" sx={{color: 'white', textTransform: 'none'}}>Online Bookstore</Typography>
                        </Button>
                        <IconButton sx={{ml: 1}} onClick={() => setDarkMode(!darkMode)} color='inherit'>
                            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                </Box>
                <Box display='flex' alignItems='center'>
                    <IconButton component={Link} to='/shoppingCart' size='large' sx={{mr: 2}}>
                        <Badge badgeContent={itemCount} color='secondary'>
                            <ShoppingCart sx={{color: 'white'}}/>
                        </Badge>
                    </IconButton>
                    {user ? <SignedInMenu /> : <Button component={Link} to='/login'>Login</Button>}
                    
                </Box>
            </Toolbar>
        </AppBar>
    );
}