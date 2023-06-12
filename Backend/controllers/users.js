const connection = require("../models/db");

const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { Name, Phone, Email, password, Gender, Date_Of_Birth, Photo } =
    req.body;
  const Role_id = req.body.Role_ID || 2;
  const Status = req.body.Status || "Active";
  const encryptedPassword = await bcrypt.hash(password, saltRounds);

  const query = `INSERT INTO Users (Name, Phone, Email, Password,Gender,Date_Of_Birth,Role_ID,Status,Photo) VALUES (?,?,?,?,?,?,?,?,?)`;
  const data = [
    Name,
    Phone,
    Email,
    encryptedPassword,
    Gender,
    Date_Of_Birth,
    Role_id,
    Status,
    Photo,
  ];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(409).json({
        success: false,
        massage: " already exist",
        err: err.message,
      });
    }

    return res.status(200).json({
      success: true,
      massage: "Account Created Successfully",
      result: data,
    });
  });
};

////////////////////////////////////////////////////////

const updateUserInfo = (req, res) => {
  const id = req.token.userId;

  const { Name, Phone, Email, Gender, Date_Of_Birth, Photo } = req.body;

  const query = `SELECT * FROM Users WHERE ID = ?`;
  const data = [id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Server Error", err: err });
    }

    const update_Name = Name || result[0].Name;
    const update_Phone = Phone || result[0].Phone;
    const update_Email = Email || result[0].Email;
    const update_Gender = Gender || result[0].Gender;
    const update_Date_Of_Birth = Date_Of_Birth || result[0].Date_Of_Birth;
    const update_Photo = Photo || result[0].Photo;

    const query_tow = `UPDATE Users SET Name= ? ,Phone=? ,Email =?, Gender = ? ,Date_Of_Birth =? , Photo=?, Update_DateTime_UTC=CURRENT_TIMESTAMP WHERE ID = ? `;
    const data = [
      update_Name,
      update_Phone,
      update_Email,
      update_Gender,
      update_Date_Of_Birth,
      update_Photo,
      id,
    ];

    connection.query(query_tow, data, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: "Server Error", err: err });
      }

      return res.status(201).json({
        message: "Account updated",
        user: {
          Name: update_Name,
          Phone: update_Phone,
          Email: update_Email,
          Gender: update_Gender,
          Date_Of_Birth: update_Date_Of_Birth,
          Photo: update_Photo,
        },
      });
    });
  });
};

//////////////////////changePassword////////////////////////////////

const changePassword = async (req, res) => {
  try {
    const id = req.token.userId;
    const { oldPassword, newPassword, confirmPassword } = req.body;

    const query = `SELECT * FROM Users where ID=? `;

    const data = [id];

    connection.query(query, data, (err, result) => {
      bcrypt.compare(oldPassword, result[0].Password, async (err, result1) => {
        if (!result1) {
          return res.status(403).json({
            success: false,
            message: "The Old Password You Have Entered Is Incorrect",
          });
        }

        if (result1) {
          bcrypt.compare(
            newPassword,
            result[0].Password,
            async (err, result2) => {
              if (result2) {
                return res.status(400).json({
                  success: false,
                  message:
                    "Your New Password Must Not Be the Same As Your Old Password ",
                });
              }

              if (!result2) {
                if (newPassword !== confirmPassword) {
                  return res.status(400).json({
                    success: false,
                    message:
                      "The New Password Does Not Match Confirm Password ",
                  });
                } else {
                  const query_tow = `UPDATE Users SET Password= ?,Update_DateTime_UTC=CURRENT_TIMESTAMP WHERE ID = ?; `;
                  const hashPassword = await bcrypt.hash(
                    newPassword,
                    saltRounds
                  );

                  const data2 = [hashPassword, id];

                  connection.query(query_tow, data2, (err, result3) => {
                    console.log(result3);
                    return res.status(201).json({
                      success: true,
                      message: "Password Change",
                    });
                  });
                }
              }
            }
          );
        }
      });
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Server Error", err: err.message });
  }
};

///////////////////////////////////////

const login = (req, res) => {
  const password = req.body.password;
  const email = req.body.email.toLowerCase();

  const query = `SELECT *,Users.ID FROM Users INNER JOIN Roles ON Users.Role_ID=Roles.Role_ID WHERE Email=?`;
  const data = [email];
  connection.query(query, data, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      /*   console.log(result); */
      bcrypt.compare(password, result[0].Password, (err, response) => {
        if (err) {
          return res.status(403).json({
            success: false,
            message: err.message,
          });
        }
        if (response) {
          console.log(result);
          const payload = {
            userId: result[0].ID,
            user: result[0].Role,
            role: result[0].Role_ID,
          };
          const secret = process.env.SECRET;

          const token = jwt.sign(payload, secret);
          const query2 = `update Users SET Last_Login_DateTime_UTC=CURRENT_TIMESTAMP where Email= ? `;
          const data2 = [email];
          connection.query(query2, data2, (err, res2) => {
            if (res2) {
              return res.status(200).json({
                token,

                Last_Login_Time: result[0].Last_Login_DateTime_UTC,
              });
            }
            if (err) {
              return res.status(500).json({
                error: err.message,
              });
            }
          });
        } else {
          return res.status(403).json({
            success: false,
            message: `The password you’ve entered is incorrect`,
          });
        }
      });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "The email doesn't exist" });
    }
  });
};

module.exports = {
  register,
  updateUserInfo,
  login,
  changePassword,
};
