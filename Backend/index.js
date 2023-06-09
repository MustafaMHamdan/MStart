const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./models/db");

const app = express();
const PORT = 5000;

// Import Routers

const rolesRouter = require("./routes/roles");
const permissionRouter = require("./routes/permission");
const userRouter = require("./routes/users");

app.use(cors());
app.use(express.json());

// Routes Middleware

app.use("/role", rolesRouter);

app.use("/permission", permissionRouter);
app.use("/user", userRouter);

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
