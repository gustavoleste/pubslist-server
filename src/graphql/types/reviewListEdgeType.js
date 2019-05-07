const { GraphQLObjectType, GraphQLString } = require("graphql");
const ReviewType = require("./reviewType");

const ReviewListEdge = new GraphQLObjectType({
  name: "ReviewListEdge",
  fields: {
    cursor: { type: GraphQLString },
    node: { type: ReviewType }
  }
});

module.exports = ReviewListEdge;
