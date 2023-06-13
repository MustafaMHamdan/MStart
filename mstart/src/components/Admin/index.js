import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { tokenContext } from "../../App";

const Admin = () => {
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




    const allDeals = () => {

        axios
            .get(`http://localhost:5000/admin/allDeals`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log(res.data.All_Deals);

            })
            .catch((err) => {
                console.log(err);
            });

    }


    const claimedDeals = () => {

        axios
            .get(`http://localhost:5000/admin/allClaimedDeal`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log(res.data.Claimed_Deals);

            })
            .catch((err) => {
                console.log(err);
            });


    }


    useEffect(() => {
        getAllUsers();
        allDeals();
        claimedDeals()
    }, []);

    return (
        <>
            this is

        </>
    );
};

export default Admin;
