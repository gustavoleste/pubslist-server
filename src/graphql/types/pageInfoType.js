const {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLNonNull
} = require("graphql");

const pageInfoType = new GraphQLObjectType({
  name: "pageInfo",
  fields: {
    hasNextPage: { type: new GraphQLNonNull(GraphQLBoolean) }
  }
});

module.exports = pageInfoType;
