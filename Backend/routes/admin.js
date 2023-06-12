const express = require("express");
const {
  getAllUsers,
  getUserById,
  deleteUser,
  addNewDeal,
  getAllDeal,
  update_deal,
  deleteDeal,
  getAllClaimedDeals,
  getClaimedDealsById
} = require("../controllers/Admin");

// define router
const adminRouter = express.Router();
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

adminRouter.get(
  "/allUsers",
  authentication,
  authorization("Get_All_Users"),
  getAllUsers
);

adminRouter.get(
  "/user/:id",
  authentication,
  authorization("Get_User_ById"),
  getUserById
);

adminRouter.delete(
  "/user/:id",
  authentication,
  authorization("Delete_User_ById"),
  deleteUser
);

adminRouter.post(
  "/deal",
  authentication,
  authorization("Add_Deal"),
  addNewDeal
);

adminRouter.get(
  "/allDeal",
  authentication,
  authorization("Get_All_Deals"),
  getAllDeal
);

 




adminRouter.get(
  "/allClaimedDeal",
  authentication,
  authorization("Get_All_Claimed_Deals"),
  getAllClaimedDeals
);

adminRouter.get(
  "/ClaimedByUser",
  authentication,
  authorization("get_Claimed_Deals_ByUserId"),
  getClaimedDealsById
);




adminRouter.put(
  "/deal/:id",
  authentication,
  authorization("Edit_Deal"),
  update_deal
);

adminRouter.delete(
  "/deal/:id",
  authentication,
  authorization("Delete_Deal"),
  deleteDeal
);

module.exports = adminRouter;
