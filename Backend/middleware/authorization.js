const connection = require("../models/db");

const authorization = (string) => {
  return function (req, res, next) {
    const user_id = req.token.userId;
   
    const query = `SELECT * FROM users U WHERE U.UserID = (?)`;
    const data = [user_id];
    console.log(data);
    connection.query(query, data, (err, result) => {
      console.log(result);
      
      const query = `SELECT * FROM role_permission RP INNER JOIN permissions P ON RP.permission_id = P.id WHERE RP.role_id = (?) AND P.permission = (?)`;
      const data = [result[0].role_id, string];
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