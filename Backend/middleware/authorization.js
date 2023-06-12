const connection = require("../models/db");

const authorization = (string) => {
  return function (req, res, next) {
    const user_id = req.token.userId;
   
    const query = `SELECT * FROM Users U WHERE U.ID = (?)`;
    const data = [user_id];
  
    connection.query(query, data, (err, result) => {
      
      
      const query = `SELECT * FROM Role_Permissions RP INNER JOIN Permissions P ON RP.Permission_ID = P.Permissions_ID WHERE RP.Role_ID = (?) AND P.Permission = (?)`;
      const data = [result[0].Role_ID, string];
      connection.query(query, data, (err, result) => {
        if (result.length) {
          next();
        } else {
          res.status(400).json({ message: "unauthorized" });
        }
      });
    });
  };
};

module.exports = authorization;