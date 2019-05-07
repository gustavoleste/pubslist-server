const { GraphQLList, GraphQLObjectType } = require("graphql");

const PageInfoType = require("./pageInfoType");
const PubsListEdge = require("./pubsListEdgeType");

const PubListType = new GraphQLObjectType({
  name: "pubList",
  fields: {
    edges: { type: new GraphQLList(PubsListEdge) },
    pageInfo: { type: PageInfoType }
  }
});

module.exports = PubListType;
