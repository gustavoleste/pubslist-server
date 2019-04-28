const {
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLObjectType
} = require("graphql");

const UserType = require("./userType");

const PubType = new GraphQLObjectType({
  name: "Pub",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    address: { type: new GraphQLNonNull(GraphQLString) },
    user: { type: new GraphQLNonNull(UserType) }
  }
});

module.exports = PubType;
