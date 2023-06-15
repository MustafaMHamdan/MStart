import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { tokenContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { Image, CloudinaryContext } from 'cloudinary-react';
import "./style.css";

const Deals = () => {
  const { token, setToken } = useContext(tokenContext);
  const [deals, setDeals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dealsPerPage] = useState(10);
  const navigate = useNavigate();

  const fetchDeals = async () => {
    try {
      const response = await axios.get("http://localhost:5000/admin/allDeals", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setDeals(response.data.All_Deals);
    } catch (error) {
      console.log(error);
    }
  };

  const addNewDeal = () => {
    navigate("/add-deal");
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  // Get current deals for pagination
  const indexOfLastDeal = currentPage * dealsPerPage;
  const indexOfFirstDeal = indexOfLastDeal - dealsPerPage;
  const currentDeals = deals.slice(indexOfFirstDeal, indexOfLastDeal);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <button onClick={addNewDeal}>Add New Deal</button>
      <div>
        {currentDeals.map((deal, index) => (
          <div key={index}>
            <p>Name: {deal.Name}</p>
            <p>Description: {deal.Description}</p>
            <p>Status: {deal.Status}</p>
            <p>Amount: {deal.Amount}</p>
            <p>Currency: {deal.Currency}</p>
            {deal.Photo && (
              <CloudinaryContext cloudName="dnin1rp5m">
                <div className="cloudinary-image">
                  <Image
                    cloudName="dnin1rp5m"
                    publicId={deal.Photo}
                    // Adjust the height as per your requirement
                    crop="fit"
                    alt="Deal Photo"
                  />
                </div>
              </CloudinaryContext>
            )}
            <hr />
          </div>
        ))}
      </div>
      {/* Pagination */}
      <ul className="pagination">
        {Array.from({ length: Math.ceil(deals.length / dealsPerPage) }).map(
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

export default Deals;
