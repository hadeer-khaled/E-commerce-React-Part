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
      <h1 className="text-3xl font-bold underline">Theme Switcher!</h1>
      <button className="btn btn-primary m-2" data-set-theme="" data-act-class="ACTIVECLASS">light</button>
      <button className="btn btn-primary m-2" data-set-theme="dark" data-act-class="ACTIVECLASS">dark</button>
      <button className="btn btn-primary m-2" data-set-theme="synthwave" data-act-class="ACTIVECLASS">synthwave</button>
      <button className="btn btn-primary m-2" data-set-theme="bumblebee" data-act-class="ACTIVECLASS">bumblebee</button>
      <button className="btn btn-primary m-2" data-set-theme="black" data-act-class="ACTIVECLASS">black</button>

      <select data-choose-theme className="dropdown">
        <option value="">Default</option>
        <option value="dark">Dark</option>
        <option value="synthwave">synthwave</option>
        <option value="bumblebee">bumblebee</option>
        <option value="black">black</option>
      </select>

      <button className="btn btn-info m-2"
        data-toggle-theme="dark,light"
        data-act-class="ACTIVECLASS"
      >dark/light</button>

      <div className="App" data-choose-theme>{/* <RouterProvider router={router} /> */}</div>
    </>
  );
}

export default App;
