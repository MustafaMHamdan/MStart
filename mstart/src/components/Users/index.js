import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { tokenContext } from "../../App";
import { Image, CloudinaryContext } from 'cloudinary-react';
import "./style.css";

const Users = () => {
  const { token, setToken } = useContext(tokenContext);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [Status, setStatus] = useState("");
  
  const getAllUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/admin/allUsers", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data.All_Users);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/admin/user/${id}`, {
        headers: {
          authorization: `Bearer ${token}`
        },
      });
      getAllUsers();
    } catch (error) {
      console.log(error);
    }
  }

  const changeUserStatus = async (id, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/admin/user/${id}`,
        { Status: newStatus },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      getAllUsers();
      console.log(id, newStatus);
    } catch (error) {
      console.log(error);
    }
  };
  

  const [userStatuses, setUserStatuses] = useState({});

  const handleStatusChange = (e, userId) => {
    const { value } = e.target;
    setUserStatuses((prevStatuses) => ({
      ...prevStatuses,
      [userId]: value,
    }));
  };
  

  useEffect(() => {
    getAllUsers();
  }, []);

  // Get current users for pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {currentUsers.map((user, index) => (
        <div key={index}>
          <p>Name: {user.Name}</p>
          <p>Phone: {user.Phone}</p>
          <p>Email: {user.Email}</p>
          <p>Birth Date: {user.Date_Of_Birth}</p>
          <p>Gender: {user.Gender}</p>
          <p>Status: {user.Status}</p>
          {user.Photo && (
            <CloudinaryContext cloudName="dnin1rp5m">
              <div className="cloudinary-image">
                <Image
                  cloudName="dnin1rp5m"
                  publicId={user.Photo}
                  // Adjust the height as per your requirement
                  crop="fit"
                  alt="User Photo"
                />
              </div>
            </CloudinaryContext>
          )}
          <button onClick={() => deleteUser(user.ID)}>Delete</button>
          <select
  id="Status"
  value={userStatuses[user.ID] || ""}
  onChange={(e) => handleStatusChange(e, user.ID)}
>
  <option value="Active">Active</option>
  <option value="Inactive">Inactive</option>
  <option value="Deleted">Deleted</option>
  <option value="Expired">Expired</option>
</select>
<button onClick={() => changeUserStatus(user.ID, userStatuses[user.ID])}>
  Update
</button>


          <hr />
        </div>
      ))}

      {/* Pagination */}
      <ul className="pagination">
        {Array.from({ length: Math.ceil(users.length / usersPerPage) }).map(
          (_, index) => (
            <li key={index}>
              <button onClick={() => paginate(index + 1)}>{index + 1}</button>
            </li>
          )
        )}
      </ul>
    </>
  );
};

export default Users;
