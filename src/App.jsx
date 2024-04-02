import { RouterProvider } from "react-router-dom";
import router from "./router";
// import "./App.css";
import './output.css'

function App() {
  return (
    <>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
