const server = require("./server");
const connect = require("./database/dbConnect");

connect("test");

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("Server ready!!!");
});
