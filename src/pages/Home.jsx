import React from "react";
import apple from "../assets/apple-watch.png"
import Form from "react-bootstrap/Form"
import { useFirebase } from "../context/Firebase";
import { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";

const Home = () => {
    const firebase = useFirebase();

    const [items, setItems] = useState([]);

    useEffect(() => {
        firebase.listAllItems().then((items) => setItems(items.docs));
    }, []);
    return (
        <div className="flex-column grid grid-cols-3 w-[100%]">
            {items.map((item) => (
                <ItemCard
                    link={`/book/${item.id}`}
                    key={item.id}
                    id={item.id}
                    {...item.data()}
                />
            ))}
        </div>
    );
};

export default Home;
