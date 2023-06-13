import React, { useState } from 'react';
import './style.css';
import axios from "axios";

const Register = () => {
  const [Name, setName] = useState('');
  const [Phone, setPhone] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Gender, setGender] = useState('');
  const [DateOfBirth, setDateOfBirth] = useState('');
  const [Photo, setPhoto] = useState(null);

  const [message, setMessage] = useState("");
  const [isRegistered, setIsReg] = useState(false);


  const addUser = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/user/register", {
        Name,
        Phone,
        Email,
        Password,
        Gender,
        DateOfBirth,
        Photo,
      })
      .then((result) => {
        
console.log(result.data.message);
        setMessage(result.data.message);
        setIsReg(true);
      })
      .catch((err) => {
         setMessage(err.response.data.message);
        setIsReg(false);
      });
  }


   

 


 


  return (
    <>
    <form className="register-form" onSubmit={addUser}>
      <h2>Register</h2>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        value={Name}
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="phone">Phone:</label>
      <input
        type="text"
        id="phone"
        value={Phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={Email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={Password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <label htmlFor="gender">Gender:</label>
      <select id="gender" value={Gender} onChange={(e) => setGender(e.target.value)}>
        <option value="">Select gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <label htmlFor="dateOfBirth">Date of Birth:</label>
      <input
        type="date"
        id="dateOfBirth"
        value={DateOfBirth}
        onChange={(e) => setDateOfBirth(e.target.value)}
      />

      <label htmlFor="photo">Photo:</label>
      <input
        type="file"
        id="photo" //append('photo', selectedFile);
        onChange={(e) => setPhoto(URL.createObjectURL(e.target.files[0]))}//
      />

      <button type="submit">Register</button>
    </form>
    {isRegistered
              ? message && <div className="SuccessMessage">{message}</div>
              : message && <div className="ErrorMessage">{message}</div>}
    </>
  );
};

export default Register;
