import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";

import React, { useState, createContext } from "react";
import { Routes, Route, Link } from "react-router-dom";
 export const tokenContext = createContext();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  // console.log("the token is", token);

  if (!token && localStorage.getItem("token")) {
    // console.log("local storage");
    setToken(localStorage.getItem("token"));
    setIsLoggedIn(true);
  }

  // console.log(isLoggedIn);
  return (
    <div className="App">
      <tokenContext.Provider
        value={{ token, setToken, isLoggedIn, setIsLoggedIn }}
      >
        <h1>Welcome To APP</h1>

     
        <Routes>
          <Route path="/Register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </tokenContext.Provider>
    </div>
  );
};

export default App;
