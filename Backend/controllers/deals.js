const connection = require("../models/db");

///////////////////////////////////////////////

const getAllActiveDeal = (req, res) => {
  const query = `SELECT * from  Deals where Status = ? `;
const data="Active"
  connection.query(query,data, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "server error*",
        err: err,
      });
    }

    res.status(201).json({
      success: true,

      All_Active_Deals: results,
    });
  });
};

///////////////////////////////////////////////////////////////
/* Name  ,Description,Photo*/
const claimDeal = (req, res) => {
  const userId = req.token.userId;
  const dealId = req.body.dealId;

  const getDealQuery = `SELECT Amount, Currency FROM Deals WHERE ID = ?;`;
  const claimDealQuery = `INSERT INTO ClaimedDeals (User_ID, Deal_ID, Amount, Currency) VALUES (?, ?, ?, ?);`;

  connection.query(getDealQuery, [dealId], (err, dealRows) => {
    if (err) {
      res.status(500).json({ error: "Failed to claim the deal." });
    } else if (dealRows.length === 0) {
      res.status(404).json({ error: "Deal not found." });
    } else {
      const amount = dealRows[0].Amount;
      const currency = dealRows[0].Currency;

      connection.query(
        claimDealQuery,
        [userId, dealId, amount, currency],
        (err, result) => {
          if (err) {
            res.status(500).json({ error: "Failed to claim the deal." });
          } else {
            res.status(200).json({ message: "Deal claimed successfully." });
          }
        }
      );
    }
  });
};

const getMyDeals = (req, res) => {
  const userId = req.token.userId;

  const getDealQuery = `SELECT Name  ,Description,Photo ,ClaimedDeals.Amount , ClaimedDeals.Currency ,User_ID FROM ClaimedDeals inner join deals on ClaimedDeals.Deal_ID=Deals.ID  WHERE User_ID = ?;`;

  connection.query(getDealQuery, [userId], (err, dealRows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (dealRows.length === 0) {
      res.status(404).json({ error: "There Is No Claimed Deals" });
    } else {
      return res.status(200).json({
        claimed_deals: dealRows,
      });
    }
  });
};

//////////////////////////////////////////////////

module.exports = {
  getAllActiveDeal,
  claimDeal,
  getMyDeals
};
