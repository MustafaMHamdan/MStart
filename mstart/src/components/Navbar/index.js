import { React, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { tokenContext } from "../../App";

import './style.css';

const Navbar = () => {
  const navigate = useNavigate();

 
    const isLoggedIn = useContext(tokenContext).isLoggedIn;
  const setIsLoggedIn = useContext(tokenContext).setIsLoggedIn;
  const setToken = useContext(tokenContext).setToken;

  const logOut=(event)=>{ localStorage.removeItem('token');
  event.preventDefault();
  localStorage.removeItem('token');
  setIsLoggedIn(false);
  
  navigate("/");
} 

  return (
    <nav className="navbar">

      <div className="navbar-logo">Your Logo</div>
      <div className="navbar-links">
        <a href="/">Home</a>
        <a href="/admin">Users</a>
        <a href="/contact">Contact</a>
      </div>

      <div className="navbar-auth">
     
       {
        isLoggedIn ?( <> 
        
        <a onClick={logOut} href="/" >logout</a>
           <a href="/register">Register</a> 
       </>):( 
          <> 
          <a href="/login">Login</a>
          <a href="/register">Register</a> </>)

       }
      
      


      </div>
    </nav>
  );
};

export default Navbar;
