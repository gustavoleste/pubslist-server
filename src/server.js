const express = require("express");
const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get("/", (req, res) => {
  res.status(200).send("Hello World!!!");
});

module.exports = server;
