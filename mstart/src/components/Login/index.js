import React, { useState, useContext } from "react";
import axios from "axios";
import "./style.css";
import { tokenContext } from "../../App";
import { useNavigate } from "react-router-dom";
 
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  /*  const role = "6267d02ea176b5aa0ec732f0";
   */

  const setToken = useContext(tokenContext).setToken;
  const setIsLoggedIn = useContext(tokenContext).setIsLoggedIn;

  const navigate = useNavigate();

  const Log = () => {
    axios
      .post("./http://localhost:5000/login/", {
        email,
        password,
      })

      .then((result) => {
        console.log(result);

        localStorage.setItem("token", result.data.token);
        setToken(localStorage.getItem("token"));
        setIsLoggedIn(true);

       
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setMessage(err.response.data.message);
      });
  };

  return (
    <div className="log">
      <p>login</p>
      <input
        type={"text"}
        placeholder={"email"}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <br />
      <input
        type={"password"}
        placeholder={"password"}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      <br />
      <button onClick={Log}>Login</button>

      {message ? <p className="message">{message}</p> :  ""}
    </div>
  );
};

export default Login;