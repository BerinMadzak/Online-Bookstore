import { Container, CssBaseline, ThemeProvider, createTheme, useTheme } from "@mui/material";
import Library from "../../features/library/Library";
import Header from "./Header";
import { useState } from "react";
import { Outlet } from "react-router-dom";

function App() {
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
