import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { Button, Fade, Menu, MenuItem } from "@mui/material";
import { signOut } from "../../features/account/accountSlice";
import { clearShoppingCart } from "../../features/shoppingCart/shoppingCartSlice";

export default function SignedInMenu() {
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(state => state.account);
    const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorElement);

    const handleClick = (event: any) => {
        setAnchorElement(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorElement(null);
    }

    return (
        <>
            <Button color="inherit" onClick={handleClick} sx={{typography: "h6"}}>{user?.email}</Button>
            <Menu anchorEl={anchorElement} open={open} onClose={handleClose} TransitionComponent={Fade}>
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Orders</MenuItem>
                <MenuItem onClick={() => {
                    dispatch(signOut());
                    dispatch(clearShoppingCart());
                }}>Logout</MenuItem>
            </Menu>  
        </>
    );
}