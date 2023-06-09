const connection = require("../models/db");

const createPermission = (req, res) => {
  const { permission } = req.body;
  const role_id = req.params.id;
  console.log(permission,role_id);

  const query = `INSERT INTO Permissions (Permission) VALUES (?);`;
  const data = [permission];
 
  connection.query(query, data, (err, result) => {
    if (err) {
    return   res.status(500).json({ err });
    }
    if (result) {
      const query = `INSERT INTO Role_Permissions (Permission_ID,Role_ID) VALUES (?,?); `;
      const permission_id = result.insertId;
      const data = [permission_id, role_id];

      connection.query(query, data, (err, result) => {
        if (err) {
         return  res.status(500).json({ err });
        }
        if (result) {
          return res.status(201).json({
            success: true,
            message: "permission created",
            result: result,
          });
        }
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "permission not created",
      });
    }
  });
};

module.exports = { createPermission };
