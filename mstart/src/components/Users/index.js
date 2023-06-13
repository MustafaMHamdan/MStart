import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { tokenContext } from "../../App";

const Users = () => {
    const { token, setToken } = useContext(tokenContext);




    const getAllUsers = () => {


        axios
            .get(`http://localhost:5000/admin/allUsers`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log(res.data.All_Users);

            })
            .catch((err) => {
                console.log(err);
            });
    };







    useEffect(() => {
        getAllUsers();

    }, []);

    return (
        <>
            this is Users

        </>
    );
};

export default Users;
