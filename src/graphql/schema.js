const { GraphQLSchema } = require("graphql");
const query = require("./types/queryType");
const mutation = require("./types/mutationType");

const schema = new GraphQLSchema({
  query,
  mutation
});

module.exports = schema;
