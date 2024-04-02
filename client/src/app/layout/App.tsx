import { Container, CssBaseline } from "@mui/material";
import Library from "../../features/library/Library";
import Header from "./Header";

function App() {
  return (
    <>
      <CssBaseline />
      <Header />
      <Container sx={{mt: 10}}>
        <Library />
      </Container>
    </>
  );
}

export default App;
