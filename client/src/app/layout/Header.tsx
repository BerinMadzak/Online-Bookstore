import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, Theme, Toolbar, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

interface Props {
    darkMode: boolean;
    setDarkMode: (value: boolean) => void;
}

export default function Header({darkMode, setDarkMode}: Props)
{
    return (
        <AppBar position="fixed">
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Box display='flex' alignItems='center'>
                        <Typography variant="h3">Online Bookstore</Typography>
                        <IconButton sx={{ml: 1}} onClick={() => setDarkMode(!darkMode)} color='inherit'>
                            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
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