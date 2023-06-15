import React, { useState, useContext } from "react";
import axios from "axios";
import { tokenContext } from "../../App";
import { Image, CloudinaryContext } from 'cloudinary-react';
import "./style.css"

const AddDeal = () => {
  const [Name, setName] = useState('');
  const [Description, setDescription] = useState('');
  const [Status, setStatus] = useState('');
  const [Amount, setAmount] = useState('');
  const [Currency, setCurrency] = useState('');
  const [Photo, setPhoto] = useState(null);
  const [PhotoURL, setPhotoURL] = useState('');

  const [message, setMessage] = useState("");
  const { token, setToken } = useContext(tokenContext);

  const cloudinaryConfig = {
    cloudName: 'dnin1rp5m',
    apiKey: '156337559787927',
    apiSecret: 'U9ZLQkijS1duF-w4fEXChc-uxmY',
    unsignedUploadPreset: 'znoohgg2' // Replace with your unsigned preset name
  };

  const addDeal = async (e) => {
    e.preventDefault();
    try {
      const dealData = {
        Name,
        Description,
        Status,
        Amount,
        Currency,
        Photo: PhotoURL,
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

      const response = await axios.post("http://localhost:5000/admin/deal", dealData, {
        headers: { authorization: `Bearer ${token}` }
      });

      console.log(response.data); // Deal creation response from the server

      // Reset form fields after successful submission
      setName('');
      setDescription('');
      setStatus('');
      setAmount('');
      setCurrency('');
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
      <form className="register-form" onSubmit={addDeal}>
        <h2>Add Deal</h2>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={Name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="Description">Description:</label>
        <input
          type="text"
          id="Description"
          value={Description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label htmlFor="Status">Status:</label>
        <select id="Status" value={Status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Deleted">Deleted</option>
          <option value="Expired">Expired</option>
        </select>

        <label htmlFor="Amount">Amount:</label>
        <input
          type="number"
          id="Amount"
          value={Amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <label htmlFor="Currency">Currency:</label>
        <input
          type="text"
          id="Currency"
          value={Currency}
          onChange={(e) => setCurrency(e.target.value)}
        />

        <label htmlFor="photo">Photo:</label>
        <input
          type="file"
          id="photo"
          onChange={(e) => setPhoto(e.target.files[0])}
        />

        <button type="submit">Add Deal</button>
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
    </>
  );
};

export default AddDeal;
