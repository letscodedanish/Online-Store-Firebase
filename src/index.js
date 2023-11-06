import React from "react";
import ReactDOM from "react-dom/client";
import { FirebaseProvider } from "./context/Firebase";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import Navbar from "./components/Navbar";
import Footer from "./pages/Footer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <FirebaseProvider>
      <Navbar/>
        <App />
        <Footer/>
      </FirebaseProvider>
    </BrowserRouter>
  </React.StrictMode>
);
