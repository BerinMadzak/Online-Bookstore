import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Header from "./Header";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { getCookie } from "../utility/utility";
import agent from "../agent";
import { useAppDispatch } from "../store/configureStore";
import { setShoppingCart } from "../../features/shoppingCart/shoppingCartSlice";
import { getCurrentUser } from "../../features/account/accountSlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const customerId = getCookie('customerId');
    dispatch(getCurrentUser());
    if(customerId){
      agent.ShoppingCart.get()
        .then(cart => dispatch(setShoppingCart(cart)))
        .catch(error => console.log(error));
    }
  }, [dispatch]);

  const [darkMode, setDarkMode] = useState(true);
  const themeStyle = darkMode ? 'dark' : 'light';

  const theme = createTheme({
    palette: {
      mode: themeStyle
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <Container sx={{mt: 10}}>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default App;
