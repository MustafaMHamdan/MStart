import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { tokenContext } from "../../App";

const Claimed = () => {
  const { token, setToken } = useContext(tokenContext);
  const [deals, setDeals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchUserId, setSearchUserId] = useState("");
  const [filteredDeals, setFilteredDeals] = useState([]);
  const [dealsPerPage] = useState(10);

  const fetchClaimedDeals = (page) => {
    axios
      .get(`http://localhost:5000/admin/allClaimedDeal `, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.Claimed_Deals);
        setDeals(res.data.Claimed_Deals);
        setTotalPages(Math.ceil(res.data.Claimed_Deals.length / dealsPerPage));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchClaimedDeals(currentPage);
  }, [currentPage]);

  const handleSearch = () => {
    const filtered = deals.filter((deal) =>
      deal.User_ID.toString() === searchUserId
    );
    setFilteredDeals(filtered);
    setTotalPages(Math.ceil(filtered.length / dealsPerPage));
    setCurrentPage(1); // Reset current page to 1 after search
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Get current deals for pagination
  const indexOfLastDeal = currentPage * dealsPerPage;
  const indexOfFirstDeal = indexOfLastDeal - dealsPerPage;
  const currentDeals = filteredDeals.slice(indexOfFirstDeal, indexOfLastDeal);

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by User ID"
          value={searchUserId}
          onChange={(e) => setSearchUserId(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="active-deals-container">
        {currentDeals.map((deal) => (
          <div className="deal-item" key={deal.ID}>
            <h2>{deal.Name}</h2>
            <div className="image-container">
              <img src={deal.Photo} alt={deal.name} />
            </div>
            <p>{deal.Description}</p>
            <p>
              Amount: {deal.Amount} {deal.Currency}
            </p>
            <p>Claimed By User With ID {deal.User_ID}</p>
            <hr />
          </div>
        ))}
      </div>

      <ul className="pagination">
        {Array.from({ length: totalPages }).map((_, index) => (
          <li key={index}>
            <button
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Claimed;
