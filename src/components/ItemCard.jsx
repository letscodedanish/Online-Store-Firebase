import React from "react";
import { useFirebase } from "../context/Firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ItemCard = (props) => {

    const firebase = useFirebase();
    const navigate = useNavigate();

    const [url, setURL] = useState(null);

    useEffect(() => {
        firebase.getImageURL(props.imageURL).then((url) => setURL(url));
    }, []);

    console.log(props);
    return (
        <div className="">
            {/* <div className="m-3">
                <div className=" inline-block   w-[500px] min-h-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <img className="mx-auto rounded-md w-[250px]  p-4 " src={url} alt=""  />
                 
                    <div className="p-5">
                        <a>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.name}</h5>
                        </a>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">This Product is Owned By :- {props.owner}</p>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">ISBN Number :- {props.isbn}</p>
                        <div class="flex items-center justify-between">
                            <span class="text-3xl font-bold text-gray-900 dark:text-white">${props.price}</span>
                            <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={e => navigate(`/book/view/${props.id}`)}>View</a>
                        </div>
                    </div>
                </div>
            </div> */}

            <div class="mt-8 ml-5 m-[50px] gap-2 relative flex flex-col text-black-700 bg-white shadow-lg w-96 rounded-xl bg-clip-border">
                <div class="relative h-56 mx-4 -mt-6 overflow-hidden text-black shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40">
                    <img
                        src={url}
                        alt="img-blur-shadow"
                        layout="fill"
                    />
                </div>
                <div class="p-6">
                    <h5 class="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                        {props.name}
                    </h5>
                    <p class="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                    This Product is Owned By :- {props.owner}
                    </p>
                    <p class="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                    ISBN Number :- {props.isbn}
                    </p>
                </div>
                <div class="p-6 pt-0">
                    <button onClick={e => navigate(`/book/view/${props.id}`)}
                        class="select-none rounded-lg bg-pink-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                        data-ripple-light="true"
                    >
                        Read More
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ItemCard;
