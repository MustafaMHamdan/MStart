const express = require("express");

const { createPermission } = require("../controllers/permission");

const permissionRouter = express.Router();

permissionRouter.post("/:id", createPermission);

module.exports = permissionRouter;