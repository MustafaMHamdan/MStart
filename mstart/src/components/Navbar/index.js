import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { tokenContext } from "../../App";

import './style.css';

const Navbar = () => {
  const navigate = useNavigate();


  const isLoggedIn = useContext(tokenContext).isLoggedIn;
  const setIsLoggedIn = useContext(tokenContext).setIsLoggedIn;
  const roleSet = useContext(tokenContext).role;

  console.log(roleSet);


  const logOut = (event) => {
    event.preventDefault();
    setIsLoggedIn(false);
    localStorage.clear();
    navigate("/");
  };

  console.log("isLoggedIn:", isLoggedIn);
  console.log("role:", roleSet);


  return (
    <nav className="navbar">

      <div className="navbar-logo">Your Logo</div>
      <div className="navbar-links">
        <a href="/">Home</a>
        <a href="/available-deals">Available</a>




      </div>

      <div className="navbar-auth">



        {
          isLoggedIn ? (
            <>
              {roleSet == 1 ? (
                <>
                  <a href="/deals">Deals</a>
                  <a href="/users">Users</a>
                </>
              ) : (
                <> </>
              )}
              <a onClick={logOut} href="/">
                logout
              </a>
            
            </>
          ) : (
            <>
              <a href="/login">Login</a>
              <a href="/register">Register</a>
            </>
          )
        }

      </div>
    </nav>
  );
};

export default Navbar;
