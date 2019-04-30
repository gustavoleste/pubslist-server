const express = require("express");
const server = express();
const schema = require("./graphql/schema");
const grapqhqlHTTP = require("express-graphql");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const header = req.get("Authorization");
    if (!header) {
      req.isAuth = false;
      return next();
    }
    const token = header.split(" ")[1];
    if (!token) {
      req.isAuth = false;
      return next();
    }
    const userID = jwt.verify(token, `${process.env.SECRET_KEY}`);
    if (!userID) {
      req.isAuth = false;
      return next();
    }
    req.isAuth = true;
    req.userID = userID.id;
    next();
  } catch (err) {
    req.isAuth = false;
    console.log(err);
    return next();
  }
};

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());
server.use(auth);

server.get("/", (req, res) => {
  res.status(200).send("Hello World!!!");
});

server.use("/graphql", grapqhqlHTTP({ schema, graphiql: true }));

module.exports = server;
