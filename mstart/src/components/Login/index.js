import React, { useState,useContext } from 'react';
import './style.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { tokenContext } from "../../App";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState("");
  const [isRegistered, setIsReg] = useState(false);


  const setToken = useContext(tokenContext).setToken;
  const setIsLoggedIn = useContext(tokenContext).setIsLoggedIn;
  const navigate = useNavigate();

  
  const login = (e) => {
    
    e.preventDefault();
    axios
      .post("http://localhost:5000/user/login", {

        email,
        password,

      })
      .then((result) => {

     console.log(result.data.Role_ID);

        localStorage.setItem("token", result.data.token);
        localStorage.setItem("Role", result.data.Role_ID);

        setToken(localStorage.getItem("token"));
        setIsLoggedIn(true);

        navigate("/");
      })
      .catch((err) => {
        console.log(err.response.data.message
          );
        setMessage(err.response.data.message);
        setIsReg(false);
      });
  }



  return (
    <>
    <form className="login-form" onSubmit={login}>
      <h2>Login</h2>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Login</button>
    </form>
    {message ? <p className="message">{message}</p> : ""}

    </>
    
  );
};

export default Login;
