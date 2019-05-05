const koa = require("koa");
const cors = require("kcors");
const json = require("koa-json");
const Router = require("koa-router");
const graphqlHTTP = require("koa-graphql");
const schema = require("./graphql/schema");
const jwt = require("jsonwebtoken");

const server = new koa();
const router = new Router();

const auth = () => (ctx, next) => {
  try {
    const header = ctx.request.header.authorization;
    if (!header) {
      ctx.state.isAuth = false;
      return next();
    }
    const token = header.split(" ")[1];
    if (!token) {
      ctx.state.isAuth = false;
      return next();
    }
    const userID = jwt.verify(token, `${process.env.SECRET_KEY}`);
    if (!userID) {
      ctx.state.isAuth = false;
      return next();
    }
    ctx.state.isAuth = true;
    ctx.state.userID = userID.id;
    next();
  } catch (err) {
    ctx.state.isAuth = false;
    console.log(err);
    return next();
  }
};

const root = ctx => {
  ctx.body = { msg: "Hello from Koa server!" };
};

router.use(json());
router.use(cors());
router.use(auth());
router.get("/", root);
router.all(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

server.use(router.routes()).use(router.allowedMethods);

module.exports = server;
