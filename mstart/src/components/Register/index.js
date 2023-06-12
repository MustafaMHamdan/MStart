import React, { useState } from "react";
import axios from "axios";
import "./style.css"
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");

  const [message, setMessage] = useState("");
  const [isRegistered, setIsReg] = useState(false);

  
  const role = "62769358f12d69b1f3f8196a";

  const addUser = () => {
    axios
      .post("./http://localhost:5000/users/", {
        email,
        password,
        country,
        lastName,
        firstName,
        age,
        role,
      })
      .then((result) => {
        
        setMessage(result.data.message);
        setIsReg(true);
      })
      .catch((err) => {
       
        setMessage(err.response.data.message);
        setIsReg(false);
      });
  };
  return (
    <div className="reg">
      Register
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
      <input
        type={"text"}
        placeholder={"country"}
        onChange={(e) => {
          setCountry(e.target.value);
        }}
      />
      <br />
      <input
        type={"number"}
        placeholder={"age"}
        onChange={(e) => {
          setAge(e.target.value);
        }}
      />
      <br />
      <input
        type={"text"}
        placeholder={"first name"}
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
      />
      <br />
      <input
        type={"text"}
        placeholder={"last name"}
        onChange={(e) => {
          setLastName(e.target.value);
        }}
      />
      <br />
      <button onClick={addUser}>Register</button>

      <p className={isRegistered ? "successful" : "error"}>{message}</p>
    </div>
  );
};

export default Register;