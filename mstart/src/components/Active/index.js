import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { tokenContext } from "../../App";

const Active = () => {
    const { token, setToken } = useContext(tokenContext);

  
    const { active, setActive } = useState([])



    const activeDeals = () => {

        axios
            .get(`http://localhost:5000/deal/active_deals`, {

            })
            .then((res) => {
                console.log(res.data.All_Active_Deals);
                setActive(res.data.All_Active_Deals)
                    ()
            })
            .catch((err) => {
                console.log(err);
            });

    }









    useEffect(() => {

        activeDeals()
    }, []);

    return (
        <>
            This is Active Deals for user

        </>
    );
};

export default Active;
