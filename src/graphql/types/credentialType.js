const { GraphQLNonNull, GraphQLString, GraphQLObjectType } = require("graphql");

const CredentialType = new GraphQLObjectType({
  name: "Credential",
  fields: {
    token: { type: new GraphQLNonNull(GraphQLString) }
  }
});

module.exports = CredentialType;
