import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material";
import { theme } from "./theme";
import FileUploader from "./components/FileUploader";
import Navbar from "./components/Navbar";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Box component="main" sx={{ paddingBottom: 4 }}>
        <FileUploader
          multiple={true}
          onFileSelect={(files) => console.log(files)}
        />
      </Box>
    </ThemeProvider>
  );
}

export default App;
