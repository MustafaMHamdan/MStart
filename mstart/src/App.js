import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Admin from "./components/Admin";
 import Users from "./components/Users";
 import Deals from "./components/Deals";
import React, { useState, createContext } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
export const tokenContext = createContext();

const App = () => {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [token, setToken] = useState("");


   if (!token && localStorage.getItem("token")) {
      // console.log("local storage");
      setToken(localStorage.getItem("token"));
      setIsLoggedIn(true);
   }
   console.log(isLoggedIn);

   return (

      <div className='container'>

         <tokenContext.Provider    value={{ token, setToken, isLoggedIn, setIsLoggedIn }}>
         <Navbar />
            <Routes>


            <Route path="/users" element={<Users />} />
            <Route path="/deals" element={<Deals />} />

            <Route path="/"   element={<Home />} />
               <Route path="/register" element={<Register />} />
               <Route path="/login" element={<Login />} />
               <Route path="/admin" element={<Admin />} />


            </Routes>
         </tokenContext.Provider>
      </div>


   )



};

export default App;