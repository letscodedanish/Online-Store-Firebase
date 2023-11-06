import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFirebase } from "../context/Firebase";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const firebase = useFirebase();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] =  useState("");
    const notify = () => toast.success("User Logged In...");

    useEffect(() => {
        if (firebase.isLoggedIn) {
          // navigate to home
          navigate("/");
        }
      }, [firebase, navigate]);

    const handleSubmit = async(e) =>{
        e.preventDefault();
        console.log("Signin in a user...");
        const result = await firebase.singinUserWithEmailAndPass(email,password);
        console.log("Successfully Signed In", result); 
    }

    
    return (
        <div className="w-[500px] mx-auto mt-[100px] mb-[100px]">
            <form onSubmit={handleSubmit}
            className="border-black border-x border-y p-10 bg-black" >
            <h1 className="text-white mx-auto mb-5 font-semibold text-[50px]" >Login</h1>
            <div className="mb-6">
                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your email" required
                onChange={e => setEmail(e.target.value)}
                value={email}
                />
            </div>
            <div className="mb-6">
                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required placeholder="Enter your password"
                onChange={e => setPassword(e.target.value)}
                value={password}
                />
            </div>

            <div className="mb-6">
                <p className="text-white text-sm">Dont have an account? <Link to="/register"><span className="font-bold">signup</span></Link> </p>
            </div>
          
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={notify}
            >Login</button>
            <ToastContainer />

            <p className="text-white mt-4 mb-6">-------------------------OR---------------------</p>
            <button type="submit" className="text-black  relative left-[100px] bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                onClick={firebase.signInWithGoogle}
            >Sign In With Google</button>
            </form>
    
        </div>
    
      );
};

export default Login;
