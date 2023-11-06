import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    query,
    where,
    deleteDoc,
  } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const FirebaseContext = createContext(null);

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDh2f-uBKBJxm4uH15LCTBTUY4cYtw62-s",
    authDomain: "react-firebase-project-509a5.firebaseapp.com",
    projectId: "react-firebase-project-509a5",
    storageBucket: "react-firebase-project-509a5.appspot.com",
    messagingSenderId: "323849824897",
    appId: "1:323849824897:web:62327609ec6ab67bf9fb80"
};

//Custom hook
export const useFirebase = () => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

const googleProvider = new GoogleAuthProvider();

//this is the function from where we are passing all the 
//function above into multiple components
export const FirebaseProvider = (props) =>{

    const [user,setUser] = useState(null);
    useEffect(()=>{
        onAuthStateChanged(firebaseAuth,(user) => {
            if(user) setUser(user);
            else setUser(null);
        });
    },[]);

    //Register
    const signupUserWithEmailAndPassword = (email,password) =>
        createUserWithEmailAndPassword(firebaseAuth,email,password);
    
    //Login
    const singinUserWithEmailAndPass = (email, password) =>
        signInWithEmailAndPassword(firebaseAuth, email, password);

    const signInWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);

    console.log(user);
    
    const handleCreateNewListing = async(name,owner,isbn,price,cover) =>{
        const imageRef = ref(storage, `uploads/images/${Date.now()}-${cover.name}`);
        const uploadResult = await uploadBytes(imageRef, cover);
        return await addDoc(collection(firestore, "books"), {
            name,
            owner,
            isbn,
            price,
            imageURL: uploadResult.ref.fullPath,
            userID: user.uid,
            userEmail: user.email,
            photoURL: user.photoURL,
        });
    };

    const listAllItems = () =>{
        return getDocs(collection(firestore, "books"));
    }

    const getItemById = async (id) => {
        const docRef = doc(firestore, "books", id);
        const result = await getDoc(docRef);
        return result;
      };

    const getImageURL = (path) => {
        return getDownloadURL(ref(storage, path));
    };

    const placeOrder = async (bookId) => {
        const collectionRef = collection(firestore, "books", bookId, "orders");
        const result = await addDoc(collectionRef, {
          userID: user.uid,
          userEmail: user.email,
        });
        return result;
    };

    const fetchMyBooks = async (userId) => {
        const collectionRef = collection(firestore, "books");
        const q = query(collectionRef, where("userID", "==", userId));
    
        const result = await getDocs(q);
        return result;
    };

    const getOrders = async (bookId) => {
        const collectionRef = collection(firestore, "books", bookId, "orders");
        const result = await getDocs(collectionRef);
        return result;
    };

    const deleteItem = async(bookId) =>{
        await deleteDoc(doc(firestore, "books", bookId));
    }
    

    const Logout = () => signOut(firebaseAuth)

    const isLoggedIn = user ? true : false;

    return(
        <FirebaseContext.Provider value={{
            deleteItem,
            getOrders,
            fetchMyBooks,
            placeOrder,
            getItemById,
            getImageURL,
            listAllItems,
            handleCreateNewListing,
            signupUserWithEmailAndPassword, 
            singinUserWithEmailAndPass, 
            signInWithGoogle, 
            isLoggedIn, 
            Logout
        }}
        >{props.children}
        </FirebaseContext.Provider>
    );
};