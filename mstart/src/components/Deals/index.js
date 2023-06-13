import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { tokenContext } from "../../App";

const Deals = () => {
    const { token, setToken } = useContext(tokenContext);





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







    useEffect(() => {
        allDeals();

    }, []);

    return (
        <>
            this is Deals

        </>
    );
};

export default Deals;
