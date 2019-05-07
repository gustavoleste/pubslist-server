const { GraphQLObjectType, GraphQLString } = require("graphql");
const PubType = require("./pubType");

const PubsListEdge = new GraphQLObjectType({
  name: "pubListEdge",
  fields: {
    node: { type: PubType },
    cursor: { type: GraphQLString }
  }
});

module.exports = PubsListEdge;
