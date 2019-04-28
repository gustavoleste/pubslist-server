const express = require("express");
const server = express();
const schema = require("./graphql/schema");
const grapqhqlHTTP = require("express-graphql");
const cors = require("cors");

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());

server.get("/", (req, res) => {
  res.status(200).send("Hello World!!!");
});

server.use("/graphql", grapqhqlHTTP({ schema, graphiql: true }));

module.exports = server;
