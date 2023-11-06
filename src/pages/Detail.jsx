import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Detail = () => {
    const params = useParams();
    const firebase = useFirebase();
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [url, setURL] = useState(null);
    console.log(data);

    useEffect(() => {
        firebase.getItemById(params.bookId).then((value) => setData(value.data()));
    }, []);

    useEffect(() => {
        if (data) {
            const imageURL = data.imageURL;
            firebase.getImageURL(imageURL).then((url) => setURL(url));
        }
    }, [data]);

    const placeOrder = async () => {
        const result = await firebase.placeOrder(params.bookId);
        console.log("Order Placed", result);
        toast.success('Your order has been placed!');
    };

    const delItem = () =>{
        firebase.deleteItem(params.bookId).then(()=>{navigate("/")});
        toast.success("Item Removed!!")
    }

    if (data == null) return <h1>Loading...</h1>;

    return (
        <div className="mt-4 mx-auto">
            <div class="relative w-[50%] mx-auto flex flex-col text-black-700 bg-white shadow-md  rounded-xl bg-clip-border">
                <div class="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white h-96 rounded-xl bg-clip-border">
                    <img
                        src={url}
                        class="object-contain w-full h-full"
                    />
                </div>
                <div class="p-6">
                    <div class="flex items-center justify-between mb-2">
                        <p class="block text-[30px] font-sans  antialiased font-medium leading-relaxed text-blue-gray-900">
                            {data.name}
                        </p>
                        <p class="block font-sans text-base antialiased leading-relaxed text-blue-gray-900 font-bold">
                            ${data.price}.00
                        </p>
                    </div>
                    <h3>Owner Details</h3>
                    <p class="block font-sans text-sm antialiased font-semibold leading-normal text-black opacity-75">
                        Email : {data.userEmail} <br />
                        Owner of this Item is {data.owner} <br />
                        ISBN Number is {data.isbn}
                    </p>
                </div>

                <div class="p-6 pt-0 flex justify-between">
                    <button onClick={placeOrder}
                        class="block w-[40%] select-none rounded-lg bg-pink-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                    >
                        Buy Now
                    </button>

                    <button onClick={delItem}
                        class="block w-[40%] select-none rounded-lg bg-pink-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                    >
                        Remove
                    </button>
                </div>
            </div>

        </div>
    );
};

export default Detail;
