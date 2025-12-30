import "./App.css";
import FileUploader from "./components/FileUploader";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <FileUploader
          multiple={true}
          onFileSelect={(files) => console.log(files)}
        />
      </main>
    </>
  );
}

export default App;
