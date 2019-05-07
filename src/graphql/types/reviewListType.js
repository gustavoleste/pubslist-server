const { GraphQLList, GraphQLObjectType } = require("graphql");

const PageInfoType = require("./pageInfoType");
const ReviewListEdgeType = require("./reviewListEdgeType");

const ReviewListType = new GraphQLObjectType({
  name: "ReviewListType",
  fields: {
    edges: { type: new GraphQLList(ReviewListEdgeType) },
    pageInfo: { type: PageInfoType }
  }
});

module.exports = ReviewListType;
