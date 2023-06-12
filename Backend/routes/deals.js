const express = require("express");
const { getAllActiveDeal,claimDeal,getMyDeals } = require("../controllers/deals");

// define router
const dealRouter = express.Router();
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

dealRouter.get("active_deals",getAllActiveDeal);

 dealRouter.post("/claim-deal",authentication,claimDeal)
 dealRouter.get("/My_deals",authentication,getMyDeals)


module.exports = dealRouter;
