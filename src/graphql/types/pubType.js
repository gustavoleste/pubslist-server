const {
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLObjectType
} = require("graphql");

const PubType = new GraphQLObjectType({
  name: "Pub",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    address: { type: new GraphQLNonNull(GraphQLString) }
  }
});

module.exports = PubType;
