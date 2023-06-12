
const connection = require("../models/db");




const getAllUsers = (req, res) => {
  const query = `SELECT * from  Users `;

  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "server error*",
        err: err,
      });
    }

    res.status(201).json({
      success: true,

      All_Deals: results,
    });
  });
};

const getUserById = (req, res) => {
  const id = req.params.id;
  const query = `SELECT * from  Users WHERE ID=? `;
  const data = [id];
  connection.query(query, data, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "server error*",
        err: err,
      });
    }

    res.status(201).json({
      success: true,

      User: results,
    });
  });
};

const deleteUser = (req, res) => {
  const id = req.params.id;

  const query = `UPDATE Users SET Update_DateTime_UTC=CURRENT_TIMESTAMP , Is_Deleted=1 ,Status=? WHERE ID = ? `;
  const data = [ "Deleted" ,id];

  connection.query(query, data, (err, results) => {
    console.log(data);
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "server error*",
        err: err,
      });
    }

    res.status(201).json({
      success: true,
      Message: "the user has been deleted ",
      results: results,
    });
  });
};

const addNewDeal = (req, res) => {
  const { Name, Description, Status, Amount, Currency,Photo } = req.body;
  const query = `INSERT INTO Deals (Name,Description,Status,Amount,Currency,Photo) VALUES (?,?,?,?,?,?)`;
  const data = [Name, Description, Status, Amount, Currency,Photo];

  connection.query(query, data, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "server error*",
        err: err,
      });
    }

    res.status(201).json({
      success: true,
      massage: "Success Deal Added",
      results: results,
    });
  });
};

////////////////////////////////////////////////////////
const getAllDeal = (req, res) => {
  const query = `SELECT * from  Deals `;

  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "server error*",
        err: err,
      });
    }

    res.status(201).json({
      success: true,

      All_Deals: results,
    });
  });
};

//////////////////////////////////////////////////////

const update_deal = (req, res) => {
  const id = req.params.id;

  const { Name, Description, Status, Amount, Currency, Photo } = req.body;

  const query = `SELECT * FROM Deals WHERE ID = ?`;
  const data = [id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Server Error", err: err });
    }
    /* Name,Description,Status,Amount,Currency */
    const update_Name = Name || result[0].Name;
    const update_Description = Description || result[0].Description;
    const update_Status = Status || result[0].Status;
    const update_Amount = Amount || result[0].Amount;
    const update_Currency = Currency || result[0].Currency;
    const update_Photo = Photo || result[0].Photo;

    const query_tow = `UPDATE Deals SET Name= ? ,Description=? , Amount = ? ,Currency =? , Photo =?,Status =? , Update_DateTime_UTC=CURRENT_TIMESTAMP WHERE ID = ? `;
    const data = [
      update_Name,
      update_Description,
      update_Amount,
      update_Currency,
      update_Photo,
      update_Status,
      id,
    ];

    connection.query(query_tow, data, (err, result) => {
      console.log(result);
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: "Server Error", err: err });
      }

      return res.status(201).json({
        message: "Deal updated",
        Deal: {
          Name: update_Name,

          Description: update_Description,
          Status: update_Status,
          Amount: update_Amount,
          update_Currency: update_Currency,
          Photo: update_Photo,
        },
      });
    });
  });
};

///////////////////////////////////////////

const deleteDeal = (req, res) => {
  const id = req.params.id;

  const query = `UPDATE Deals SET Update_DateTime_UTC=CURRENT_TIMESTAMP , Is_Deleted=1 ,Status=? WHERE ID = ? `;
  const data = [ "Deleted"  , id];

  connection.query(query, data, (err, results) => {
    console.log(data);
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "server error*",
        err: err,
      });
    }

    res.status(201).json({
      success: true,

      results: results,
    });
  });
};

const getAllClaimedDeals= (req, res) => {

  const query = `SELECT * from  ClaimedDeals `;
const data=[id]
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

      Claimed_Deals: results,
    });
  });
};


const getClaimedDealsById = (req, res) => {
  const id = req.body.Id;
  const query = `SELECT * from  ClaimedDeals where User_ID=? `;
  const data = [id];
  connection.query(query, data, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "server error*",
        err: err,
      });
    }

    res.status(201).json({
      success: true,

      Claimed_Deals: results,
    });
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  deleteUser,
  addNewDeal,
  getAllDeal,
  update_deal,
  deleteDeal,
  getAllClaimedDeals,
  getClaimedDealsById
};
