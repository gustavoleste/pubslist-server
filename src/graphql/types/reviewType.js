const {
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLObjectType
} = require("graphql");

const UserType = require("./userType");
const PubType = require("./pubType");

const ReviewType = new GraphQLObjectType({
  name: "Review",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    user: { type: new GraphQLNonNull(UserType) },
    pub: { type: new GraphQLNonNull(PubType) },
    review: { type: new GraphQLNonNull(GraphQLString) }
  }
});

module.exports = ReviewType;
