import { Container, CssBaseline, ThemeProvider, createTheme, useTheme } from "@mui/material";
import Library from "../../features/library/Library";
import Header from "./Header";
import { useState } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(false);
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
        <Library />
      </Container>
    </ThemeProvider>
  );
}

export default App;
