import React from "react";
import ItemCard from "../components/ItemCard";
import { useFirebase } from "../context/Firebase";
import { useState, useEffect } from "react";
import ViewOrders from "./ViewOrders";
import { useParams } from "react-router-dom";


const Orders = () => {
  const firebase = useFirebase();
  const params = useParams();
  const [books, setBooks] = useState([]);
  
  // useEffect(() => {
  //   if (firebase.isLoggedIn)
  //     firebase
  //       .getOrders()
  //       ?.then((books) => setBooks(books.docs));
  // }, [firebase]);

  

  // useEffect(() => {
  //   firebase.getOrders(params.booksId).then((books) => setBooks(books.docs));
  // }, []);


  if (!firebase.isLoggedIn) return <h1>Please log in</h1>;

  return (
    <div>
      <h1 className="text-black flex ml-[600px] font-bold text-[80px]">Your Orders</h1>
      {books.map((book) => (
        <ViewOrders
          key={book.id}
          id={book.id}
          {...book.data()}
        />
      ))}
    </div>
  );
};

export default Orders;
