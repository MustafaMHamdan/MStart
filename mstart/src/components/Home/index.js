import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
  
const Home = () => {
  const [active, setActive] = useState([]);

  const activeDeals = () => {
    axios
      .get(`http://localhost:5000/deal/active_deals`)
      .then((res) => {
        console.log(res.data.All_Active_Deals);
        setActive(res.data.All_Active_Deals);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    activeDeals();
  }, []);

  return (
    <>
      
      <div className="container">
        <h1>Welcome To Numany Deals</h1>
        <div className="active-deals-container">
          {active.map((deal) => (
            <div className="deal-item" key={deal.ID}>
              <h2>{deal.Name}</h2>
              <div className="image-container">
                <img src={deal.Photo} alt={deal.name} />
              </div>
              <p>{deal.Description}</p>
              <p>
                Amount: {deal.Amount} {deal.Currency}
              </p>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
