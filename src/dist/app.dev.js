"use strict";

var express = require("express");

var morgan = require("morgan");

var path = require("path");

var cors = require("cors");

require("dotenv").config();

var app = express(); //Settings

var corsOptions = {
  exposedHeaders: "access-token"
};
app.set("port", process.env.PORT_NADAMAS_API || 7001); //connecting to db
//middlewares

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json()); //routes

app.use("/api/entrenos", require("./routes/entrenos.routes"));
app.use("/api/users", require("./routes/users.routes")); //static files

app.use(express.static(path.join(__dirname, "public")));
module.exports = app;