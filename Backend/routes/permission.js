const express = require("express");
const { createNewPermission } = require("../controllers/permission");

const permissionRouter = express.Router();

/*
 * Testing Routes:
 * POST -> http://localhost:5000/permission/1
/*

 * Testing Object:
{
  "permission":"CREATE_ARTICLE"
}
*/
permissionRouter.post("/:id", createNewPermission);

module.exports = permissionRouter;
