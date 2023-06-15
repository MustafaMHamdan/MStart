import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { tokenContext } from "../../App";
import "./style.css";

const Active = () => {
  const { token, setToken } = useContext(tokenContext);

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

  const claimDeal = (dealId) => {
    axios
      .post("http://localhost:5000/deal/claim-deal", { dealId },  {headers: {
        authorization: `Bearer ${token}`},
      })
      .then((res) => {
        console.log(res.data.message);
        setActive((prevActive) => {
          return prevActive.map((deal) => {
            if (deal.ID === dealId) {
              return { ...deal, claimed: true };
            }
            return deal;
          });
        });
      })
      .catch((err) => {
        console.log(err);
        // Handle the error appropriately
      });
  };

  useEffect(() => {
    activeDeals();
  }, []);

  return (
    <div className="active-deals-container">
      <h1>Enjoy Our Deals</h1>

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
          <button
            onClick={() => claimDeal(deal.ID)}
            disabled={deal.claimed}
          >
            {deal.claimed ? "Claimed" : "Claim"}
          </button>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Active;
