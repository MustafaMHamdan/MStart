const express = require("express");
const { register,changePassword,updateUserInfo,login } = require("../controllers/users");

// define router
const userRouter = express.Router();
const authentication = require("../middleware/authentication");

 

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.put("/update",authentication, updateUserInfo);
userRouter.put("/change_password",authentication,changePassword);

module.exports = userRouter;
