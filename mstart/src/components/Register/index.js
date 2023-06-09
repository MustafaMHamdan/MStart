import React, { useState } from 'react';
import './style.css';
import axios from "axios";
import { Image, CloudinaryContext } from 'cloudinary-react';


const Register = () => {
  const [Name, setName] = useState('');
  const [Phone, setPhone] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Gender, setGender] = useState('');
  const [DateOfBirth, setDateOfBirth] = useState('');
  const [Photo, setPhoto] = useState(null);
  const [PhotoURL, setPhotoURL] = useState('');

  const [message, setMessage] = useState("");
  const [isRegistered, setIsReg] = useState(false);


  const cloudinaryConfig = {
    cloudName: 'dnin1rp5m',
    apiKey: '156337559787927',
    apiSecret: 'U9ZLQkijS1duF-w4fEXChc-uxmY',
    unsignedUploadPreset: 'znoohgg2' // Replace with your unsigned preset name
  };





  const addUser = async (e) => {
    e.preventDefault();
    try {
      const dealData = {
        Name,
        Phone,
        Email,
        Password,
        Gender,
        DateOfBirth,
        Photo:PhotoURL,
      };

      if (Photo) {
        const formData = new FormData();
        formData.append('file', Photo);
        formData.append('upload_preset', cloudinaryConfig.unsignedUploadPreset);

        const cloudinaryResponse = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`, {
          method: 'POST',
          body: formData
        });

        if (cloudinaryResponse.ok) {
          const cloudinaryData = await cloudinaryResponse.json();
          console.log(cloudinaryData.url);
          setPhotoURL(cloudinaryData.url);
          dealData.Photo = cloudinaryData.url;
        } else {
          throw new Error('Failed to upload photo');
        }
      }

      const response = await axios.post("http://localhost:5000/user/register", dealData);

      console.log(response.data); // Deal creation response from the server

      // Reset form fields after successful submission
      setName('');
      setPhone('');
      setEmail('');
      setPassword('');
      setGender('');
      setDateOfBirth('');
      setPhoto(null);
      setPhotoURL('');
      setMessage('');

    } catch (error) {
      console.error(error);
      // Handle error here, show an error message, etc.
    }
  };











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
          id="photo"
          onChange={(e) => setPhoto(e.target.files[0])}
        />

        <button type="submit">Register</button>
      </form>
      <CloudinaryContext cloudName={cloudinaryConfig.cloudName}>
        {PhotoURL && (
          <div>
            <Image
              cloudName={cloudinaryConfig.cloudName}
              publicId={PhotoURL}
              format="jpg"
            />
          </div>
        )}
      </CloudinaryContext>
      {isRegistered
        ? message && <div className="SuccessMessage">{message}</div>
        : message && <div className="ErrorMessage">{message}</div>}
    </>
  );
};

export default Register;
