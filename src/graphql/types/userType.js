const {
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLObjectType
} = require("graphql");

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) }
  }
});

module.exports = UserType;
