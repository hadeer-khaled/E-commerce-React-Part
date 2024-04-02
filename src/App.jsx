import { RouterProvider } from "react-router-dom";
import router from "./router";
import "./App.css";
import { useEffect } from "react";
import { themeChange } from "theme-change";

function App() {



  useEffect(() => {
    themeChange(false);
    // 👆 false parameter is required for react project
  }, []);

  return (
    <>
      <div className="App" data-choose-theme>
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
