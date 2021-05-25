import React from "react";
import Blogs from "./components/Blogs";
import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="container p-4">
      <div className="row">
        <Blogs />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
