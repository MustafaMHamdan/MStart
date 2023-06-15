import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { tokenContext } from "../../App";
import "./style.css"
const Profile = () => {
  const { token } = useContext(tokenContext);

  const [deals, setDeals] = useState([]);
  const [claimedDealsCount, setClaimedDealsCount] = useState(0);
  const [totalClaimedAmount, setTotalClaimedAmount] = useState(0);

  const myClaimedDeals = () => {
    axios
      .get(`http://localhost:5000/deal/My_deals`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.claimed_deals);
        setDeals(res.data.claimed_deals);
        calculateClaimedDealsStats(res.data.claimed_deals);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const calculateClaimedDealsStats = (claimedDeals) => {
    let count = claimedDeals.length;
    let totalAmount = 0;
    claimedDeals.forEach((deal) => {
      totalAmount += parseFloat(deal.Amount);
    });
    setClaimedDealsCount(count);
    setTotalClaimedAmount(totalAmount);
  };

  useEffect(() => {
    myClaimedDeals();
  }, []);

  return (
    <div className="active-deals-container">
      <h2>Claimed Deals:</h2>
      <p>Count: {claimedDealsCount}</p>
      <p>Total Amount: {parseFloat(totalClaimedAmount).toFixed(2)}</p>

      {deals.map((deal) => (
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
  );
};

export default Profile;
