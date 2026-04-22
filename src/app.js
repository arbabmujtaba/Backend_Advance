const express = require("express");
const authrouter = require("./Routes/Auth.routes") // auth routes ko require karty hai
const cookieParser = require("cookie-parser");

const app = express();


app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authrouter); // This is where the starting point of our auth will be defined user start kahan se karega requests

module.exports = app;
