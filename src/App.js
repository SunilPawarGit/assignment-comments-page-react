import { Toaster } from "react-hot-toast";
import "./App.css";
import MainPage from "./Components";

function App() {
  return (
    <div className="App">
      <Toaster
        position="top-right"
        toastOptions={{
          timeOut: 6000,
        }}
      />
      <MainPage />
    </div>
  );
}

export default App;
