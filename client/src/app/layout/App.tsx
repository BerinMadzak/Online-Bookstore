import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Header from "./Header";
import { useCallback, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "../store/configureStore";
import { getShoppingCartAsync } from "../../features/shoppingCart/shoppingCartSlice";
import { getCurrentUser } from "../../features/account/accountSlice";

function App() {
  const dispatch = useAppDispatch();

  const init = useCallback(async() => {
    try {
      await dispatch(getCurrentUser());
      await dispatch(getShoppingCartAsync());
    } catch(error: any) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    init();
  }, [init]);

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
