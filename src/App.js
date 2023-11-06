import { Routes, Route } from "react-router-dom";
import { useFirebase } from "./context/Firebase";
import Home from "./pages/Home";
import { useState } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Detail from "./pages/Detail";
import { Navbar } from "react-bootstrap";
import ViewOrders from "./pages/ViewOrders";

function App() {

  const firebase = useFirebase();

  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/list" element={<List />}/>
        <Route path="/book/orders" element={<Orders />}/>
        <Route path="/book/view/:bookId" element={<Detail />}/>
        <Route path="/books/orders/:bookId" element={<ViewOrders />}/>
      </Routes>
    </div>
  );
}

export default App;
