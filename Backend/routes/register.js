const express = require("express");
const { register } = require("../controllers/register");

// define router
const registerRouter = express.Router();

/*
 * Testing Routes:
 * POST -> http://localhost:5000/register/
/*

 * Testing Object:
{
  "firstName": "Mhmd",
  "lastName": "Jouza",
  "age": 27,
  "country": "Jordan",
  "email":"Jouza@hotmail.com",
  "password": "123456",
  "role":"1"
}
*/

registerRouter.post("/", register);

module.exports = registerRouter;
